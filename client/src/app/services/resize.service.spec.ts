import { ElementRef} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
import { ResizeService } from './resize.service';

describe('Service: Resize', () => {
  let resizeService: ResizeService;

  beforeEach( async () => {
    TestBed.configureTestingModule({
      providers: [ResizeService, ],
    });

    resizeService =  TestBed.get(ResizeService);
  });

  it('should be created', () => {
    expect(resizeService).toBeDefined();
  });

  it('when resizeFromTopLeft IsCalled', () => {
    const originPoint = new Point(0, 0);
    const point = new Point(10, 10);
    const width = 5;
    const height = 5;
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const svgElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    spyOn(svgElement, 'setLastTransform');
    resizeService.resizeFromTopLeft(svgElement, point, width, height, originPoint);
    expect(svgElement.setLastTransform).toHaveBeenCalled();
  });

  it('when resizeFromTopCenter IsCalled', () => {
    const originPoint = new Point(0, 0);
    const point = new Point(10, 10);
    const height = 5;
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const svgElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    spyOn(svgElement, 'setLastTransform');
    resizeService.resizeFromTopCenter(svgElement, point, height, originPoint);
    expect(svgElement.setLastTransform).toHaveBeenCalled();

  });

  it('when resizeFromTopRight IsCalled', () => {
    const originPoint = new Point(0, 0);
    const point = new Point(10, 10);
    const width = 5;
    const height = 5;
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const svgElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    spyOn(svgElement, 'setLastTransform');
    resizeService.resizeFromTopRight(svgElement, point, width, height, originPoint);
    expect(svgElement.setLastTransform).toHaveBeenCalled();
  });

  it('when resizeFromCenterLeft IsCalled', () => {
    const originPoint = new Point(0, 0);
    const point = new Point(10, 10);
    const width = 5;
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const svgElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    spyOn(svgElement, 'setLastTransform');
    resizeService.resizeFromCenterLeft(svgElement, point, width, originPoint);
    expect(svgElement.setLastTransform).toHaveBeenCalled();
  });

  it('when resizeFromCenterRight IsCalled', () => {
    const originPoint = new Point(0, 0);
    const point = new Point(10, 10);
    const width = 5;
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const svgElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    spyOn(svgElement, 'setLastTransform');
    resizeService.resizeFromCenterRight(svgElement, point, width, originPoint);
    expect(svgElement.setLastTransform).toHaveBeenCalled();
  });

  it('when resizeFromBottomLeft IsCalled', () => {
    const originPoint = new Point(0, 0);
    const point = new Point(10, 10);
    const width = 5;
    const height = 5;
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const svgElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    spyOn(svgElement, 'setLastTransform');
    resizeService.resizeFromBottomLeft(svgElement, point, width, height, originPoint);
    expect(svgElement.setLastTransform).toHaveBeenCalled();
  });

  it('when resizeFromBottomRight IsCalled', () => {
    const originPoint = new Point(0, 0);
    const point = new Point(10, 10);
    const width = 5;
    const height = 5;
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const svgElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    spyOn(svgElement, 'setLastTransform');
    resizeService.resizeFromBottomRight(svgElement, point, width, height, originPoint);
    expect(svgElement.setLastTransform).toHaveBeenCalled();
  });

  it('when resizeFromBottomCenter IsCalled', () => {
    const originPoint = new Point(0, 0);
    const point = new Point(10, 10);
    const height = 5;
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const svgElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    spyOn(svgElement, 'setLastTransform');
    resizeService.resizeFromBottomCenter(svgElement, point, height, originPoint);
    expect(svgElement.setLastTransform).toHaveBeenCalled();
  });
});
