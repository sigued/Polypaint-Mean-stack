import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { GridServiceStub } from '../stubs/gridService.stub';
import { GridService } from './grid.service';
import { MagnestismService } from './magnetism.service';

describe('MagnetismeFileService', () => {
  let magnestismService: MagnestismService;
  let gridService: GridService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MagnestismService, {provide: GridService, useClass: GridServiceStub}],
    });
    magnestismService = TestBed.get(MagnestismService);
    gridService = TestBed.get(GridService);
  });

  it('should be created', () => {
    expect(magnestismService).toBeTruthy();
  });

  it('should get the closest point y backward', () => {
    gridService.height = 5;
    gridService.width = 5;
    const point = new Point(11, 11);
    const delta = new Point(1, -1);
    expect(magnestismService.getClosestPoint(point, delta)).toEqual(new Point(15, 10));
  });

  it('should get the closest point x backward', () => {
    gridService.height = 5;
    gridService.width = 5;
    const point = new Point(11, 11);
    const delta = new Point(-1, 1);
    expect(magnestismService.getClosestPoint(point, delta)).toEqual(new Point(10, 15));
  });

  it('should get the closest point with x and y backward', () => {
    gridService.height = 5;
    gridService.width = 5;
    const point = new Point(11, 11);
    const delta = new Point(-1, -1);
    expect(magnestismService.getClosestPoint(point, delta)).toEqual(new Point(10, 10));
  });

  it('should get the closest point with x and y forward', () => {
    gridService.height = 5;
    gridService.width = 5;
    const point = new Point(11, 11);
    const delta = new Point(1, 1);
    expect(magnestismService.getClosestPoint(point, delta)).toEqual(new Point(15, 15));
  });

  it('should get the closest Point with y backward', () => {
    gridService.height = 5;
    gridService.width = 5;
    const point = new Point(11, 11);
    expect(magnestismService.getClosestPointYBackward(point)).toEqual(new Point(15, 10));
  });

  it('should get the closest Point with x backward', () => {
    gridService.height = 5;
    gridService.width = 5;
    const point = new Point(11, 11);
    expect(magnestismService.getClosestPointXBackward(point)).toEqual(new Point(10, 15));
  });

  it('should get the closest Point with x and y backward', () => {
    gridService.height = 5;
    gridService.width = 5;
    const point = new Point(11, 11);
    expect(magnestismService.getClosestPointBothBackward(point)).toEqual(new Point(10, 10));
  });

  it('should get the closest Point with x and y forward', () => {
    gridService.height = 5;
    gridService.width = 5;
    const point = new Point(11, 11);
    expect(magnestismService.getClosestPointBothForward(point)).toEqual(new Point(15, 15));
  });

  it('should get the closest forward value', () => {
    expect(magnestismService.getClosestForwardValue(10, 5)).toEqual(15);
  });

  it('should get the closest backward value', () => {
    expect(magnestismService.getClosestBackwardValue(11, 5)).toEqual(10);
  });

});
