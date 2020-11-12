import { Injectable } from '@angular/core';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {

  constructor() {/**/ }

  resizeFromTopLeft(element: SvgElement, point: Point, width: number, height: number, originPoint: Point): string {
    const scalex = (point.x / width) + 1;
    const scaley = (point.y / height) + 1;
    const saclestr = scalex + ',' + scaley;
    let newTransform = ' translate(' + (originPoint.x - point.x) + ',' + (originPoint.y - point.y) + ') ' +
      ' scale(' + saclestr + ')' +
      ' translate(' + -originPoint.x + ',' + -originPoint.y + ') ';
    element.setLastTransform(newTransform);
    newTransform = newTransform + element.transform;
    return newTransform;
  }

  resizeFromTopCenter(element: SvgElement, point: Point, height: number, originPoint: Point): string {
    const scalex = 1;
    const scaley = (point.y / height) + 1;
    const saclestr = scalex + ',' + scaley;
    let newTransform = ' translate(' + originPoint.x + ',' + (originPoint.y - point.y) + ') ' +
      ' scale(' + saclestr + ')' +
      ' translate(' + -originPoint.x + ',' + -originPoint.y + ') ';
    element.setLastTransform(newTransform);
    newTransform = newTransform + element.transform;
    return newTransform;
  }

  resizeFromTopRight(element: SvgElement, point: Point, width: number, height: number, originPoint: Point): string {
    const scalex = (point.x / width) + 1;
    const scaley = (point.y / height) + 1;
    const saclestr = scalex + ',' + scaley;
    let newTransform = ' translate(' + originPoint.x + ',' + (originPoint.y - point.y) + ') ' +
      ' scale(' + saclestr + ')' +
      ' translate(' + -originPoint.x + ',' + -originPoint.y + ') ';
    element.setLastTransform(newTransform);
    newTransform = newTransform + element.transform;
    return newTransform;
  }

  resizeFromCenterLeft(element: SvgElement, point: Point, width: number, originPoint: Point): string {
    const scalex = (point.x / width) + 1;
    const scaley = 1;
    const saclestr = scalex + ',' + scaley;
    let newTransform = ' translate(' + (originPoint.x - point.x) + ',' + originPoint.y + ') ' +
      ' scale(' + saclestr + ')' +
      ' translate(' + -originPoint.x + ',' + -originPoint.y + ') '
      ;
    element.setLastTransform(newTransform);
    newTransform = newTransform + element.transform;
    return newTransform;
  }

  resizeFromCenterRight(element: SvgElement, point: Point, width: number, originPoint: Point): string {
    const scalex = 1 + point.x / width;
    const scaley = 1;
    const saclestr = scalex + ',' + scaley;
    let newTransform = ' translate(' + originPoint.x + ',' + originPoint.y + ') ' +
      ' scale(' + saclestr + ')' +
      ' translate(' + -originPoint.x + ',' + -originPoint.y + ') ';

    element.setLastTransform(newTransform);
    newTransform = newTransform + element.transform;
    return newTransform;
  }

  resizeFromBottomLeft(element: SvgElement, point: Point, width: number, height: number, originPoint: Point): string {
    const scalex = (point.x / width) + 1;
    const scaley = (point.y / height) + 1;
    const saclestr = scalex + ',' + scaley;
    let newTransform = ' translate(' + (originPoint.x - point.x) + ',' + originPoint.y + ') ' +
      ' scale(' + saclestr + ')' +
      ' translate(' + -originPoint.x + ',' + -originPoint.y + ') ';
    element.setLastTransform(newTransform);
    newTransform = newTransform + element.transform;
    return newTransform;
  }

  resizeFromBottomCenter(element: SvgElement, point: Point, height: number, originPoint: Point): string {
    const scalex = 1;
    const scaley = (point.y / height) + 1;
    const saclestr = scalex + ',' + scaley;
    let newTransform = ' translate(' + originPoint.x + ',' + originPoint.y + ') ' +
      ' scale(' + saclestr + ')' +
      ' translate(' + -originPoint.x + ',' + -originPoint.y + ') ';
    element.setLastTransform(newTransform);
    newTransform = newTransform + element.transform;
    return newTransform;
  }

  resizeFromBottomRight(element: SvgElement, point: Point, width: number, height: number, originPoint: Point): string {
    const scalex = (point.x / width) + 1;
    const scaley = (point.y / height) + 1;
    const saclestr = scalex + ',' + scaley;
    let newTransform = ' translate(' + originPoint.x + ',' + originPoint.y + ') ' +
      ' scale(' + saclestr + ')' +
      ' translate(' + -originPoint.x + ',' + -originPoint.y + ') ';
    element.setLastTransform(newTransform);
    newTransform = newTransform + element.transform;
    return newTransform;
  }
}
