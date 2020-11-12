import { Injectable, Renderer2 } from '@angular/core';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';
import { ColorService } from './common/color.service';

@Injectable({
  providedIn: 'root',
})
export class PolygonService {

  private weight: number;
  private nbSide: number;
  private type: number;
  coordTable: number[][];
  originPoint: Point = new Point(0, 0);
  firstPoint: Point = new Point(0, 0);
  middlePoint: Point = new Point(0, 0);

  constructor(private colorService: ColorService) {
    this.nbSide = 3;
    this.weight = 1;
    this.type = 0;
  }

  createElement(render: Renderer2, point: Point) {
    const element = render.createElement('polygon', SVG_LINK);
    this.getStyle(render, element);
    this.firstPoint = point;
    this.coordTable = [];
    for (let i = 0; i < this.nbSide; i++) {
      this.coordTable[i] = new Array<number>(2);
    }
    this.update(render, point, element);
    return element;
  }

  private getStyle(render: Renderer2, element: SVGElement) {
    render.setStyle(element, 'stroke-width', this.weight.toString());
    switch (this.type) {
      case 0 :
        render.setStyle(element, 'stroke', this.colorService.primaryColor.getValue());
        render.setStyle(element, 'fill', 'none');
        break;
      case 1 :
        render.setStyle(element, 'stroke', 'none');
        render.setStyle(element, 'fill', this.colorService.primaryColor.getValue());
        break;
      case 2 :
        render.setStyle(element, 'fill', this.colorService.primaryColor.getValue());
        render.setStyle(element, 'stroke', this.colorService.secondColor.getValue());
        break;
    }
  }

  update(render: Renderer2, point: Point, element: any) {
    const squarePoint = this.squareCoord(point);
    this.findUpperLeftCorner(squarePoint);
    this.findMiddlePoint(squarePoint);
    this.fillCoordTable(squarePoint);
    render.setAttribute(element, 'points', this.pointToString());
  }

  private squareCoord(coord: Point): Point {
    const diffX = Math.abs(this.firstPoint.x - coord.x);
    const diffY = Math.abs(this.firstPoint.y - coord.y);
    return (diffY <= diffX) ?
      new Point((this.firstPoint.x <= coord.x) ? coord.x : this.firstPoint.x - diffX,
                (this.firstPoint.y <= coord.y) ?  this.firstPoint.y + diffX : this.firstPoint.y - diffX ) :
      new Point((this.firstPoint.x <= coord.x) ?  this.firstPoint.x + diffY : this.firstPoint.x - diffY,
                (this.firstPoint.y <= coord.y) ? coord.y : this.firstPoint.y - diffY);
  }

  private pointToString(): string {
    let pointString = '';
    for (const coord of this.coordTable) {
      pointString += coord[0].toString() + ',' + coord[1].toString() + ' ';
    }
    return pointString.slice(0, pointString.length - 1);
  }

  private findUpperLeftCorner(coord: Point) {
    this.originPoint = new Point(
      (coord.x >= this.firstPoint.x) ? this.firstPoint.x : coord.x,
      (coord.y < this.firstPoint.y) ? coord.y : this.firstPoint.y);
  }

  private findMiddlePoint(coord: Point) {
    this.middlePoint = new Point(Math.ceil((coord.x + this.firstPoint.x) / 2), Math.ceil((coord.y + this.firstPoint.y) / 2));
  }

  private fillCoordTable(coord: Point) {
    const radius: number = this.findRadius(coord);
    for (let i = 0; i < this.nbSide; i++) {
      this.coordTable[i][0] = Math.ceil(Math.cos(this.findAngle(i)) * radius) + this.middlePoint.x;
      this.coordTable[i][1] = Math.ceil(Math.sin(this.findAngle(i)) * radius) + this.middlePoint.y;
    }
  }

  private findRadius(coord: Point): number {
    return (Math.abs(this.firstPoint.y - coord.y) >= Math.abs(this.firstPoint.x - coord.x)) ?
      this.originPoint.y - this.middlePoint.y :
      this.originPoint.x - this.middlePoint.x;
  }

  private findAngle(i: number): number {
    return (Math.PI / 2 + i * (2 * Math.PI / this.nbSide));
  }

  set setWeight(weight: number) {
    if (weight > 0) {
      this.weight = weight;
    }
  }

  set setNbSide(nbSide: number) {
    if (nbSide >= 3 && nbSide <= 12 ) {
      this.nbSide = nbSide;
    }
  }

  set setType(type: number) {
      this.type = type;
  }
}
