import { Injectable, Renderer2 } from '@angular/core';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';

@Injectable({
  providedIn: 'root',
})
export class TextService {

  render: Renderer2;
  textElement: SVGTextElement;
  tspan: SVGTSpanElement;
  currentPoint: Point;
  textCont: string;
  lineIncrement: number;
  fontSize: number;
  fontStyle: string;
  fontFamily: string;
  fontWeight: string;
  textAlign: string;
  currentTextAlign: string;
  groupe: SVGGElement;
  rectangle: SVGRectElement;
  rectangleHeight: number;
  rectangleWidth: number;
  svg: SVGElement;
  isEditing: boolean;
  leftCorner: number;

  constructor() {
    this.fontSize = 50;
    this.fontStyle = '';
    this.fontFamily = 'Sans-Serif';
    this.fontWeight = '';
    this.textAlign = 'start';
    this.isEditing = false;
  }

  createElement(render: Renderer2, point: Point, svg: SVGElement) {
    this.isEditing = true;
    this.svg = svg;
    this.render = render;
    this.createGroupe(render, point);
    this.setEmptyTextBox(point);
    this.tspan = this.createTspan(render, point.y);
    this.currentTextAlign = this.textAlign;
    return this.groupe;
  }

  setEmptyTextBox(point: Point) {
    this.currentPoint = point;
    this.textCont = '';
    this.lineIncrement = 1;
    this.rectangleHeight = this.fontSize + 20;
    this.rectangleWidth = 5;
    this.render.setAttribute(this.rectangle, 'height', (this.fontSize * this.lineIncrement).toString());
    this.render.setAttribute(this.rectangle, 'width', this.rectangleWidth.toString());
    this.render.setAttribute(this.rectangle, 'stroke', 'none');
  }

  createTspan(render: Renderer2, dy: number): SVGTSpanElement {
    const tspanElement: SVGTSpanElement = render.createElement('tspan', SVG_LINK);
    render.appendChild(this.textElement, tspanElement);
    render.setAttribute(tspanElement, 'x', this.currentPoint.x.toString());
    render.setAttribute(tspanElement, 'y', dy.toString());
    tspanElement.textContent = this.textCont;
    return tspanElement;
  }

  newLine() {
    const yCoord = this.currentPoint.y + (this.lineIncrement * this.fontSize) ;
    this.lineIncrement++;
    const newTspan: SVGTSpanElement = this.createTspan(this.render, yCoord);
    this.tspan = newTspan;
    this.textCont = '';
  }

  editText(event: KeyboardEvent) {
    let isNewLine = false;
    this.render.setAttribute(this.rectangle, 'stroke', 'black');
    if (event.key === 'Enter') {
      this.newLine();
      this.render.setAttribute(this.rectangle, 'height', (this.fontSize * this.lineIncrement).toString());
      this.textCont = this.textCont;
      isNewLine = true;
    } else if (event.key === 'Backspace') {
      this.delete();
    } else if (this.isAlphaNum(event.key)) {
      this.textCont += event.key;
    }

    this.tspan.textContent = this.textCont;
    this.setRectangleWidth(this.tspan.getComputedTextLength(), isNewLine);

  }

  setRectangleWidth(width: number, isNewLine: boolean) {
    if (this.rectangleWidth <= width) {
      this.render.setAttribute(this.rectangle, 'width', width.toString());
      this.rectangleWidth = width;
      this.render.setAttribute(this.rectangle, 'x', this.getLeftCorner(this.currentPoint, width).toString());
    }
  }

  setFontSize(fontSize: number) {
    this.fontSize = fontSize;
  }

  setFontFamily(fontFamily: string) {
    this.fontFamily = fontFamily;
  }

  setFontStyle(fontStyle: string) {
    this.fontStyle = fontStyle;
  }

  setFontWeight(fontWeight: string) {
    this.fontWeight = fontWeight;
  }

  setTextAlign(textAlign: string) {
    this.textAlign = textAlign;
  }

  createTextElement(render: Renderer2, point: Point) {
    this.textElement = render.createElement('text', SVG_LINK);
    render.setAttribute(this.textElement, 'x', point.x.toString());
    render.setAttribute(this.textElement, 'y', point.y.toString());
    render.setAttribute(this.textElement, 'font-family', this.fontFamily);
    render.setAttribute(this.textElement, 'font-size', this.fontSize.toString());
    render.setAttribute(this.textElement, 'font-style', this.fontStyle);
    render.setAttribute(this.textElement, 'font-weight', this.fontWeight);
    render.setAttribute(this.textElement, 'text-anchor', this.textAlign);
  }

  createRectangleElement(render: Renderer2, point: Point) {
    this.rectangle = render.createElement('rect', SVG_LINK);
    render.setAttribute(this.rectangle, 'x', point.x.toString());
    render.setAttribute(this.rectangle, 'y', (point.y - this.fontSize).toString());

    render.setStyle(this.rectangle, 'fill', 'none');
    render.setAttribute(this.rectangle, 'stroke', 'black');
  }

  createGroupe(render: Renderer2, point: Point) {
    this.groupe = render.createElement('g', SVG_LINK);
    this.createRectangleElement(render, point);
    this.createTextElement(render, point);

    render.appendChild(this.groupe, this.rectangle);
    render.appendChild(this.groupe, this.textElement);
  }

  delete() {
    this.textCont = this.textCont.substring(0, this.textCont.length - 1);
    if (this.textCont.length === 0) {
      this.removeLine(this.textElement.childElementCount - 1);
    } else {
      this.tspan.textContent = this.textCont;
    }
  }

  removeLine(index: number) {
    this.render.removeChild(this.textElement, this.tspan);
    this.tspan = this.textElement.getElementsByTagName('tspan')[this.textElement.childElementCount - 1];
    this.textCont = this.tspan.innerHTML;
    if (index === 0 && this.textCont.length === 1) {
      this.render.removeChild(this.svg, this.groupe);
    }
  }

  isAlphaNum(str: string) {
    return (/^[a-z0-9 ]+$/i.test(str) && str.length === 1);
  }

  getLeftCorner(point: Point, width: number): number {
    if (this.currentTextAlign === 'middle') {
      return (this.leftCorner = point.x - (width / 2));
    } else if (this.currentTextAlign === 'end') {
      return (this.leftCorner = point.x - width);
    }
    return (point.x);
  }

  deleteTextBox() {
    if (this.rectangle) {
      this.render.setAttribute(this.rectangle, 'stroke', 'none');
    }
  }
}
