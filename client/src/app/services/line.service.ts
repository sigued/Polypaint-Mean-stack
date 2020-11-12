import { Injectable, Renderer2 } from '@angular/core';
import { DEFAULT_LINE_DASHARRAY_VALUE, DEFAULT_LINE_JUNCTION_DIAMETER, DEFAULT_LINE_WIDTH, EMPTY_STRING,
         SVG_CIRCLE, SVG_CIRCLE_CX, SVG_CIRCLE_CY, SVG_CIRCLE_RADIUS, SVG_FILL, SVG_GROUP, SVG_ID,
         SVG_LINK, SVG_MITER, SVG_NONE, SVG_POINT, SVG_POLYLINE, SVG_ROUND, SVG_STROKE, SVG_STROKE_DASHARRAY,
         SVG_STROKE_LINEJOIN, SVG_STROKE_WIDTH, SVG_STYLE, ZERO,  } from '../constant';
import { Point } from '../entity/point';
import { ColorService } from './common/color.service';

@Injectable({
  providedIn: 'root',
})
export class LineService {
junctionType: number;
dashedLine: number;
circleCounter: number;

path: string;
previousPath: string;

styleAttribute: string;
initialStyleAttribute: string;
width: string;
junctionDiameter: string;

firstPoint: Point;

keyboardEvent: KeyboardEvent;

element: SVGElement;
group: SVGElement;

startDrawing: boolean;

lineStateArray: string[] = [];
stateCounter: number;

deleteSegmentsStarted: boolean;

constructor(private colorService: ColorService) {
  this.junctionType = ZERO;
  this.dashedLine = ZERO;
  this.circleCounter = ZERO;
  this.stateCounter = ZERO;

  this.width = DEFAULT_LINE_WIDTH;
  this.junctionDiameter = DEFAULT_LINE_JUNCTION_DIAMETER;
  this.path = EMPTY_STRING;
  this.previousPath = EMPTY_STRING;
  this.initialStyleAttribute = SVG_STROKE_LINEJOIN + ':' + SVG_MITER + ';' + SVG_STROKE_DASHARRAY + ':' + ZERO + ';';
  this.firstPoint = new Point(0, 0);
  this.lineStateArray = [];
  this.deleteSegmentsStarted = false;
}

  mouseUp(render: Renderer2, point: Point, isDrawing: boolean, nativeSVG: SVGElement) {
    if (isDrawing) {
      this.update(render, point, nativeSVG);
    } else {
      this.element = this.createElement(render, point);
      this.group = render.createElement(SVG_GROUP, SVG_LINK);
      this.group.appendChild(this.element);
      nativeSVG.appendChild(this.group);
    }
  }

  createElement(render: Renderer2, point: Point) {
    this.lineStateArray = [];
    this.stateCounter = 0;
    this.circleCounter = 0;
    const element = render.createElement(SVG_POLYLINE, SVG_LINK);
    this.firstPoint = this.setFirstPoint(point);
    this.path = this.firstPoint.x + ',' + this.firstPoint.y;
    this.updateLineStateArray();
    render.setAttribute(element, SVG_ID, SVG_POLYLINE);
    render.setAttribute(element, SVG_POINT, this.getCurrentPath(point));
    render.setAttribute(element, SVG_STYLE, this.getAttribute(this.colorService.primaryColor.getValue()));
    this.element = element;
    this.changeLineDashed(render);
    return element;
  }

  update(render: Renderer2, point: Point, nativeSVG: SVGElement) {
    if (this.startDrawing) {
      this.circleCounter++;
      this.element = this.createElement(render, point);
      this.group = render.createElement(SVG_GROUP, SVG_LINK);
      this.group.appendChild(this.element);
      nativeSVG.appendChild(this.group);
      this.startDrawing = false;
      if (this.deleteSegmentsStarted) {
        this.stateCounter++;
        this.deleteSegmentsStarted = false;
      }
    }
    this.updateLineStateArray();
    this.path += ' ' + point.x + ',' + point.y;
    render.setAttribute(this.element, SVG_POINT, this.path);
    this.changeLineJunction(render, point);
    this.changeLineDashed(render);
  }

