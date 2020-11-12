import { Injectable, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { DEFAULT_PATH_STROKEWIDTH, SVG_PATH } from 'src/app/constant';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';

@Injectable({
  providedIn: 'root',
})
export class BucketToolService {
  render: Renderer2;
  canvasElement: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  targetColor: number[];
  fillColor: number[];
  imageData: ImageData;
  svg: SVGElement;
  image: HTMLImageElement;
  leftLimit: number; rightLimit: number; downLimit: number; topLimit: number;
  borders: any[];
  path: SVGPathElement;
  center: Point;
  strokeWidth: number;
  strokeWidthSubject = new Subject<number>();

  constructor() {
    this.fillColor = [180, 90, 70, 255];
    this.borders = [];
    this.center = new Point(0, 0);
    this.strokeWidth = DEFAULT_PATH_STROKEWIDTH;
  }

  async createElement(render: Renderer2, point: Point, svg: SVGElement) {
    this.render = render;
    this.svg = svg;
    const roundPoint = new Point(Math.round(point.x), Math.round(point.y));
    this.center = point;

    this.canvasElement = this.createCanvas();
    this.ctx = this.canvasElement.getContext('2d') as CanvasRenderingContext2D;

    if (this.ctx) {
      this.encodImage();
      await this.image.decode().then(() => {
        if (this.ctx) {
          this.ctx.drawImage(this.image, 0, 0);
          this.imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
          this.targetColor = this.getPixel(roundPoint, this.imageData);
          this.floodFill(this.imageData, roundPoint, this.targetColor, this.fillColor);
        }
      })
      .catch((error) => {
        throw error;
      });
    }
    this.path = this.createPath();
    this.sortTable();
    this.setPathShape();
    this.sortByCoordinates();
  }

  stop() {
    this.borders = [];

    const g1 = this.render.createElement('g', SVG_LINK);
    g1.appendChild(this.path);

    const g2 = this.render.createElement('g', SVG_LINK);
    g2.appendChild(g1);
    return g2;
  }

  createCanvas(): HTMLCanvasElement {
    const canvasElement = this.render.createElement('canvas');
    canvasElement.width = this.svg.getBoundingClientRect().width;
    canvasElement.height = this.svg.getBoundingClientRect().height;

    return canvasElement;
  }

  createPath(): SVGPathElement {
    const path = this.render.createElement(SVG_PATH, SVG_LINK);
    this.render.setAttribute(path, 'fill', 'blue');
    this.render.setAttribute(path, 'stroke', 'red');
    this.render.setAttribute(path, 'd', '');
    this.render.setAttribute(path, 'stroke-width', this.strokeWidth.toString());

    return path;
  }

  setPathShape() {
    this.render.setAttribute(this.path, 'd', this.generatePath());
    this.render.appendChild(this.svg, this.path);
  }

  generatePath(): string {
    const lastCoord = this.borders.pop();
    let dAttribute: string = 'M ' + lastCoord.x.toString() + ' ' + lastCoord.y.toString();
    for (let i = 2; i < (this.borders.length - 1); i++) {
      const p1 = new Point(this.borders[i].x, this.borders[i].y);
      const p2 = new Point(this.borders[i + 1].x, this.borders[i + 1].y);
      const pointQ = new Point((p1.x + ((p2.x - p1.x) / 2)), (p1.y + ((p2.y - p1.y) / 2)));
      dAttribute = dAttribute + 'Q ' + Math.round(pointQ.x).toString() + ' ' + Math.round(pointQ.y).toString() + ' '
      + Math.round(p2.x).toString() + ' ' + Math.round(p2.y).toString() + ' ';
    }
    return dAttribute;
  }

  floodFill(imageData: ImageData, point: Point, targetColor: number[], fillColor: number[]) {
    this.leftLimit = -Infinity;
    this.rightLimit = Infinity;
    this.downLimit = -Infinity;
    this.topLimit = Infinity;

    const canvas: HTMLCanvasElement = this.createCanvas();
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

    const emptyImageData: ImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const seen: Set<string> = new Set<string>();
    const cart = [];
    cart.push(point);

    const currentColor = this.getPixel(point, imageData);

    if (this.colorMatch(currentColor, fillColor, point)) {
      return;
    }

    while (cart.length > 0) {
      const currentPoint: Point = cart.pop() as Point;
      this.leftLimit = Math.max(this.leftLimit, currentPoint.x);
      this.downLimit = Math.max(this.downLimit, currentPoint.y);
      this.rightLimit = Math.min(this.rightLimit, currentPoint.x);
      this.topLimit = Math.min(this.topLimit, currentPoint.y);
      this.setPixel(currentPoint, fillColor, emptyImageData);
      seen.add(currentPoint.x.toString() + '-' + currentPoint.y.toString());

      const rightPixel: Point = new Point(currentPoint.x + 1, currentPoint.y) ;
      if (this.isInRange(rightPixel) && !seen.has((rightPixel.x) + '-' + (rightPixel.y))
        && this.colorMatch(this.getPixel(rightPixel, imageData), targetColor, rightPixel)) {
        cart.push(rightPixel);
      }

      const leftPixel: Point = new Point(currentPoint.x - 1, currentPoint.y);
      if (this.isInRange(leftPixel) && !seen.has((leftPixel.x) + '-' + (leftPixel.y))
        && this.colorMatch(this.getPixel(leftPixel, imageData), targetColor, leftPixel)) {
        cart.push(leftPixel);
      }

      const topPixel: Point = new Point(currentPoint.x, currentPoint.y + 1);
      if (this.isInRange(topPixel) && !seen.has((topPixel.x) + '-' + (topPixel.y))
      && this.colorMatch(this.getPixel(topPixel, imageData), targetColor, topPixel)) {
        cart.push(topPixel);
      }

      const lowPixel: Point = new Point(currentPoint.x, currentPoint.y - 1) ;
      if (this.isInRange(lowPixel) && !seen.has((lowPixel.x) + '-' + (lowPixel.y))
        && this.colorMatch(this.getPixel(lowPixel, imageData), targetColor, lowPixel)) {
        cart.push(lowPixel);
      }
    }

  }

  isInRange(point: Point): boolean {
    return point.x >= 0 && point.x <= this.ctx.canvas.width && point.y >= 0 && point.y <= this.ctx.canvas.width;
  }

  getPixel(point: Point, imageData: ImageData) {
      const offset = (point.y * imageData.width + point.x) * 4;
      return [
        imageData.data[offset + 0],
        imageData.data[offset + 1],
        imageData.data[offset + 2],
        imageData.data[offset + 3],
      ];
  }

  setPixel(point: Point, fillColor: number[], imgData: ImageData) {
    const offset = (point.y * imgData.width + point.x) * 4;

    imgData.data[offset + 3] = fillColor[3];
    imgData.data[offset + 0] = fillColor[0];
    imgData.data[offset + 1] = fillColor[1];
    imgData.data[offset + 2] = fillColor[2];
  }

  colorMatch(firstColor: number[], secondColor: number[], point: Point) {
    if (this.sameColor(firstColor, secondColor)) {
      return true;
    }
    this.borders.push({x: point.x, y: point.y, angle: this.getAngle(point, this.center)});
    return false;
  }

  getAngle(point: Point, center: Point) {
    let angle = Math.acos((point.x - center.x) / this.lineDistance(center, point));

    return (point.y > center.y) ? angle = Math.PI + Math.PI - angle : angle;
  }

  lineDistance(point1: Point, point2: Point) {
    let xs = 0;
    let ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  }

  sameColor(firstColor: number[], secondColor: number[]): boolean {
    return firstColor[0] === secondColor[0] && firstColor[1] === secondColor[1] &&
      firstColor[2] === secondColor[2] && firstColor[3] === secondColor[3];
  }

  sortTable() {
    this.borders.sort((a, b) => {
      return a.angle - b.angle;
    });
  }

  svgToBase64(): string {
    return 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(this.svg as Node));
  }

  encodImage(): void {
    this.image = new Image();
    this.image.width = this.svg.getBoundingClientRect().width;
    this.image.height = this.svg.getBoundingClientRect().height;
    this.image.src = this.svgToBase64();
  }

  setWidth(width: number): void {
    this.strokeWidth = width;
    if (this.path !== undefined) {
      this.render.setAttribute(this.path, 'stroke-width', this.strokeWidth.toString());
    }
  }

  sortByCoordinates() {
    this.borders.splice(0, 1);
    const tab = [];
    let currentAngle = -1;
    let compteur = 0;
    for (let i = 0; i < this.borders.length - 1; i++) {
      if (this.borders[i].angle === currentAngle) {
        tab.push(this.borders[i]);
        compteur++;
      } else {
        currentAngle = this.borders[i].angle;
        if (compteur === 0) {
          tab.pop();
        }
        tab.push(this.borders[i]);
        compteur = 0;
      }
    }
  }
}
