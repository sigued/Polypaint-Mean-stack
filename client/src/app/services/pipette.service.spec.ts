import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { PipetteService } from './pipette.service';

describe('PipetteService', () => {
  let pipetteService: PipetteService;
  let render: Renderer2;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [PipetteService, {provide: Renderer2, useClass: RenderStub}],
    });
    pipetteService = TestBed.get(PipetteService);
    render = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(pipetteService).toBeTruthy();
  });

  it('should have canvasImg undefined', () => {
    expect(pipetteService['canvasImg']).toBeUndefined();
  });

  it('should have active undefined', () => {
    expect(pipetteService['active']).toEqual(0);
  });

  it('should have setActive', () => {
    const expectedValue = 5;
    pipetteService.setActive(expectedValue);
    expect(pipetteService['active']).toEqual(expectedValue);
  });

  it('should have setActive', () => {
    pipetteService.setActive(7);
    expect(pipetteService.isUsingPipette()).toEqual(true);
  });

  it('should have setActive', () => {
    pipetteService.setActive(5);
    expect(pipetteService.isUsingPipette()).toEqual(false);
  });

  it('should have handlePipette call render.createElement', () => {
    const canvas = document.createElement('canvas');
    spyOn(render, 'createElement').and.returnValue(canvas);
    const point = new Point(10, 10);
    const type = 0;
    const svg = new ElementRef(document.createElement('svg'));
    spyOn(svg.nativeElement, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    pipetteService['canvasImg'] = new Image();
    pipetteService.handlePipette(render, point, svg.nativeElement, type);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should have handlePipette call getBoundingClientRect 2 times', () => {
    const canvas = document.createElement('canvas');
    spyOn(render, 'createElement').and.returnValue(canvas);
    spyOn(canvas, 'getContext').and.returnValue(null);
    const point = new Point(10, 10);
    const type = 0;
    const svg = new ElementRef(document.createElement('svg'));
    spyOn(svg.nativeElement, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    pipetteService['canvasImg'] = new Image();
    pipetteService.handlePipette(render, point, svg.nativeElement, type);
    expect(svg.nativeElement.getBoundingClientRect).toHaveBeenCalledTimes(2);
  });

  it('should have handlePipette call getBoundingClientRect 4 times', () => {
    const canvas = document.createElement('canvas');
    spyOn(render, 'createElement').and.returnValue(canvas);
    const point = new Point(10, 10);
    const type = 0;
    const svg = new ElementRef(document.createElement('svg'));
    spyOn(svg.nativeElement, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    pipetteService['canvasImg'] = new Image();
    pipetteService.handlePipette(render, point, svg.nativeElement, type);
    expect(svg.nativeElement.getBoundingClientRect).toHaveBeenCalledTimes(4);
  });

  it('should have handlePipette call canvas.getContext', () => {
    const canvas = document.createElement('canvas');
    spyOn(canvas, 'getContext');
    spyOn(render, 'createElement').and.returnValue(canvas);
    const point = new Point(10, 10);
    const type = 0;
    const svg = new ElementRef(document.createElement('svg'));
    spyOn(svg.nativeElement, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    pipetteService['canvasImg'] = new Image();
    pipetteService.handlePipette(render, point, svg.nativeElement, type);
    expect(canvas.getContext).toHaveBeenCalled();
  });

  it('should have handlePipette set canvasImg.src', () => {
    const canvas = document.createElement('canvas');
    spyOn(render, 'createElement').and.returnValue(canvas);
    const point = new Point(10, 10);
    const type = 0;
    const svg = new ElementRef(document.createElement('svg'));
    spyOn(svg.nativeElement, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    pipetteService['canvasImg'] = new Image();
    const svgXml = new XMLSerializer().serializeToString(svg.nativeElement);
    const svg64 = btoa(svgXml);
    const header64 = 'data:image/svg+xml;base64,';
    const expectedValue = header64 + svg64;
    pipetteService.handlePipette(render, point, svg.nativeElement, type);
    expect(pipetteService['canvasImg'].src).toEqual(expectedValue);
  });

});
