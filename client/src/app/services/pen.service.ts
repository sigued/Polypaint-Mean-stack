import { Injectable, Renderer2 } from '@angular/core';
import { SVG_FILL, SVG_GROUP, SVG_LINE, SVG_LINE_X1, SVG_LINE_X2, SVG_LINE_Y1, SVG_LINE_Y2, SVG_LINK, SVG_NONE,
         SVG_ROUND, SVG_STROKE, SVG_STROKE_LINECAP, SVG_STROKE_WIDTH, SVG_STYLE } from '../constant';
import { Point } from '../entity/point';
import { ColorService } from './common/color.service';

@Injectable({
  providedIn: 'root',
})
export class PenService {

  minWidth: number;
  maxWidth: number;
  speed: number;
  styleAttribute: string;
  previousPoint: Point;
  element: SVGElement;

  constructor(private colorService: ColorService) {
    this.minWidth = 1;
    this.maxWidth = 10;
    this.speed = 1;
    this.previousPoint = new Point(0, 0);
   }

  createElement(render: Renderer2, point: Point, nativeSVG: SVGElement) {
    this.element = this.createNewLine(render, point);
    this.previousPoint = point;
    const g = render.createElement(SVG_GROUP, SVG_LINK);
    g.appendChild(this.element);
    nativeSVG.appendChild(g);
    return this.element;
  }

  update(render: Renderer2, point: Point) {
    const group = this.element.parentNode;
    this.updateSpeed(point);
    const newLine = this.createNewLine(render, point);
    render.appendChild(group, newLine);
  }

  stop() {
   this.previousPoint = new Point(0, 0);
  }

  getAttribute(primaryColor: string, secondColor: string): string {
    this.styleAttribute = SVG_STROKE_LINECAP + ':' + SVG_ROUND
     + ';' + SVG_STROKE_WIDTH + ':' + this.maxWidth.toString()
     + ';' + SVG_STROKE + ':' + primaryColor
     + ';' + SVG_FILL + ':' + secondColor
     + ';';
    return this.styleAttribute;
  }

  updateSpeed(point: Point) {
    const timerID = setTimeout( () => {
      if (this.previousPoint.x > 0 && this.previousPoint.y > 0) {
        const movementX = Math.abs(point.x - this.previousPoint.x);
        const movementY = Math.abs(point.y - this.previousPoint.y);
        const movement = Math.sqrt(movementX * movementX + movementY * movementY);

        this.speed = Math.ceil(movement * 10);
      }

      this.previousPoint = point;
      clearTimeout(timerID);
      }, 5);

    if (this.speed > 100) {
      this.speed = 100;
    } else if (this.speed < 1) {
      this.speed = 1;
    }
  }

  updateWidth(mouseSpeed: number, minWidth: number, maxWidth: number): string {
    const interval = maxWidth - minWidth;
    let factor = 1;

    factor = 101 - mouseSpeed;
    factor /= 100;

    const widthAdjustment = Math.floor(interval * factor);
    const newWidth = minWidth + widthAdjustment;

    return newWidth.toString();
  }

  setMinWidth(newMinWidth: number) {
    this.minWidth = newMinWidth;
  }

  setMaxWidth(newMaxWidth: number) {
    this.maxWidth = newMaxWidth;
  }

  createNewLine(render: Renderer2, point: Point): SVGElement {
    const element = render.createElement(SVG_LINE, SVG_LINK);

    render.setAttribute(element, SVG_STYLE, this.getAttribute(this.colorService.primaryColor.getValue(), SVG_NONE));

    if (this.previousPoint.x === 0 && this.previousPoint.y === 0) {
       render.setAttribute(element, SVG_LINE_X1, point.x.toString());
       render.setAttribute(element, SVG_LINE_Y1, point.y.toString());
     } else {
      render.setAttribute(element, SVG_LINE_X1, this.previousPoint.x.toString());
      render.setAttribute(element, SVG_LINE_Y1, this.previousPoint.y.toString());
    }

    render.setAttribute(element, SVG_LINE_X2, point.x.toString());
    render.setAttribute(element, SVG_LINE_Y2, point.y.toString());

    render.setStyle(element, SVG_STROKE_WIDTH, this.updateWidth(this.speed, this.minWidth, this.maxWidth));

    return element;
  }
}
