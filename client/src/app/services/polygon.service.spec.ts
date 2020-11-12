import { Renderer2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { PolygonService } from './polygon.service';

describe('Service: Polygon', () => {
  let polygonService: PolygonService;
  let render: Renderer2;

  beforeEach( async () => {
    TestBed.configureTestingModule({
      providers: [PolygonService, {provide: Renderer2, useClass: RenderStub}],
    });
    polygonService =  TestBed.get(PolygonService);
    render = TestBed.get(Renderer2);
  });

  it('should ...', inject([PolygonService], (service: PolygonService) => {
    expect(service).toBeTruthy();
  }));

  it('should have set weight to 4', () => {
    polygonService.setWeight = 4;
    expect(polygonService['weight']).toEqual(4);
  });

  it('should have not set weight when it s less than 1', () => {
    polygonService.setWeight = 0;
    expect(polygonService['weight']).toEqual(1);
  });

  it('should have set nbSide to 5', () => {
    polygonService.setNbSide = 5;
    expect(polygonService['nbSide']).toEqual(5);
  });

  it('should not change the nb side (more than 12)', () => {
    polygonService.setNbSide = 22;
    expect(polygonService['nbSide']).toEqual(3);
  });

  it('should have set type to 2', () => {
    polygonService.setType = 2;
    expect(polygonService['type']).toEqual(2);
  });

  it('should not change the nb side (less than 3)', () => {
    polygonService.setNbSide = 2;
    expect(polygonService['nbSide']).toEqual(3);
  });

  it('should calculate a correct angle in radient', () => {
    expect(polygonService['findAngle'](1)).toEqual(3.665191429188092);
  });

  it('should set the origin point in 1,1 when fisrt is equal to origin', () => {
    const point = new Point(1, 1);
    const element = polygonService.createElement(render, point);
    polygonService.update(render, new Point(50, 50), element);
    expect(polygonService['originPoint']).toEqual(point);
  });
  it('should set the origin point in 1,1 when first is not origin (left)', () => {
    const element = polygonService.createElement(render, new Point(50, 1));
    polygonService.update(render, new Point(1, 50), element);
    expect(polygonService['originPoint']).toEqual(new Point(1, 1));
  });
  it('should set the origin point in 1,1 when first is not origin (down)', () => {
    const element = polygonService.createElement(render, new Point(1, 50));
    polygonService.update(render, new Point(50, 1), element);
    expect(polygonService['originPoint']).toEqual(new Point(1, 1));
  });
  it('should set the origin point in 1,1 when first is not origin (opposed)', () => {
    const element = polygonService.createElement(render, new Point(50, 50));
    polygonService.update(render, new Point(1, 1), element);
    expect(polygonService['originPoint']).toEqual(new Point(1, 1));
  });
  it('should set the first point at 50, 50', () => {
    polygonService.createElement(render, new Point(50, 50));
    expect(polygonService['firstPoint']).toEqual(new Point(50, 50));
  });

  it('should find the middle point', () => {
    polygonService['findMiddlePoint'](new Point(50, 50));
    expect(polygonService.middlePoint.x).toEqual(25);
    expect(polygonService.middlePoint.y).toEqual(25);
  });

  it('should call create element', () => {
    spyOn(polygonService, 'createElement');
    const point = new Point(0, 1);
    polygonService.createElement(render, point);
    expect(polygonService.createElement).toHaveBeenCalled();
  });

  it('should take the horizontal radius', () => {
    const element = polygonService.createElement(render, new Point(50, 10));
    polygonService.update(render, new Point(0, 0), element);
    expect(polygonService['findRadius'](new Point(0, 0))).toEqual(-25);
  });

  it('should set the style for the stroke and the fill when type is 0', () => {
      polygonService.setType = 0;
      const spy = spyOn(render, 'setStyle');
      polygonService.createElement(render, new Point(50, 50));
      expect(spy).toHaveBeenCalledTimes(3);
  });
  it('should set the style for the stroke and the fill when type is 1', () => {
    polygonService.setType = 1;
    const spy = spyOn(render, 'setStyle');
    polygonService.createElement(render, new Point(50, 50));
    expect(spy).toHaveBeenCalledTimes(3);
  });
  it('should set the style for the stroke and the fill when type is 2', () => {
    polygonService.setType = 2;
    const spy = spyOn(render, 'setStyle');
    polygonService.createElement(render, new Point(50, 50));
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should squareCoord', () => {
    polygonService.firstPoint = new Point(10, 10);
    expect(polygonService['squareCoord'](new Point(4, 8))).toEqual(new Point(4, 4));
  });

  it('should squareCoord firstpoint 4 8', () => {
    polygonService.firstPoint = new Point(4, 8);
    expect(polygonService['squareCoord'](new Point(10, 10))).toEqual(new Point(10, 14));
  });

  it('should squareCoord 8 4', () => {
    polygonService.firstPoint = new Point(10, 10);
    expect(polygonService['squareCoord'](new Point(8, 4))).toEqual(new Point(4, 4));
  });

  it('should squareCoord firstpoint 4 8', () => {
    polygonService.firstPoint = new Point(8, 4);
    expect(polygonService['squareCoord'](new Point(10, 10))).toEqual(new Point(14, 10));
  });

});
