
import { TestBed } from '@angular/core/testing';
import { GridService } from './grid.service';

describe('GridService', () => {
  let gridService: GridService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [GridService, ],
    });
    gridService = TestBed.get(GridService);
  });

  it('should be created', () => {
    expect(gridService).toBeDefined();
  });

  it('with attribute value of height 10 and width 10', () => {
    expect(gridService.height).toEqual(10);
    expect(gridService.width).toEqual(10);
    expect(gridService.opacity).toEqual(5);
  });

  it('when setWith is called', () => {
    const expectedWidth = 40;
    gridService.setWidth(expectedWidth);
    expect(gridService.width).toEqual(expectedWidth);
  });

  it('when setHeight is called', () => {
    const expectedHeight = 40;
    gridService.setHeight(expectedHeight);
    expect(gridService.height).toEqual(expectedHeight);
  });

  it('when setOpacity is called', () => {
    const expectedOpacity = 10;
    gridService.setOpacity(expectedOpacity);
    expect(gridService.opacity).toEqual(expectedOpacity / 100);
  });

  it('when setAttributes is called when checked is false', () => {
    gridService.checked = false;
    gridService.setAttributes();
    expect(gridService.opacity).toEqual(5 / 100);
    expect(gridService.height).toEqual(10);
    expect(gridService.width).toEqual(10);
    expect(gridService.checked).toBeTruthy();
  });

  it('when setAttributes is called when checked is true', () => {
    gridService.checked = true;
    gridService.setAttributes();
    expect(gridService.opacity).toEqual(0);
    expect(gridService.height).toEqual(0);
    expect(gridService.width).toEqual(0);
    expect(gridService.checked).toBeFalsy();
  });

  it('when decreaseWidthAndHeight is called', () => {
    gridService.decreaseWidthAndHeight();
    expect(gridService.height).toEqual(5);
    expect(gridService.width).toEqual(5);
  });

  it('when increaseWidthAndHeight is called', () => {
    gridService.increaseWidthAndHeight();
    expect(gridService.height).toEqual(15);
    expect(gridService.width).toEqual(15);
  });

  it('should return width zero when checked is false', () => {
    gridService.checked = false;
    gridService.width = 10;
    expect(gridService.returnWidth()).toEqual(0);
  });

  it('should return height zero when checked is false', () => {
    gridService.checked = false;
    gridService.height = 10;
    expect(gridService.returnHeight()).toEqual(0);
  });

  it('should return width when checked is true', () => {
    gridService.checked = true;
    gridService.width = 10;
    expect(gridService.returnWidth()).toEqual(10);
  });

  it('should return height when checked is true', () => {
    gridService.checked = true;
    gridService.height = 10;
    expect(gridService.returnHeight()).toEqual(10);
  });

});
