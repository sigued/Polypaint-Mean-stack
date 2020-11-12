import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { EtampeService } from './etampe.service';

describe('EtampeService', () => {
  let etampeService: EtampeService;
  let render: Renderer2;

  beforeEach( async () => {
    TestBed.configureTestingModule({
      providers: [EtampeService, {provide: Renderer2, useClass: RenderStub}],
    });
    etampeService = TestBed.get(EtampeService);
    render = TestBed.get(Renderer2);
  });

  it('it should be created', () => {
    expect(etampeService).toBeDefined();
  });

  it('should have an echelle of 1', () => {
    expect(etampeService.echelle).toEqual(1);
  });

  it('should have a type undefined', () => {
    expect(etampeService.type).toBeUndefined();
  });

  it('should have a width of 50', () => {
    expect(etampeService.width).toEqual(50);
  });

  it('should have a height of 50', () => {
    expect(etampeService.height).toEqual(50);
  });

  it('should have a totationAngle of 0', () => {
    expect(etampeService.rotationAngle).toEqual(0);
  });

  it('should have a stampRef of 0', () => {
    expect(etampeService.stampRef).toEqual(0);
  });

  it('should have an activeStamp undefined', () => {
    expect(etampeService.activeStamp).toBeUndefined();
  });

  it('should have createElement call render.createElement', () => {
    spyOn(render, 'createElement');
    const point = new Point(0, 1);
    etampeService.createElement(render, point);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should have createElement call render.setAttribute 6 times', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    etampeService.createElement(render, point);
    expect(render.setAttribute).toHaveBeenCalledTimes(6);
  });

  it('should have createElement call render.setAttribute 5 times', () => {
    spyOn(render, 'setAttribute');
    etampeService.setStampRef(7);
    const point = new Point(0, 1);
    etampeService.createElement(render, point);
    expect(render.setAttribute).toHaveBeenCalledTimes(5);
  });

  it('should have createElement call render.setAttribute 5 times', () => {
    spyOn(render, 'setAttribute');
    etampeService.setStampRef(-1);
    const point = new Point(0, 1);
    etampeService.createElement(render, point);
    expect(render.setAttribute).toHaveBeenCalledTimes(5);
  });

  it('should have update call etampeService.createElement', () => {
    spyOn(etampeService, 'createElement');
    const point = new Point(0, 1);
    etampeService.update(render, point);
    expect(etampeService.createElement).toHaveBeenCalled();
  });

  it('should return rotate attribute', () => {
    const point = new Point (1, 1);
    etampeService.setRotationAngle(20);
    const expectedValue = 'rotate(' + etampeService.rotationAngle.toString() + ',' +
    point.x.toString() + ',' + point.y.toString()
    + ') ';
    expect(etampeService.rotate(point, etampeService.rotationAngle)).toEqual(expectedValue);
  });

  it('should setActiveStamp', () => {
    const activeStamp = 'flag';
    etampeService.setActiveStamp(activeStamp);
    expect(etampeService.activeStamp).toEqual(activeStamp);
  });

  it('should setType', () => {
    const type = 1;
    etampeService.setType(type);
    expect(etampeService.type).toEqual(type);
  });

  it('should setEchelle', () => {
    const echelle = 5;
    etampeService.setEchelle(echelle);
    expect(etampeService.echelle).toEqual(echelle);
  });

  it('should setWidth', () => {
    const width = 5;
    etampeService.setWidth(width);
    expect(etampeService.width).toEqual(width);
  });

  it('should setHeight', () => {
    const height = 5;
    etampeService.setHeight(height);
    expect(etampeService.height).toEqual(height);
  });

  it('should setRotationAngle', () => {
    const rotationAngle = 5;
    etampeService.setRotationAngle(rotationAngle);
    expect(etampeService.rotationAngle).toEqual(rotationAngle);
  });

  it('should setStampRef', () => {
    const stampRef = 5;
    etampeService.setStampRef(stampRef);
    expect(etampeService.stampRef).toEqual(stampRef);
  });

  it('should increment wheelRotation by 15 when mouseWheelRotation() is called with true', () => {
    const wheelRotationExpected = etampeService.wheelRotation - 15;
    etampeService.currentPoint = new Point(0, 0);
    const wheelEvent = new WheelEvent('wheel');
    etampeService.mouseWheelRotation(wheelEvent, render);
    expect(etampeService.wheelRotation).toEqual(wheelRotationExpected);
  });

  it('should have mouseWheelRotation call render.setAttribute ', () => {
    spyOn(render, 'setAttribute');
    etampeService.currentPoint = new Point(0, 0);
    const eventUp = document.createEvent('WheelEvent');
    spyOnProperty(eventUp, 'deltaY').and.returnValue(10);
    etampeService.mouseWheelRotation(eventUp, render);
    expect(etampeService.wheelRotation).toEqual(15);
  });

  it('should have mouseWheelRotation call render.setAttribute ', () => {
    spyOn(render, 'setAttribute');
    etampeService.currentPoint = new Point(0, 0);
    const eventUp = document.createEvent('WheelEvent');
    spyOnProperty(eventUp, 'deltaY').and.returnValue(-10);
    etampeService.mouseWheelRotation(eventUp, render);
    expect(etampeService.wheelRotation).toEqual(-15);
  });

});