  updateLineStateArray() {
    this.lineStateArray[this.stateCounter] = this.path;
    this.stateCounter++;
  }

  showPotentialLine(render: Renderer2, point: Point) {
    this.previousPath = this.path;
    this.path += ' ' + point.x + ',' + point.y;
    render.setAttribute(this.element, SVG_POINT, this.path);
    this.path = this.previousPath;
  }

  stop(render: Renderer2, point: Point, shiftKeyPressed: boolean) {
    if (shiftKeyPressed) {
      this.path += ' ' + point.x + ',' + point.y
      + ' ' + this.firstPoint.x + ',' + this.firstPoint.y;
    } else {
      this.path += ' ' + point.x + ',' + point.y;
    }
    render.setAttribute(this.element, SVG_POINT, this.path);
  }

  getAttribute(primaryColor: string): string {
    this.styleAttribute = this.initialStyleAttribute
     + SVG_STROKE_WIDTH + ':' + this.width
     + ';' + SVG_STROKE + ':' + primaryColor
     + ';' + SVG_FILL + ':' + SVG_NONE
     + ';';
    return this.styleAttribute;
  }

  getCurrentPath(point: Point): string {
    this.path += ' ' + point.x + ',' + point.y;
    return this.path;
  }

  changeLineJunction(render: Renderer2, point: Point) {
    switch (this.junctionType) {
      case 0 :
        render.setStyle(this.element, SVG_STROKE_LINEJOIN, SVG_MITER);
        break;
      case 1 :
        render.setStyle(this.element, SVG_STROKE_LINEJOIN, SVG_ROUND);
        break;
      case 2 :
        const junctionCircle = this.createCircle(render, point.x, point.y);
        render.appendChild(this.group, junctionCircle);
        break;
    }
  }

  createCircle(render: Renderer2, cx: number, cy: number) {
    const circle = render.createElement(SVG_CIRCLE, SVG_LINK);
    render.setAttribute(circle, SVG_ID, SVG_CIRCLE);
    render.setAttribute(circle, SVG_CIRCLE_CX, cx.toString());
    render.setAttribute(circle, SVG_CIRCLE_CY, cy.toString());
    render.setAttribute(circle, SVG_CIRCLE_RADIUS, this.junctionDiameter);
    render.setStyle(circle, SVG_FILL, this.colorService.primaryColor.getValue());
    this.circleCounter++;
    return circle;
  }

  changeLineDashed(render: Renderer2) {
    switch (this.dashedLine) {
      case 0 :
        render.setStyle(this.element, SVG_STROKE_DASHARRAY, ZERO);
        break;
      case 1 :
        render.setStyle(this.element, SVG_STROKE_DASHARRAY, DEFAULT_LINE_DASHARRAY_VALUE);
        break;
    }
  }

  backspaceClicked(render: Renderer2) {
    if (!this.deleteSegmentsStarted) {
      this.stateCounter--;
      this.deleteSegmentsStarted = true;
      this.deleteJunctionCircle(render);
    }
    if (this.stateCounter > 1) {
      this.stateCounter--;
    }
    this.path = this.lineStateArray[this.stateCounter];
    render.setAttribute(this.element, SVG_POINT, this.path);
    this.deleteJunctionCircle(render);
  }

  deleteJunctionCircle(render: Renderer2) {
    if (this.group.lastChild && this.circleCounter > 0) {
      this.group.removeChild(this.group.lastChild);
      this.circleCounter--;
    }
  }

  escapeClicked() {
    while (this.group.firstElementChild && this.circleCounter >= 0) {
      this.group.removeChild(this.group.firstElementChild);
      this.circleCounter--;
    }
    this.startDrawing = true;
  }

  setFirstPoint(point: Point): Point {
    const firstPointSet = new Point(point.x, point.y);
    return firstPointSet;
  }

  setJunctionDiametre(diametre: string) {
    this.junctionDiameter = diametre;
  }

  setWidth(width: string) {
    this.width = width;
  }

  setDashed(dashed: number) {
    this.dashedLine = dashed;
  }

  setJunctionType(type: number) {
    this.junctionType = type;
  }
}
