import { Injectable, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { DEFAULT_FEATHER_WIDTH, SVG_GROUP, SVG_LINE, SVG_LINE_X1, SVG_LINE_X2, SVG_LINE_Y1,
          SVG_LINE_Y2, SVG_LINK, SVG_STROKE, SVG_STROKE_WIDTH, TWO_PIXELS, ZERO_ANGLE } from '../constant';
import { Point } from '../entity/point';
import { ColorService } from './common/color.service';

@Injectable({
  providedIn: 'root',
})
export class PlumeService {
  private width: number;
  rotationAngle: number;
  element: SVGElement;
  previousPoint: Point;

  rotationAngleSubject = new Subject<number>();

  constructor(private colorService: ColorService) {
    this.rotationAngle = ZERO_ANGLE;
    this.width = DEFAULT_FEATHER_WIDTH;
    this.previousPoint = new Point(0, 0);
  }

  createElement(render: Renderer2, point: Point, nativeSVG: SVGElement) {
    this.element = this.createNewLine(render, point);
    const g = render.createElement(SVG_GROUP, SVG_LINK);
    g.appendChild(this.element);
    nativeSVG.appendChild(g);
    this.previousPoint = point;

    return this.element;
  }

  update(render: Renderer2, point: Point, element: SVGElement) {
    const group = this.element.parentNode;

    this.generateIntermediateLines(render, point);

    const newLine = this.createNewLine(render, point);
    render.appendChild(group, newLine);
    this.previousPoint = point;
  }

  stop() {
    /** */
  }

  createNewLine(render: Renderer2, point: Point) {
    const element = render.createElement(SVG_LINE, SVG_LINK);
    this.setFeatherAttributes(render, element, point);
    return element;
  }

  generateIntermediateLines(render: Renderer2, point: Point) {
    const group = this.element.parentNode;
    const distance = Math.round(Math.sqrt(Math.pow(point.x - this.previousPoint.x, 2) + Math.pow(point.y - this.previousPoint.y, 2)));

    for (let i = 0; i < distance / 2; i++) {
      const coordX = (this.previousPoint.x + (point.x - this.previousPoint.x) * 2 * i / distance);
      const coordY = (this.previousPoint.y + (point.y - this.previousPoint.y) * 2 * i / distance);
      const intermediatePoint = new Point(coordX, coordY);

      const element = this.createNewLine(render, intermediatePoint);
      render.appendChild(group, element);
      }
  }

  mouseWheelRotation(wheelEvent: WheelEvent) {
    if (wheelEvent.deltaY > 0) {
      (wheelEvent.altKey) ? this.rotationAngle++ : this.rotationAngle += 15;
    } else {
      (wheelEvent.altKey) ? this.rotationAngle-- : this.rotationAngle -= 15;
    }
    this.rotationAngleSubject.next(this.rotationAngle);
  }

  degreesToRadianAngle(degreesAngle: number): number {
    return degreesAngle * (Math.PI / 180);
  }

  getColor(): string {
    return this.colorService.primaryColor.getValue();
  }

  setFeatherAttributes(render: Renderer2, element: SVGElement, point: Point) {
    const angle = this.degreesToRadianAngle(this.rotationAngle);
    render.setAttribute(element, SVG_LINE_X1, (point.x - Math.cos(angle) * this.width).toString());
    render.setAttribute(element, SVG_LINE_Y1, (point.y - Math.sin(angle) * this.width).toString());
    render.setAttribute(element, SVG_LINE_X2, (point.x + Math.cos(angle) * this.width).toString());
    render.setAttribute(element, SVG_LINE_Y2, (point.y + Math.sin(angle) * this.width).toString());

    render.setStyle(element, SVG_STROKE, this.getColor());
    render.setStyle(element, SVG_STROKE_WIDTH, TWO_PIXELS);
  }

  setWidth(width: number) {
    this.width = width;
  }

  setRotationAngle(rotation: number) {
    this.rotationAngle = rotation;
  }
}
