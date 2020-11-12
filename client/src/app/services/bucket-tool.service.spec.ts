import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_PATH_STROKEWIDTH } from '../constant';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { BucketToolService } from './bucket-tool.service';

describe('BucketToolService', () => {
  let bucketService: BucketToolService;
  let render: Renderer2;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketToolService, {provide: Renderer2, useClass: RenderStub}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    bucketService = TestBed.get(BucketToolService);
    render = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(bucketService).toBeDefined();
  });

  it('attributes should equal to', () => {
    expect(bucketService.fillColor[0]).toEqual(180);
    expect(bucketService.fillColor[1]).toEqual(90);
    expect(bucketService.fillColor[2]).toEqual(70);
    expect(bucketService.fillColor[3]).toEqual(255);
    expect(bucketService.borders).toBeDefined();
    expect(bucketService.center).toEqual(new Point(0, 0));
    expect(bucketService.strokeWidth).toEqual(DEFAULT_PATH_STROKEWIDTH);
  });

  it('when stop is called', () => {
    bucketService.render = render;
    const g = document.createElement('g');
    spyOn(render, 'createElement').and.returnValue(g);
    spyOn(g, 'appendChild');
    bucketService.stop();
    expect(bucketService.borders).toBeDefined();
    expect(render.createElement).toHaveBeenCalledTimes(2);
    expect(g.appendChild).toHaveBeenCalledTimes(2);
  });

  it('should have svgToBase64', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    bucketService.svg = svg;
    const expectedValue = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svg as Node));
    expect(bucketService.svgToBase64()).toEqual(expectedValue);
  });

  it('should have createCanvas', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    bucketService.svg = svg;
    bucketService.render = render;
    const canvas = document.createElement('canvas');
    spyOn(render, 'createElement').and.returnValue(canvas);
    spyOn(svg, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    bucketService.createCanvas();
    expect(render.createElement).toHaveBeenCalled();
    expect(svg.getBoundingClientRect).toHaveBeenCalledTimes(2);
  });

  it('should have createPath', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bucketService.render = render;
    spyOn(render, 'createElement').and.returnValue(svg);
    spyOn(render, 'setAttribute');
    bucketService.createPath();
    expect(render.createElement).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalledTimes(4);
  });

  it('should have setPathShape', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bucketService.path = svg;
    bucketService.render = render;
    spyOn(render, 'appendChild');
    spyOn(bucketService, 'generatePath');
    spyOn(render, 'setAttribute');
    bucketService.setPathShape();
    expect(render.appendChild).toHaveBeenCalled();
    expect(bucketService.generatePath).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should have encodImage', () => {
    const image = document.createElement('img');
    const imageRef = new ElementRef(image);
    bucketService.image = imageRef.nativeElement;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    bucketService.svg = svg;
    spyOn(svg, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    spyOn(bucketService, 'svgToBase64');
    bucketService.encodImage();
    expect(svg.getBoundingClientRect).toHaveBeenCalledTimes(2);
  });

  it('when setStrokeWidth i scalled', () => {
    spyOn(render, 'setAttribute');
    bucketService.render = render;
    const width = 5;
    bucketService.setWidth(width);
    expect(bucketService.strokeWidth).toEqual(width);
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('when sortTable is called', () => {
    spyOn(bucketService.borders, 'sort');
    bucketService.sortTable();
    expect(bucketService.borders.sort).toHaveBeenCalled();
  });

  it('when sameColor is called and is False', () => {
    const firstColor: number[] = [1, 1, 1, 1];
    const secondColor: number[] = [2, 1, 1, 1];
    bucketService.sameColor(firstColor, secondColor);
    expect(bucketService.sameColor).toBeFalsy();
  });

  it('when sameColor is called and is true', () => {
    const firstColor: number[] = [1, 1, 1, 1];
    const secondColor: number[] = [1, 1, 1, 1];
    bucketService.sameColor(firstColor, secondColor);
    expect(bucketService.sameColor).toBeTruthy();
  });

  it('when getAngle is called', () => {
    spyOn(bucketService, 'lineDistance');
    const point = new Point(10, 10);
    const center = new Point(0, 0);
    bucketService.getAngle(point, center);
    expect(bucketService.lineDistance).toHaveBeenCalled();
  });

  it('when getAngle is called', () => {
    spyOn(bucketService, 'lineDistance');
    const point = new Point(1, 1);
    const center = new Point(5, 5);
    bucketService.getAngle(point, center);
    expect(bucketService.lineDistance).toHaveBeenCalled();
  });

  it('when LineDistance is called', () => {
    spyOn(Math, 'sqrt');
    const point = new Point(1, 1);
    const center = new Point(5, 5);
    bucketService.lineDistance(point, center);
    expect(Math.sqrt).toHaveBeenCalled();
  });

  it('when colorMacth is called true', () => {
    spyOn(bucketService, 'sameColor');
    const firstColor: number[] = [1, 1, 1, 1];
    const secondColor: number[] = [1, 1, 1, 1];
    const point = new Point(1, 1);
    bucketService.colorMatch(firstColor, secondColor, point);
    expect(bucketService.sameColor).toHaveBeenCalled();
    expect(bucketService.colorMatch).toBeTruthy();
  });

  it('when colorMatch is called false', () => {
    spyOn(bucketService, 'getAngle');
    spyOn(bucketService.borders, 'push');
    const firstColor: number[] = [1, 1, 1, 1];
    const secondColor: number[] = [2, 2, 2, 2];
    const point = new Point(1, 1);
    bucketService.colorMatch(firstColor, secondColor, point);
    expect(bucketService.getAngle).toHaveBeenCalled();
    expect(bucketService.colorMatch).toBeFalsy();
  });

  it('when isInRange is called false', () => {
    const canvas = document.createElement('canvas');
    // const ctx = canvas.getContext('2d');
    bucketService.ctx.canvas.width = canvas.width;
    bucketService.ctx.canvas.height = canvas.height;
    const point = new Point(1, 1);
    bucketService.isInRange(point);
    expect(bucketService.isInRange).toBeFalsy();
  });

  xit('when isInRange is called true', () => {
    const canvas = document.createElement('canvas');
    bucketService.ctx.canvas.width = canvas.width;
    bucketService.ctx.canvas.height = canvas.height;
    const point = new Point(1, 1);
    bucketService.isInRange(point);
    expect(bucketService.isInRange).toBeTruthy();
  });

  it('when getPixel is called', () => {
    const imageData = new ImageData(2, 2);
    const point = new Point(0, 0);
    bucketService.getPixel(point, imageData);
    expect(imageData.data).toBeDefined();
  });

  it('when setPixel is called', () => {
    const imageData = new ImageData(2, 2);
    const firstColor: number[] = [1, 1, 1, 1];
    const point = new Point(0, 0);
    bucketService.setPixel(point, firstColor, imageData);
    expect(imageData.data).toBeDefined();
  });

  it('when generatePath is called', () => {
    spyOn(bucketService.borders, 'pop');
    spyOn(Math, 'round');
    bucketService.generatePath();
    expect(bucketService.borders.length).toEqual(bucketService.borders.length - 1);
    expect(bucketService.borders.pop).toHaveBeenCalled();
    expect(Math.round).toHaveBeenCalledTimes(4);
  });

  it('when floodFill is called', () => {
    spyOn(bucketService, 'createCanvas');
    spyOn(bucketService, 'getPixel');
    spyOn(bucketService, 'setPixel');
    spyOn(Math, 'min');
    spyOn(Math, 'max');
    const canvas = document.createElement('canvas');
    const ctx  = canvas.getContext('2d') as CanvasRenderingContext2D;
    spyOn(ctx, 'getImageData').and.callFake((x: number, y: number, w: number, h: number) => {
      const array = new Uint8ClampedArray(4);
      array[0] = 128;
      array[1] = 0;
      return new ImageData(array, 1, 1);
    });
    const imageData = new ImageData(2, 2);
    const targetColor: number[] = [1, 1, 1, 1];
    const fillColor: number[] = [5, 5, 5, 5];
    const point = new Point(0, 0);
    bucketService.floodFill(imageData, point, targetColor, fillColor);
    expect(bucketService.leftLimit).toEqual(-Infinity);
    expect(bucketService.rightLimit).toEqual(Infinity);
    expect(bucketService.downLimit).toEqual(-Infinity);
    expect(bucketService.topLimit).toEqual(Infinity);
    expect(bucketService.borders.length).toEqual(bucketService.borders.length - 1);
    expect(bucketService.borders.pop).toHaveBeenCalled();
    expect(bucketService.getPixel).toHaveBeenCalled();
    expect(bucketService.createCanvas).toHaveBeenCalled();
    expect(bucketService.setPixel).toHaveBeenCalled();
    expect(Math.min).toHaveBeenCalledTimes(2);
    expect(Math.max).toHaveBeenCalledTimes(2);
    // expect(ctx.getImageData).toHaveBeenCalled();
  });

});
