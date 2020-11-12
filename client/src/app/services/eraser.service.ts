import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import * as CONST from '../constant';
import { Point } from '../entity/point';

@Injectable({
  providedIn: 'root',
})
export class EraserService {
  private width: number;
  private svg: SVGElement;
  private deleteTable: SVGElement[];
  private markTable: SVGElement[][];
  private memMarkTable: boolean[];
  private originPoint: Point;
  private svgEraser: SVGElement;

  constructor() { /* */}

  set setSvg(svg: ElementRef) {
    this.svg = svg.nativeElement;
  }

  set setWidth(width: number) {
    this.width = width;
  }

  createElement(render: Renderer2, point: Point): SVGElement {
    this.deleteOldElement(render);
    this.deleteTable = [];
    this.fillMarkTables();
    const element = render.createElement(CONST.SVG_RECTANGLE, CONST.SVG_LINK);
    render.setAttribute(element, CONST.SVG_ID, 'eraser');
    render.setStyle(element, CONST.SVG_STROKE, CONST.RGBA_BLACK_COLOR);
    render.setStyle(element, CONST.SVG_FILL, CONST.RGBA_WHITE_COLOR);
    render.setStyle(element, CONST.SVG_STROKE_WIDTH, '1');
    this.updateAttribut(render, point, element);
    this.checkingElement(render, true);
    return element;
  }

  private fillMarkTables() {
    this.markTable = [];
    this.memMarkTable = [];
    this.markTable[0] = [];
    this.markTable[1] = [];
    for ( let i = 3; i < this.svg.childElementCount; i++) {
      if ( this.isWorkElement(this.svg.children[i]) ) {
        this.markTable[0][i - 3] = [].slice.call(this.svg.children)[i];
        this.memMarkTable.push(false);
      }
    }
  }

  deleteOldElement(render: Renderer2) {
    this.deleteOldEraser(render);
    this.deleteOldG(render);
  }

  private deleteOldEraser(render: Renderer2) {
    const element = document.getElementById('eraser');
    if (element) {
      render.removeChild(render, element);
    }
  }

  private deleteOldG(render: Renderer2) {
    if (document.getElementsByTagName(CONST.SVG_GROUP)) {
      for (const item of Array.prototype.slice.call(document.getElementsByTagName(CONST.SVG_GROUP), 0)) {
        if ( this.isEmptyG(item)) {
          render.removeChild(render, item);
        }
      }
    }
  }

  update(render: Renderer2, point: Point, isDrawing: boolean) {
    this.updateAttribut(render, point, this.svgEraser);
    this.checkingElement(render, isDrawing);
  }

  private updateAttribut(render: Renderer2, point: Point, element: SVGElement) {
    this.originPoint = this.findOriginPoint(point);
    render.setAttribute(element, 'x', this.originPoint.x.toString());
    render.setAttribute(element, 'y', this.originPoint.y.toString());
    render.setAttribute(element, 'width', this.width.toString());
    render.setAttribute(element, 'height', this.width.toString());
    this.svgEraser = element;
  }

  private findOriginPoint(point: Point): Point {
    const halfWidth = Math.floor(this.width / 2);
    return new Point(
      (point.x < halfWidth) ? 0 : point.x - halfWidth,
      (point.y < halfWidth) ? 0 : point.y - halfWidth);
  }

  private checkingElement(render: Renderer2, isDrawing: boolean) {
    for (const element of this.markTable[0]) {
      if (this.markTable[0].length > 0 && !this.isEmptyG(element)) {
        (this.findElement(element)) ?
          (isDrawing) ?
            this.deleteElement(render, element)
            :
            this.markElement(render, element)
          :
          this.unmarkElement(render, element);
      }
    }
  }

  private deleteElement(render: Renderer2, element: SVGElement) {
    if (this.canBeDelete(element)) {
      this.createRedRect(render, element);
      this.deleteTable.push(element);
    }
  }

  private markElement(render: Renderer2, element: any) {
    if (this.canBeMark(element)) {
      this.markTable[1][this.markTable[0].indexOf(element)] = this.createRedRect(render, element);
      this.memMarkTable[this.markTable[0].indexOf(element)] = true;
    }
  }

  private unmarkElement(render: Renderer2, element: any) {
    if ( this.memMarkTable[this.markTable[0].indexOf(element)] ) {
      this.memMarkTable[this.markTable[0].indexOf(element)] = false;
      render.removeChild(this.svg, this.markTable[1][this.markTable[0].indexOf(element)]);
    }
  }

  stop(render: Renderer2) {
    for (const removeElement of this.deleteTable) {
      render.removeChild(render, removeElement);
    }
    for (const element of [].slice.call(this.svg.children)) {
      if (this.isElementUndesirable(element)) {
        render.removeChild(render, element);
      }
    }
    this.deleteOldElement(render);
  }

