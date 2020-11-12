import { Injectable } from '@angular/core';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  private elementCopied: SvgElement[];
  private extremum: Point;

  constructor() {
    this.elementCopied = [];
    this.extremum = new Point(0, 0);
  }

  copy(elements: SvgElement[], svg: any) {
    this.elementCopied = [];
    for (const child of elements) {
      const newSvgElement = new SvgElement(0, new Point(0, 0), new Point(0, 0), 0, 0, svg);
      newSvgElement.element = child.element.cloneNode(true) as HTMLElement;
      newSvgElement.translatePoint = child.translatePoint;
      newSvgElement.setTransform(child.transform);
      this.elementCopied.push(newSvgElement);
    }
  }

  setExtremum(point: Point) {
    this.extremum = point;
  }

  getElement(): SvgElement[] {
    return this.elementCopied;
  }

  getExtremun(): Point {
    return this.extremum;
  }
}
