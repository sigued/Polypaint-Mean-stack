import { Injectable, Renderer2 } from '@angular/core';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';
import { ColorService } from './common/color.service';

@Injectable({
  providedIn: 'root',
})
export class EllipseService {

/** Property */
weight: string;
type: number;
firstPoint: Point;
isDraggable: boolean;
originPoint: Point;
thickness: number;
height: number;
width: number;

constructor(private colorService: ColorService) {
  this.originPoint = new Point(0, 0);
  this.firstPoint = new Point(0, 0);
  this.thickness = 1;
  this.weight = '1';
 }

  createElement(render: Renderer2, point: Point) {
    const element = render.createElement('ellipse', SVG_LINK);
    render.setAttribute(element, 'style', this.getAttribute(this.colorService.primaryColor.getValue()));
    this.setFirstPoint(point);
    return element;
  }

  update(render: Renderer2, point: Point, element: any, shiftKeyPressed: boolean) {
    /** if shiftKeyPressed make a circle */
    this.finaliseAttribute(point);
    render.setAttribute(element, 'cx', this.originPoint.x.toString());
    render.setAttribute(element, 'cy', this.originPoint.y.toString());
    render.setAttribute(element, 'rx', this.width.toString());

    switch (this.type) {
      case 0 :
        break;
      case 1 :
        render.setStyle(element, 'stroke', 'white');
        render.setStyle(element, 'fill', this.colorService.primaryColor.getValue());
        break;
      case 2 :
        render.setStyle(element, 'fill', this.colorService.primaryColor.getValue());
        render.setStyle(element, 'stroke', this.colorService.secondColor.getValue());
        break;
    }

    (shiftKeyPressed) ? render.setAttribute(element, 'ry', this.width.toString()) :
    render.setAttribute(element, 'ry', this.height.toString());
  }

setFirstPoint(coord: Point) { this.firstPoint = coord; }

getAttribute(color: string) {
    return 'stroke-width:' + this.weight + ';stroke:' + color + ';fill:none';
  }

setType(type: number) {
    this.type = type;
  }

setWeight(weight: string) {
    this.weight = weight;
  }

finaliseAttribute( lastCoord: Point): void {
    this.updateEllipseAttr(lastCoord);
  }

updateEllipseAttr(actualCoord: Point) {
    this.originPoint = this.findUpperLeftCorner(actualCoord);
    this.height = Math.abs(actualCoord.y - this.firstPoint.y);
    this.width = Math.abs(actualCoord.x - this.firstPoint.x);
  }

findUpperLeftCorner(coord: Point): Point {
    return new Point(
    (coord.x >= this.firstPoint.x) ? this.firstPoint.x : coord.x ,
    (coord.y < this.firstPoint.y) ? coord.y : this.firstPoint.y) ;
  }

}
