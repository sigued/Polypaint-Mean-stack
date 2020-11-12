import { Injectable, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';

@Injectable({
  providedIn: 'root',
})
export class EtampeService {

echelle: number;
type: number;
width: number;
height: number;
rotationAngle: number;
stampRef: number;
activeStamp: string;
element: SVGElement;
currentPoint: Point;
render: Renderer2;
wheelRotation: number;
rotationAngleSubject = new Subject<number>();

constructor() {
  this.echelle = 5;
  this.width = 50;
  this.height = 50;
  this.rotationAngle = 0;
  this.stampRef = 0;
  this.wheelRotation = 0;
}

  createElement(render: Renderer2, point: Point) {
    this.currentPoint = point;
    this.render = render;
    this.element = render.createElement('image', SVG_LINK);
    if (this.stampRef >= 0 && this.stampRef < 6) {
      render.setAttribute(this.element, 'href', '../assets/images/' + this.activeStamp + '.svg');
    }

    const x = (point.x - ((this.width) / 2)).toString();
    const y = (point.y - ((this.height) / 2)).toString();
    render.setAttribute(this.element, 'x', x);
    render.setAttribute(this.element, 'y', y);
    render.setAttribute(this.element, 'height', (this.width * this.echelle).toString());
    render.setAttribute(this.element, 'width', (this.width * this.echelle).toString());
    render.setAttribute(this.element, 'transform', this.rotate(point, this.rotationAngle));
    return this.element;
  }

  update(render: Renderer2, point: Point) {
    this.createElement(render, point);
  }

  rotate(point: Point, rotationAngle: number) {
    return 'rotate(' + rotationAngle.toString() + ',' +
      point.x.toString() + ',' + point.y.toString()
      + ') ';
  }

  setActiveStamp(stamp: string) {
    this.activeStamp = stamp;
  }

  setType(type: number) {
    this.type = type;
  }

  setEchelle(echelle: number) {
    this.echelle = echelle;
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  setRotationAngle(rotation: number) {
    this.rotationAngle = rotation;
  }

  setStampRef(num: number) {
    this.stampRef = num;
  }

  mouseWheelRotation(wheelEvent: WheelEvent, render: Renderer2) {
    if (wheelEvent.deltaY > 0) {
      (wheelEvent.altKey) ? this.wheelRotation++ : this.wheelRotation += 15;
    } else {
      (wheelEvent.altKey) ? this.wheelRotation-- : this.wheelRotation -= 15;
    }
    if (this.element !== undefined) {
      render.setAttribute(this.element, 'transform', this.rotate(this.currentPoint, this.wheelRotation));
    }
    this.rotationAngleSubject.next(this.wheelRotation);
  }

}
