import { Injectable, Renderer2 } from '@angular/core';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';
import { ColorService } from './common/color.service';

declare var require: any;
// tslint:disable-next-line:no-require-imports no-var-requires
const { IntersectionQuery } = require('kld-intersections');
// tslint:disable-next-line:no-require-imports no-var-requires
const { Point2D } = require('kld-affine');

const DELAY = 75;

@Injectable({
  providedIn: 'root',
})
export class SprayService {
  private radius: number;
  private gElement: SVGElement;
  private quantity: number;
  private previousTimer: NodeJS.Timer;

  constructor(private colorService: ColorService) {
    this.radius = 7;
    this.quantity = 3;
    this.previousTimer = setInterval( () => {console.log(this.previousTimer); }, 10 );
    clearInterval(this.previousTimer);
  }

  set setRadius(radius: number) {
    this.radius = radius;
  }

  set setQuantity(quantity: number) {
    this.quantity = quantity * 3;
  }

  create(render: Renderer2, point: Point, nativeSVG: SVGElement) {
    this.gElement = render.createElement('g', SVG_LINK);
    nativeSVG.appendChild(this.gElement);
    this.timerSpray(render, point);
    return this.gElement;
  }

  private getCorrectCoord(point: Point): Point {
    let isValidPoint: any;
    let coordX: number = point.x;
    let coordY: number = point.y;
    while (!isValidPoint) {
      coordX = Math.ceil((2 * Math.random() * this.radius) + point.x - this.radius);
      coordY = Math.ceil((2 * Math.random() * this.radius) + point.y - this.radius);
      isValidPoint = IntersectionQuery.pointInCircle(
        new Point2D( coordX, coordY ),
        new Point2D( point.x, point.y),
        this.radius,
      );
    }
    return new Point(coordX, coordY);
  }

  private createPoint(render: Renderer2, point: Point): SVGElement {
    const element = render.createElement('circle', SVG_LINK);
    render.setAttribute(element, 'cx', point.x.toString());
    render.setAttribute(element, 'cy', point.y.toString());
    render.setAttribute(element, 'r', '1');
    render.setStyle(element, 'fill', this.colorService.primaryColor.getValue());
    return element;
  }

  private spraySplash(render: Renderer2, point: Point) {
    for (let i = 0; i < this.quantity ; i++) {
      const newPoint = this.createPoint(render, this.getCorrectCoord(point));
      this.gElement.appendChild(newPoint);
    }
  }

  private timerSpray(render: Renderer2, point: Point) {
    clearInterval(this.previousTimer);
    this.spraySplash(render, point);
    const timer = setInterval( () => {
        this.spraySplash(render, point);
    }, DELAY);
    this.previousTimer = timer;
  }

  update(render: Renderer2, point: Point) {
    this.timerSpray(render, point);
  }

  stop(render: Renderer2, point: Point) {
    this.spraySplash(render, point);
    clearInterval(this.previousTimer);
  }

}
