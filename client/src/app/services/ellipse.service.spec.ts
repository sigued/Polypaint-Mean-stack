import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { EllipseService } from './ellipse.service';

describe('EllipseService', () => {
  let ellipseService: EllipseService;
  let render: Renderer2;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EllipseService, {provide: Renderer2, useClass: RenderStub}],
    });
    ellipseService = TestBed.get(EllipseService);
    render = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(ellipseService).toBeDefined();
  });

  it('should have a weight of 1', () => {
    expect(ellipseService.weight).toEqual('1');
  });

  it('should have a type undefined', () => {
    expect(ellipseService.type).toBeUndefined();
  });

  it('should have a firstPoint of (0, 0)', () => {
    const point = new Point(0, 0);
    expect(ellipseService.firstPoint).toEqual(point);
  });

  it('should have a isDraggable undefined', () => {
    expect(ellipseService.isDraggable).toBeUndefined();
  });

  it('should have a originPoint of (0, 0)', () => {
    const point = new Point(0, 0);
    expect(ellipseService.originPoint).toEqual(point);
  });

  it('should have a thickness of 1', () => {
    expect(ellipseService.thickness).toEqual(1);
  });

  it('should have a width undefined', () => {
    expect(ellipseService.width).toBeUndefined();
  });

  it('should have a height undefined', () => {
    expect(ellipseService.height).toBeUndefined();
  });

  it('should have createElement call render.createElement ', () => {
    spyOn(render, 'createElement');
    const point = new Point(0, 1);
    ellipseService.createElement(render, point);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should have createElement call render.setAttribute', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    ellipseService.createElement(render, point);
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should have createElement call setFirstPoint', () => {
    const point = new Point(0, 1);
    spyOn(ellipseService, 'setFirstPoint');
    ellipseService.createElement(render, point);
    expect(ellipseService.setFirstPoint).toHaveBeenCalledWith(point);
  });

  it('should have update call render.setAttribute 4 times', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    ellipseService.update(render, point, 1, true);
    expect(render.setAttribute).toHaveBeenCalledTimes(4);
  });

  it('should have update call render.setAttribute 4 times', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    ellipseService.update(render, point, 1, false);
    expect(render.setAttribute).toHaveBeenCalledTimes(4);
  });

  it('should have update call render.setAttribute 2 times', () => {
    spyOn(render, 'setStyle');
    ellipseService.setType(2);
    const point = new Point(0, 1);
    ellipseService.update(render, point, 1, false);
    expect(render.setStyle).toHaveBeenCalledTimes(2);
  });

  it('should have update call render.setAttribute with type = 0', () => {
    spyOn(render, 'setStyle');
    ellipseService.type = 0;
    const point = new Point(0, 1);
    ellipseService.update(render, point, 1, false);
    expect(render.setStyle).toHaveBeenCalledTimes(0);
  });

  it('should have update call render.setAttribute 2 times', () => {
    spyOn(render, 'setStyle');
    ellipseService.setType(1);
    const point = new Point(0, 1);
    ellipseService.update(render, point, 1, false);
    expect(render.setStyle).toHaveBeenCalledTimes(2);
  });

  it('should getAttribute', () => {
    ellipseService.weight = '100';
    const expectValue = 'stroke-width:100;stroke:green;fill:none';
    expect(ellipseService.getAttribute('green')).toEqual(expectValue);
  });

  it('should setFirstPoint', () => {
    const point = new Point(0, 1);
    ellipseService.setFirstPoint(point);
    expect(ellipseService.firstPoint).toEqual(point);
  });

  it('should setType', () => {
    const type = 1;
    ellipseService.setType(type);
    expect(ellipseService.type).toEqual(type);
  });

  it('should setWeight', () => {
    const weight = '5';
    ellipseService.setWeight(weight);
    expect(ellipseService.weight).toEqual(weight);
  });

  it('should finaliseAttribute', () => {
    const point = new Point(1, 0);
    spyOn(ellipseService, 'updateEllipseAttr');
    ellipseService.finaliseAttribute(point);
    expect(ellipseService.updateEllipseAttr).toHaveBeenCalledWith(point);
  });

  it('should updateEllipseAttr ', () => {
    const point = new Point(0, 1);
    const expectedPoint = new Point(1, 0);
    spyOn(Math, 'abs').and.returnValue(5);
    spyOn(ellipseService, 'findUpperLeftCorner').and.returnValue(expectedPoint);
    ellipseService.updateEllipseAttr(point);
    expect(ellipseService.originPoint).toEqual(expectedPoint);
    expect(ellipseService.height).toEqual(5);
    expect(ellipseService.width).toEqual(5);
  });

  it('should findUpperLeftCorner with point.x > firstpoint.x', () => {
    const point = new Point(10, 0);
    ellipseService.firstPoint = new Point(0, 1);
    expect(ellipseService.findUpperLeftCorner(point).x).toEqual(ellipseService.firstPoint.x);
  });

  it('should findUpperLeftCorner with point.x < firstpoint.x', () => {
    const point = new Point(0, 1);
    ellipseService.firstPoint = new Point(1, 0);
    expect(ellipseService.findUpperLeftCorner(point).x).toEqual(point.x);
  });

  it('should findUpperLeftCorner with point.y > firstpoint.y', () => {
    const point = new Point(0, 10);
    ellipseService.firstPoint = new Point(1, 0);
    expect(ellipseService.findUpperLeftCorner(point).y).toEqual(ellipseService.firstPoint.y);
  });

  it('should findUpperLeftCorner with point.y < firstpoint.y', () => {
    const point = new Point(1, 0);
    ellipseService.firstPoint = new Point(0, 10);
    expect(ellipseService.findUpperLeftCorner(point).y).toEqual(point.y);
  });

  it('should findUpperLeftCorner with point = firstpoint ', () => {
    const point = new Point(1, 0);
    ellipseService.firstPoint = new Point(1, 0);
    expect(ellipseService.findUpperLeftCorner(point)).toEqual(point);
  });

});
