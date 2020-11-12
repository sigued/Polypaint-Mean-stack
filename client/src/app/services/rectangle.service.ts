import { Injectable, Renderer2 } from '@angular/core';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';
import { ColorService } from './common/color.service';

@Injectable({
  providedIn: 'root',
})
export class RectangleService {
  height: number;
  width: number;
  originPoint: Point;
  firstPoint: Point;
  thickness: number;
  type: number;
  isDraggable: true;
  weight: string;

  constructor(private colorService: ColorService) {
    this.isDraggable = true;
    this.originPoint = new Point(0, 0);
    this.firstPoint = new Point(0, 0);
    this.thickness = 1;
    this.weight = '1';
  }

  createElement(render: Renderer2, point: Point) {
    const element = render.createElement('rect', SVG_LINK);
    render.setAttribute(element, 'style', this.getAttribute(this.colorService.primaryColor.getValue()));
    this.setFirstPoint(point);
    this.update(render, point, element, false);
    return element;
  }

  update(render: Renderer2, point: Point, element: any, shiftKeyPressed: boolean) {
    this.finaliseAttribute(point);
    render.setAttribute(element, 'x', this.originPoint.x.toString());
    render.setAttribute(element, 'y', this.originPoint.y.toString());
    render.setAttribute(element, 'width', this.width.toString());

    switch (this.type) {
      case 1 :
        render.setStyle(element, 'stroke', 'white');
        render.setStyle(element, 'fill', this.colorService.primaryColor.getValue());
        break;
      case 2 :
        render.setStyle(element, 'fill', this.colorService.primaryColor.getValue());
        render.setStyle(element, 'stroke', this.colorService.secondColor.getValue());
        break;
    }

    if (shiftKeyPressed) {
        render.setAttribute(element, 'height', this.width.toString());
    } else {
        render.setAttribute(element, 'height', this.height.toString());
    }
  }

  setWeight(weight: string) {
    this.weight = weight;
  }

  setType(type: number) {
    this.type = type;
  }

  getAttribute(color: string) {
    return 'stroke-width:' + this.weight + ';stroke:' + color + ';fill:none';
  }

  setFirstPoint(coord: Point) { this.firstPoint = coord; }

  onMouvement(coord: Point): any { this.updateRectAttr(coord); }

  updateRectAttr(actualCoord: Point) {
    this.originPoint = this.findUpperLeftCorner(actualCoord);
    this.height = Math.abs(actualCoord.y - this.firstPoint.y);
    this.width = Math.abs(actualCoord.x - this.firstPoint.x);
  }

  findUpperLeftCorner(coord: Point): Point {
    return new Point(
    (coord.x >= this.firstPoint.x) ? this.firstPoint.x : coord.x ,
    (coord.y < this.firstPoint.y) ? coord.y : this.firstPoint.y) ;
  }

  finaliseAttribute( lastCoord: Point): void {
    this.updateRectAttr(lastCoord);
  }

}