  private createRedRect(render: Renderer2, element: any) {
    const redRect: SVGElement = render.createElement(CONST.SVG_RECTANGLE, CONST.SVG_LINK);
    render.setAttribute(redRect, 'x', (element.getBoundingClientRect().x - this.svg.getBoundingClientRect().left).toString());
    render.setAttribute(redRect, 'y', (element.getBoundingClientRect().y - this.svg.getBoundingClientRect().top).toString());
    render.setAttribute(redRect, 'width', element.getBoundingClientRect().width);
    render.setAttribute(redRect, 'height', element.getBoundingClientRect().height );
    render.setAttribute(redRect, CONST.SVG_ID, 'deleteRect' );
    render.setStyle(redRect, CONST.SVG_STROKE, 'red');
    if ( this.isStrokeRed(element) ) {
      render.setStyle(redRect, CONST.SVG_STROKE_WIDTH, '5');
      render.setStyle(redRect, CONST.SVG_FILL, CONST.RGBA_LIGHT_RED_COLOR );
    } else {
      render.setStyle(redRect, CONST.SVG_STROKE_WIDTH, '2');
      render.setStyle(redRect, CONST.SVG_FILL, 'none');
    }
    this.markTable[1][this.markTable[0].indexOf(element)] = redRect;
    this.svg.appendChild(redRect);
    return redRect;
  }

  private findElement(element: any): boolean {
    for (const childElement of Array.from(element.children)) {
      if (this.isGElement(childElement)) {
        if (!this.isEmptyG(element)) {
          return this.findElement(childElement);
        } else {
          return false;
        }
      } else {
        if (this.isValidElement(childElement)) {
          return true;
        }
      }
    }
    return false;
  }

  private isValidElement(element: any): boolean {
    for (let i = 0; i < this.width - 1; i++) {
      const sidePointTable: Point[] = Array<Point>();
      sidePointTable.push(new Point(
        this.putAttributToNumber(this.svgEraser.getAttribute('x')) + i,
        this.putAttributToNumber(this.svgEraser.getAttribute('y'))));
      sidePointTable.push(new Point(
        this.putAttributToNumber(this.svgEraser.getAttribute('x')) + this.width,
        this.putAttributToNumber(this.svgEraser.getAttribute('y')) + i));
      sidePointTable.push(new Point(
        this.putAttributToNumber(this.svgEraser.getAttribute('x')) + this.width - i,
        this.putAttributToNumber(this.svgEraser.getAttribute('y')) + this.width));
      sidePointTable.push(new Point(
        this.putAttributToNumber(this.svgEraser.getAttribute('x')) + this.width - i,
        this.putAttributToNumber(this.svgEraser.getAttribute('y')) + i));
      for (const point of sidePointTable) {
        if (this.isPointInside(element, point)) {
          return true;
        }
      }
    }
    return false;
  }

  private isPointInside(elementTest: any, pointTest: Point): boolean {
    return ( (elementTest.getBoundingClientRect().top <= pointTest.y + (this.svg.getBoundingClientRect() as DOMRect).y &&
              elementTest.getBoundingClientRect().bottom >= pointTest.y + (this.svg.getBoundingClientRect() as DOMRect).y &&
             (elementTest.getBoundingClientRect().left <= pointTest.x + (this.svg.getBoundingClientRect() as DOMRect).x &&
              elementTest.getBoundingClientRect().right >= pointTest.x + (this.svg.getBoundingClientRect() as DOMRect).x)));
  }

  private putAttributToNumber(attribut: string | null): number {
    if (attribut) {
      return +attribut;
    } else {
      throw new Error(CONST.BAD_ATTRIBUTE_ERROR);
    }
  }

  private isStrokeRed(element: SVGElement): boolean {
    const rgbValues = ((element.firstChild as SVGElement).style.stroke as string)
                      .slice(4, ((element.firstChild as SVGElement).style.stroke as string).length - 1)
                      .split(',', 3);
    return +rgbValues[0] > +rgbValues[1] + +rgbValues[2];
  }

  private canBeDelete(element: any): boolean {
    return !this.isInDeleteTable(element) && !this.isRedRect(element);
  }

  private isRedRect(element: any) {
    return element.id === 'deleteRect';
  }

  private isInDeleteTable(elementTest: SVGElement): boolean {
    return this.deleteTable.find( (elementTable: SVGElement) => elementTest === elementTable) !== undefined;
  }

  private canBeMark(element: SVGElement): boolean {
    return !this.memMarkTable[this.markTable[0].indexOf(element)] && !this.isRedRect(element);
  }

  private isEmptyG(element: any): boolean {
    return this.isGElement(element) && element.children.length === 0;
  }

  private isElementUndesirable(element: any): boolean {
    return this.isRedRect(element) || this.isEmptyG(element);
  }

  private isGElement(element: any): boolean {
    return element.tagName === 'g';
  }

  private isWorkElement(element: any): boolean {
    return !this.isElementUndesirable(element) && element.id !== 'eraser';
  }
}
