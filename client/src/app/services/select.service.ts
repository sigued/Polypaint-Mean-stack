import { Injectable, Renderer2 } from '@angular/core';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
import { MagnestismService } from './magnetism.service';
import { ResizeService } from './resize.service';

enum ControlPoint { TOPLEFT = 1, TOPCENTER = 2, TOPRIGHT = 3, CENTERLEFT = 4,
  CENTERRIGHT = 5, BOTTOMLEFT= 6, BOTTOMCENTER = 7, BOTTOMRIGHT = 8 }

enum ControlCorner { TOPLEFT = 'Top Left', TOPCENTER = 'Top Center', TOPRIGHT = 'Top Right', LEFTCENTER = 'Left Center',
RIGHTCENTER = 'Right Center', BOTTOMLEFT= 'Bottom Left', BOTTOMCENTER = 'Bottom Center', BOTTOMRIGHT = 'Bottom Right' }

enum SelectStatus { None = 0, Deselecting = 1, Resizing = 2, Moving = 3 }

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  height: number;
  width: number;
  originPoint: Point;
  firstPoint: Point;
  extremumPoint: Point;
  selectedElement: SvgElement[] = [];
  selectContainer: HTMLElement[] = [];
  point: Point;
  mouseDownPoint: Point;
  firstScalePoint: Point;
  originScalePoint: Point;
  firstScaleWidth: number;
  firstScaleHeight: number;
  selectedControlPoint: number;
  status: SelectStatus;
  lastScaleTransform: string;

  constructor(private magnestismService: MagnestismService, private resizeService: ResizeService) {
    this.init();
    this.extremumPoint = new Point(0, 0);
    this.point = new Point(0, 0);
    this.selectedControlPoint = 0;
    this.status = SelectStatus.None;
    this.mouseDownPoint = new Point(0, 0);
    this.firstScalePoint = new Point(0, 0);
    this.firstScaleWidth = 0;
    this.lastScaleTransform = '';
  }

  createElement(render: Renderer2, point: Point, svg: HTMLElement) {

    if (this.selectContainer.length === 0) {
      this.init();
      this.selectedElement = [];
      const element = render.createElement('rect', SVG_LINK);
      render.setAttribute(element, 'style', 'stroke-width:3;stroke:gray;fill:none;stroke-dasharray:5,5;');
      this.setFirstPoint(point);
      this.selectContainer.push(element);
      return element;
    } else {
      this.point = new Point(point.x, point.y);
      this.mouseDownPoint = new Point(point.x, point.y);
      this.selectedControlPoint = this.isIncontactWithControlPoint(svg);
      return 'select';
    }
  }

  update(render: Renderer2, point: Point, element: any, svg: HTMLElement, shiftKeyPressed: boolean, altKeyPressed: boolean ) {
    if (this.selectedElement.length === 0) {
      this.finaliseAttribute(point);
      render.setAttribute(element, 'x', this.originPoint.x.toString());
      render.setAttribute(element, 'y', this.originPoint.y.toString());
      render.setAttribute(element, 'width', this.width.toString());
      render.setAttribute(element, 'height', this.height.toString());
    } else {

      if (this.selectedControlPoint > 0) {
        this.status = SelectStatus.Resizing;
        this.resizeSelectedItem(point, render, svg, shiftKeyPressed, altKeyPressed);
      } else {
        const newPoint = new Point(point.x - this.point.x, point.y - this.point.y);
        this.status = SelectStatus.Moving;
        if (this.magnestismService.isActivated) {
          const newerPoint = new Point(this.originPoint.x + newPoint.x, this.originPoint.y + newPoint.y);
          let futurePoint = this.magnestismService.getClosestPoint(newerPoint, newPoint);
          let deltaPoint = new Point(futurePoint.x - this.originPoint.x, futurePoint.y - this.originPoint.y);
          if (this.magnestismService.corner === ControlCorner.TOPRIGHT) {
            const pointTopRight = new Point(this.originPoint.x + this.width, this.originPoint.y);
            const newerPointTopRight = new Point(pointTopRight.x + newPoint.x, pointTopRight.y + newPoint.y);
            futurePoint = this.magnestismService.getClosestPoint(newerPointTopRight, newPoint);
            deltaPoint = new Point(futurePoint.x - pointTopRight.x, futurePoint.y - pointTopRight.y);
            futurePoint.x = this.originPoint.x + deltaPoint.x;
            futurePoint.y = this.originPoint.y + deltaPoint.y;
          } else if (this.magnestismService.corner === ControlCorner.TOPCENTER) {
            const pointTopCenter = new Point(this.originPoint.x + this.width / 2, this.originPoint.y);
            const newerPointTopCenter = new Point(pointTopCenter.x + newPoint.x, pointTopCenter.y + newPoint.y);
            futurePoint = this.magnestismService.getClosestPoint(newerPointTopCenter, newPoint);
            deltaPoint = new Point(futurePoint.x - pointTopCenter.x, futurePoint.y - pointTopCenter.y);
            futurePoint.x = this.originPoint.x + deltaPoint.x;
            futurePoint.y = this.originPoint.y + deltaPoint.y;
          } else if (this.magnestismService.corner === ControlCorner.BOTTOMLEFT) {
            const pointBottomLeft = new Point(this.originPoint.x, this.originPoint.y + this.height);
            const newerPointBottomLeft = new Point(pointBottomLeft.x + newPoint.x, pointBottomLeft.y + newPoint.y);
            futurePoint = this.magnestismService.getClosestPoint(newerPointBottomLeft, newPoint);
            deltaPoint = new Point(futurePoint.x - pointBottomLeft.x, futurePoint.y - pointBottomLeft.y);
            futurePoint.x = this.originPoint.x + deltaPoint.x;
            futurePoint.y = this.originPoint.y + deltaPoint.y;
          } else if (this.magnestismService.corner === ControlCorner.BOTTOMRIGHT) {
            const pointBottomRight = new Point(this.originPoint.x + this.width, this.originPoint.y + this.height);
            const newerPointBottomRight = new Point(pointBottomRight.x + newPoint.x, pointBottomRight.y + newPoint.y);
            futurePoint = this.magnestismService.getClosestPoint(newerPointBottomRight, newPoint);
            deltaPoint = new Point(futurePoint.x - pointBottomRight.x, futurePoint.y - pointBottomRight.y);
            futurePoint.x = this.originPoint.x + deltaPoint.x;
            futurePoint.y = this.originPoint.y + deltaPoint.y;
          } else if (this.magnestismService.corner === ControlCorner.BOTTOMCENTER) {
            const pointBottomCenter = new Point(this.originPoint.x + this.width / 2, this.originPoint.y + this.height);
            const newerPointBottomCenter = new Point(pointBottomCenter.x + newPoint.x, pointBottomCenter.y + newPoint.y);
            futurePoint = this.magnestismService.getClosestPoint(newerPointBottomCenter, newPoint);
            deltaPoint = new Point(futurePoint.x - pointBottomCenter.x, futurePoint.y - pointBottomCenter.y);
            futurePoint.x = this.originPoint.x + deltaPoint.x;
            futurePoint.y = this.originPoint.y + deltaPoint.y;
          } else if (this.magnestismService.corner === ControlCorner.RIGHTCENTER) {
            const pointRightCenter = new Point(this.originPoint.x + this.width, this.originPoint.y + this.height / 2);
            const newerPointRightCenter = new Point(pointRightCenter.x + newPoint.x, pointRightCenter.y + newPoint.y);
            futurePoint = this.magnestismService.getClosestPoint(newerPointRightCenter, newPoint);
            deltaPoint = new Point(futurePoint.x - pointRightCenter.x, futurePoint.y - pointRightCenter.y);
            futurePoint.x = this.originPoint.x + deltaPoint.x;
            futurePoint.y = this.originPoint.y + deltaPoint.y;
          } else if (this.magnestismService.corner === ControlCorner.LEFTCENTER) {
            const pointLeftCenter = new Point(this.originPoint.x, this.originPoint.y + this.height / 2);
            const newerPointLeftCenter = new Point(pointLeftCenter.x + newPoint.x, pointLeftCenter.y + newPoint.y);
            futurePoint = this.magnestismService.getClosestPoint(newerPointLeftCenter, newPoint);
            deltaPoint = new Point(futurePoint.x - pointLeftCenter.x, futurePoint.y - pointLeftCenter.y);
            futurePoint.x = this.originPoint.x + deltaPoint.x;
            futurePoint.y = this.originPoint.y + deltaPoint.y;
          }
          this.moveSelectedItem(render, deltaPoint);
          this.originPoint = futurePoint;
        } else {
          this.moveSelectedItem(render, newPoint);
        }
      }
      this.deselect(render, svg);
      this.drawSelectItem(render, svg);
      this.point = point;

    }
  }

  stop(render: Renderer2, element: any, svgElements: SvgElement[], svg: any, point: Point) {
    this.selectedControlPoint = 0;
    if (this.selectedElement.length === 0) {
      this.updateSelectedElement(svgElements);
      if (this.selectedElement.length > 0) {
        this.updateRecSelect();
        this.drawContainer(element, render, svg);
        return this.selectContainer;
      }
      this.deselect(render, svg);
      return;
    } else {
      if (this.status === SelectStatus.None) {
        this.deselect(render, svg);
        if (this.point.isSamePoint(point)) {
          this.selectedElement = [];
        }
      } else if (this.status === SelectStatus.Resizing) {
        for (const child of this.selectedElement) {
          child.updateTransform();
        }
      }
      this.status = SelectStatus.None;
    }
    return null;
  }

  drawContainer(element: any, render: Renderer2, svg: any) {
    render.setAttribute(element, 'x', this.originPoint.x.toString());
    render.setAttribute(element, 'y', this.originPoint.y.toString());
    render.setAttribute(element, 'width', this.width.toString());
    render.setAttribute(element, 'height', this.height.toString());

    const width = this.originPoint.x + this.width;
    const height = this.originPoint.y + this.height;

    svg.appendChild(this.createCircle(render, this.originPoint.x, this.originPoint.y, 'nw-resize'));
    svg.appendChild(this.createCircle(render, this.originPoint.x + (this.width / 2), this.originPoint.y, 'ns-resize'));
    svg.appendChild(this.createCircle(render, width, this.originPoint.y, 'nesw-resize'));

    svg.appendChild(this.createCircle(render, this.originPoint.x, this.originPoint.y + (this.height / 2), 'w-resize'));
    svg.appendChild(this.createCircle(render, width, this.originPoint.y + (this.height / 2), 'w-resize'));

    svg.appendChild(this.createCircle(render, this.originPoint.x, height, 'nesw-resize'));
    svg.appendChild(this.createCircle(render, this.originPoint.x + (this.width / 2), height, 'ns-resize'));
    svg.appendChild(this.createCircle(render, width, height, 'nw-resize'));

    this.extremumPoint = new Point(width, height);

  }

  drawSelectItem(render: Renderer2, svg: any) {
    const rec = render.createElement('rect', SVG_LINK);
    render.setAttribute(rec, 'style', 'stroke-width:3;stroke:gray;fill:none;stroke-dasharray:5,5;');
    this.selectContainer.push(rec);
    this.updateRecSelect();
    this.drawContainer(rec, render, svg);
    svg.appendChild(rec);
  }

  selectItem(element: any, render: Renderer2, svg: any, svgElements: SvgElement[], clickType: number, point: Point) {
    // parmis la liste des objets selectionnees
    if (this.mouseDownPoint.isSamePoint(point)) {
      this.init();
      let result = this.find(element, this.selectedElement) as SvgElement;
      if (result !== null) {
        if (clickType === 0) {
          this.selectedElement = [];
          this.selectedElement.push(result);
        } else {
          this.deleteElement(result, this.selectedElement);
        }
        this.drawSelectItem(render, svg);
        return;
      }

      // parmi la liste des objets non selectionnees
      result = this.find(element, svgElements);
      if (result !== null) {
        if (clickType === 0) {
          this.selectedElement = [];
        }

        this.selectedElement.push(result);
        this.drawSelectItem(render, svg);
        return;
      }
    }

  }
  setFirstPoint(coord: Point) { this.firstPoint = coord; }

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

  updateSelectedElement(svgElements: SvgElement[] ) {
    for (const item of svgElements) {
      if (item.isInRange(this.originPoint, this.width, this.height)) {
        this.selectedElement.push(item);
      }
    }
  }

  updateRecSelect() {
    this.width = 0;
    this.height = 0;
    if (this.selectedElement.length > 0) {
      this.originPoint.x = this.selectedElement[0].getX();
      this.originPoint.y = this.selectedElement[0].getY();

      for (const item of this.selectedElement) {
        this.originPoint.x = this.originPoint.x <= item.getX() ? this.originPoint.x : item.getX();
        this.originPoint.y = this.originPoint.y <= item.getY() ? this.originPoint.y : item.getY();
      }

      for (const item of this.selectedElement) {
        if ((this.originPoint.x + this.width) <= (item.getX() + item.getWidth())) {
          this.width = ((item.getX() + item.getWidth()) -  this.originPoint.x);
        }
        if ((this.originPoint.y + this.height) <= (item.getY() + item.getHeight())) {
          this.height = ((item.getY() + item.getHeight()) -  this.originPoint.y);
        }
      }
    }
  }

  createCircle(render: Renderer2, cx: number, cy: number, cursor: string) {
    const circle = render.createElement('circle', SVG_LINK);
    render.setAttribute(circle, 'cx', cx.toString());
    render.setAttribute(circle, 'cy', cy.toString());
    render.setAttribute(circle, 'r', '5');
    render.setAttribute(circle, 'style', 'cursor: ' + cursor);
    this.selectContainer.push(circle);
    return circle;
  }

  deselect(render: Renderer2, svg: HTMLElement) {
    for (const child of this.selectContainer) {
      render.removeChild(svg, child);
    }
    this.selectContainer = [];
  }

  find(element: any, tab: SvgElement[]): any {
    for (const item of tab) {
      if (item.element.isSameNode(element)) {
        return item;
      }
    }
    return null;
  }

  init(): void {
    this.originPoint = new Point(0, 0);
    this.firstPoint = new Point(0, 0);
    this.width = 0;
    this.height = 0;
  }

  deleteElement(elm: SvgElement, tab: SvgElement[]) {
    const index: number = tab.indexOf(elm);
    if (index !== -1) {
        tab.splice(index, 1);
    }
  }

  selectAll(render: Renderer2, svg: any, svgElements: SvgElement[]) {
    this.initSelectedElement();
    this.deselect(render, svg);
    for (const child of svgElements) {
      this.selectedElement.push(child);
    }
    this.drawSelectItem(render, svg);
  }

  initSelectedElement() {
    this.selectedElement = [];
  }

  getSelectedElement(): SvgElement[] {
    return this.selectedElement;
  }

  getExtremum(): Point {
    return this.extremumPoint;
  }

  moveSelectedItem(render: Renderer2, point: Point): void {
    for (const child of this.selectedElement) {
      const translatePoint = new Point(point.x, point.y);
      const newTransform =  'translate(' + translatePoint.x + ',' + translatePoint.y + ') ' +  child.transform;
      render.setAttribute(child.element.parentNode, 'transform', newTransform);
      child.updateTranslate(translatePoint);
      child.setTransform(newTransform);
    }
  }

  isIncontactWithControlPoint(svg: HTMLElement): number  {
    for (let i = 1; i < this.selectContainer.length; i++) {
      const x = this.selectContainer[i].getBoundingClientRect().left - svg.getBoundingClientRect().left;
      const y = this.selectContainer[i].getBoundingClientRect().top - svg.getBoundingClientRect().top;
      const epaisseur = 10;
      if ((x - epaisseur  <= this.point.x && x + epaisseur >= this.point.x) &&
          (y - epaisseur  <= this.point.y && y + epaisseur >= this.point.y)) {
          this.firstScalePoint = new Point(this.point.x, this.point.y);
          this.firstScaleWidth = this.width;
          this.firstScaleHeight = this.height;
          this.originScalePoint = new Point(
            this.selectContainer[0].getBoundingClientRect().left - svg.getBoundingClientRect().left,
            this.selectContainer[0].getBoundingClientRect().top - svg.getBoundingClientRect().top);
          return i;
      }
    }
    return 0;
  }

  resizeSelectedItem(Currentpoint: Point, render: Renderer2, svg: HTMLElement, shiftKey: boolean, altKey: boolean): void {
    for (const child of this.selectedElement) {
      let newTransform = '';
      let point = new Point(0, 0);
      switch (this.selectedControlPoint) {

        case ControlPoint.TOPLEFT:
          point = new Point(this.firstScalePoint.x - Currentpoint.x,  this.firstScalePoint.y - Currentpoint.y);
          if (shiftKey) {
            point = this.getMinCoord(point);
          }
          newTransform = this.resizeService.resizeFromTopLeft(child, point,
            this.firstScaleWidth, this.firstScaleHeight, this.originScalePoint);
          this.applyScale(render, child, newTransform);

          if (altKey) {
            newTransform = this.resizeService.resizeFromBottomRight(child, point,
              this.firstScaleWidth, this.firstScaleHeight, this.originScalePoint);
            this.applyScale(render, child, newTransform);
          }
          break;

        case ControlPoint.TOPCENTER:
          point = new Point(this.firstScalePoint.x - Currentpoint.x, this.firstScalePoint.y - Currentpoint.y);
          newTransform = this.resizeService.resizeFromTopCenter(child, point, this.firstScaleHeight, this.originScalePoint);
          this.applyScale(render, child, newTransform);

          if (altKey) {
            newTransform = this.resizeService.resizeFromBottomCenter(child, point, this.firstScaleHeight, this.originScalePoint);
            this.applyScale(render, child, newTransform);
          }
          break;

        case ControlPoint.TOPRIGHT:
          point = new Point(Currentpoint.x - this.firstScalePoint.x,  this.firstScalePoint.y - Currentpoint.y);
          if (shiftKey) {
            point = this.getMinCoord(point);
          }

          newTransform = this.resizeService.resizeFromTopRight(child, point, this.firstScaleWidth,
            this.firstScaleHeight, this.originScalePoint);
          this.applyScale(render, child, newTransform);

          if (altKey) {
            newTransform = this.resizeService.resizeFromBottomLeft(child, point, this.firstScaleWidth,
              this.firstScaleHeight, this.originScalePoint);
            this.applyScale(render, child, newTransform);
          }
          break;

        case ControlPoint.CENTERLEFT:
          point = new Point(this.firstScalePoint.x - Currentpoint.x, this.firstScalePoint.y - Currentpoint.y);
          newTransform = this.resizeService.resizeFromCenterLeft(child, point, this.firstScaleWidth, this.originScalePoint);
          this.applyScale(render, child, newTransform);

          if (altKey) {
            newTransform = this.resizeService.resizeFromCenterRight(child, point, this.firstScaleWidth, this.originScalePoint);
            this.applyScale(render, child, newTransform);
          }
          break;

        case ControlPoint.CENTERRIGHT:
          point = new Point(Currentpoint.x - this.firstScalePoint.x, Currentpoint.y - this.firstScalePoint.y);
          newTransform = this.resizeService.resizeFromCenterRight(child, point, this.firstScaleWidth, this.originScalePoint);
          this.applyScale(render, child, newTransform);

          if (altKey) {
            newTransform = this.resizeService.resizeFromCenterLeft(child, point, this.firstScaleWidth, this.originScalePoint);
            this.applyScale(render, child, newTransform);
          }
          break;

        case ControlPoint.BOTTOMLEFT:
          point = new Point(this.firstScalePoint.x - Currentpoint.x,   Currentpoint.y - this.firstScalePoint.y);
          if (shiftKey) {
            point = this.getMinCoord(point);
          }

          newTransform = this.resizeService.resizeFromBottomLeft(child, point,
            this.firstScaleWidth, this.firstScaleHeight, this.originScalePoint);
          this.applyScale(render, child, newTransform);

          if (altKey) {
            newTransform = this.resizeService.resizeFromTopRight(child, point, this.firstScaleWidth, this.firstScaleHeight,
              this.originScalePoint);
            this.applyScale(render, child, newTransform);
          }
          break;

        case ControlPoint.BOTTOMCENTER:
          point = new Point(Currentpoint.x - this.firstScalePoint.x, Currentpoint.y - this.firstScalePoint.y);
          newTransform = this.resizeService.resizeFromBottomCenter(child, point, this.firstScaleHeight,
            this.originScalePoint);
          this.applyScale(render, child, newTransform);

          if (altKey) {
            newTransform = this.resizeService.resizeFromTopCenter(child, point, this.firstScaleHeight,
              this.originScalePoint);
            this.applyScale(render, child, newTransform);
          }
          break;

        case ControlPoint.BOTTOMRIGHT:
          point = new Point(Currentpoint.x - this.firstScalePoint.x, Currentpoint.y - this.firstScalePoint.y);
          if (shiftKey) {
            point = this.getMinCoord(point);
          }
          newTransform = this.resizeService.resizeFromBottomRight(child, point,
            this.firstScaleWidth, this.firstScaleHeight, this.originScalePoint);
          this.applyScale(render, child, newTransform);

          if (altKey) {
            newTransform = this.resizeService.resizeFromTopLeft(child, point,
              this.firstScaleWidth, this.firstScaleHeight, this.originScalePoint);
            this.applyScale(render, child, newTransform);
          }
          break;
      }
    }
    // this.point = Currentpoint;
  }

  getMinCoord(point: Point): Point {
    point.x = Math.min(point.x, point.y);
    point.y = point.x;
    return point;
  }

  applyScale(render: Renderer2, child: SvgElement, transform: string): void {
    render.setAttribute(child.element.parentNode, 'transform', transform);
    // child.setLastTransform(transform);
  }
}
