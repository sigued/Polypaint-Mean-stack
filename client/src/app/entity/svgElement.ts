import { ElementRef } from '@angular/core';
import { Point } from './point';

export class SvgElement {
  height: number;
  width: number;
  originPoint: Point;
  firstPoint: Point;
  element: HTMLElement;
  id: number;
  lastx = 0;
  lasty = 0;
  svg: ElementRef;
  translatePoint: Point;
  scalePoint: Point;
  rotate: number;
  transform: string;
  lastTransform: string;

  constructor(id: number, originPoint: Point, firstPoint: Point, width: number, height: number, svg: ElementRef) {
    this.originPoint = originPoint;
    this.firstPoint = firstPoint;
    this.id = id;
    this.width = width;
    this.height = height;
    this.svg = svg;
    this.translatePoint = new Point(0, 0);
    this.scalePoint = new Point(0, 0);
    this.transform = '';
    this.lastTransform = '';
  }

  setFirstPoint(coord: Point): void {
    this.firstPoint = coord;
    this.originPoint = coord;
  }

  updateRectAttr(actualCoord: Point, active: number): void {
    this.originPoint = this.findUpperLeftCorner(actualCoord);

    if (active === 0 || active === 1) {
      if (this.lastx < actualCoord.x) {
        this.lastx = actualCoord.x;
      }
      if (this.lasty < actualCoord.y) {
        this.lasty = actualCoord.y;
      }
    } else {
      this.lastx = actualCoord.x;
      this.lasty = actualCoord.y;
    }

    this.height = Math.abs(this.lasty - this.originPoint.y);
    this.width = Math.abs(this.lastx - this.originPoint.x);
  }

  findUpperLeftCorner(coord: Point): Point {
    return new Point(
      (coord.x >= this.originPoint.x) ? this.originPoint.x : coord.x,
      (coord.y < this.originPoint.y) ? coord.y : this.originPoint.y);
  }

  finaliseAttribute(lastCoord: Point, active: number): void {
    this.updateRectAttr(lastCoord, active);
  }

  isInRange(point: Point, width: number, height: number) {
    for (let i = this.getX(); i < this.getX() + this.getWidth(); i += 6) {
      for (let j = this.getY(); j < this.getY() + this.getHeight(); j += 6) {
        if ((i >= point.x && i <= point.x + width) &&
          (j >= point.y && j <= point.y + height)) {
          return true;
        }
      }
    }
    return false;
  }

  getX() {
    return this.element.getBoundingClientRect().left - this.svg.nativeElement.getBoundingClientRect().left;
  }

  getY() {
    return this.element.getBoundingClientRect().top - this.svg.nativeElement.getBoundingClientRect().top;
  }

  getWidth() {
    return this.element.getBoundingClientRect().width;
  }

  getHeight() {
    return this.element.getBoundingClientRect().height;
  }

  getCenterX() {
    return Math.floor(this.getX()) + Math.floor((this.getWidth() / 2));
  }

  getCenterY() {
    return Math.floor(this.getY()) + Math.floor((this.getHeight() / 2));
  }

  updateTranslate(value: Point) {
    this.translatePoint = value;
  }

  setScalePoint(value: Point) {
    this.scalePoint = value;
  }

  setTransform(value: string) {
    this.transform = value;
  }

  setLastTransform(value: string) {
    this.lastTransform = value;
  }

  updateTransform() {
    this.transform = this.lastTransform + this.transform;
    this.lastTransform = '';
  }

  updateRotate(value: number) {
    this.rotate += value;
  }
}
