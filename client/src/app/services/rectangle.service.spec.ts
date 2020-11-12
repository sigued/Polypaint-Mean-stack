import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { RectangleService } from './rectangle.service';

describe('RectangleService', () => {
  let rectangleService: RectangleService;
  let render: Renderer2;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [RectangleService, {provide: Renderer2, useClass: RenderStub}],
    });
    rectangleService =  TestBed.get(RectangleService);
    render = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(rectangleService).toBeDefined();
  });

  it('should have as height undefined', () => {
    expect(rectangleService.height).toBeUndefined();
  });

  it('should have as width undefined', () => {
    expect(rectangleService.width).toBeUndefined();
  });

  it('should have as type undefined', () => {
    expect(rectangleService.type).toBeUndefined();
  });

  it('should have as originPoint Point(0, 0)', () => {
    expect(rectangleService.originPoint).toEqual(new Point(0, 0));
  });

  it('should have as firstPoint Point(0, 0)', () => {
    expect(rectangleService.firstPoint).toEqual(new Point(0, 0));
  });

  it('should have as thickness 1', () => {
    expect(rectangleService.thickness).toEqual(1);
  });

  it('should have as isDraggable true', () => {
    expect(rectangleService.isDraggable).toEqual(true);
  });

  it('should have as weight undefined', () => {
    expect(rectangleService.weight).toEqual('1');
  });

  it('should have createElement call render.createElement ', () => {
    const point = new Point(0, 1);
    spyOn(rectangleService, 'setFirstPoint');
    rectangleService.createElement(render, point);
    expect(rectangleService.setFirstPoint).toHaveBeenCalledWith(point);
  });

  it('should have createElement call render.setAttribute', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    rectangleService.createElement(render, point);
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should have createElement call setFirstPoint', () => {
    const point = new Point(0, 1);
    spyOn(rectangleService, 'setFirstPoint');
    rectangleService.createElement(render, point);
    expect(rectangleService.setFirstPoint).toHaveBeenCalledWith(point);
  });

  it('should have update call render.setAttribute 4 times', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    rectangleService.update(render, point, 1, true);
    expect(render.setAttribute).toHaveBeenCalledTimes(4);
  });

  it('should have update call type 1', () => {
    spyOn(render, 'setStyle');
    const point = new Point(0, 1);
    rectangleService.type = 1;
    rectangleService.update(render, point, 1, true);
    expect(render.setStyle).toHaveBeenCalledTimes(2);
  });

  it('should have update call type 2', () => {
    spyOn(render, 'setStyle');
    const point = new Point(0, 1);
    rectangleService.type = 2;
    rectangleService.update(render, point, 1, true);
    expect(render.setStyle).toHaveBeenCalledTimes(2);
  });

  it('should have update call shiftKeyPressed flase', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    rectangleService.update(render, point, 1, false);
    expect(render.setAttribute).toHaveBeenCalledTimes(4);
  });

  it('should setWeight', () => {
    rectangleService.setWeight('100');
    expect(rectangleService.weight).toEqual('100');
  });

  it('should Type', () => {
    rectangleService.setType(1);
    expect(rectangleService.type).toEqual(1);
  });

  it('should setFirstPoint', () => {
    const point = new Point(0, 1);
    rectangleService.setFirstPoint(point);
    expect(rectangleService.firstPoint).toEqual(point);
  });

  it('should getAttribute', () => {
    rectangleService.weight = '100';
    const expectValue = 'stroke-width:100;stroke:green;fill:none';
    expect(rectangleService.getAttribute('green')).toEqual(expectValue);
  });

  it('should onMouvement', () => {
    const point = new Point(0, 1);
    spyOn(rectangleService, 'updateRectAttr');
    rectangleService.onMouvement(point);
    expect(rectangleService.updateRectAttr).toHaveBeenCalledWith(point);
  });

  it('should have updateRectAttr call findUpperLeftCorner', () => {
    const point = new Point(0, 1);
    spyOn(rectangleService, 'findUpperLeftCorner');
    rectangleService.updateRectAttr(point);
    expect(rectangleService.findUpperLeftCorner).toHaveBeenCalledWith(point);
  });

  it('should have updateRectAttr call math.abs twice', () => {
    const point = new Point(0, 1);
    spyOn(Math, 'abs');
    rectangleService.updateRectAttr(point);
    expect(Math.abs).toHaveBeenCalledTimes(2);
  });

  it('should updateRectAttr ', () => {
    const point = new Point(0, 1);
    const expectedPoint = new Point(1, 0);
    spyOn(Math, 'abs').and.returnValue(5);
    spyOn(rectangleService, 'findUpperLeftCorner').and.returnValue(expectedPoint);
    rectangleService.updateRectAttr(point);
    expect(rectangleService.originPoint).toEqual(expectedPoint);
    expect(rectangleService.height).toEqual(5);
    expect(rectangleService.width).toEqual(5);
  });

  it('should findUpperLeftCorner with point.x > firstpoint.x', () => {
    const point = new Point(10, 0);
    rectangleService.firstPoint = new Point(0, 1);
    expect(rectangleService.findUpperLeftCorner(point).x).toEqual(rectangleService.firstPoint.x);
  });

  it('should findUpperLeftCorner with point.x < firstpoint.x', () => {
    const point = new Point(0, 1);
    rectangleService.firstPoint = new Point(1, 0);
    expect(rectangleService.findUpperLeftCorner(point).x).toEqual(point.x);
  });

  it('should findUpperLeftCorner with point.y > firstpoint.y', () => {
    const point = new Point(0, 10);
    rectangleService.firstPoint = new Point(1, 0);
    expect(rectangleService.findUpperLeftCorner(point).y).toEqual(rectangleService.firstPoint.y);
  });

  it('should findUpperLeftCorner with point.y < firstpoint.y', () => {
    const point = new Point(1, 0);
    rectangleService.firstPoint = new Point(0, 10);
    expect(rectangleService.findUpperLeftCorner(point).y).toEqual(point.y);
  });

  it('should findUpperLeftCorner with point = firstpoint ', () => {
    const point = new Point(1, 0);
    rectangleService.firstPoint = new Point(1, 0);
    expect(rectangleService.findUpperLeftCorner(point)).toEqual(point);
  });

  it('should finaliseAttribute', () => {
    const point = new Point(1, 0);
    spyOn(rectangleService, 'updateRectAttr');
    rectangleService.finaliseAttribute(point);
    expect(rectangleService.updateRectAttr).toHaveBeenCalledWith(point);
  });

});
