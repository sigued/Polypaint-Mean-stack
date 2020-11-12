import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { PenService } from './pen.service';

describe('PenService', () => {
  let penService: PenService;
  let render: Renderer2;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [PenService, { provide: Renderer2, useClass: RenderStub }],
    });
    penService = TestBed.get(PenService);
    render = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(penService).toBeDefined();
  });

  it('should have as minWidth 1', () => {
    expect(penService.minWidth).toEqual(1);
  });

  it('should have as maxWidth 10', () => {
    expect(penService.maxWidth).toEqual(10);
  });

  it('should have as styleAttribute none', () => {
    expect(penService.styleAttribute).toBeUndefined();
  });

  it('should have as speed 1', () => {
    expect(penService.speed).toEqual(1);
  });

  it('should have a previousPoint of (0, 0)', () => {
    const point = new Point(0, 0);
    expect(penService.previousPoint).toEqual(point);
  });

  it('should have createElement call 5 functions', () => {
    const point = new Point(0, 1);
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const groupeElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    penService.element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    spyOn(render, 'createElement').and.returnValue(groupeElement);
    spyOn(penService, 'createNewLine').and.returnValue(svgElement);
    spyOn(groupeElement, 'appendChild');
    spyOn(svgElement, 'appendChild');
    penService.createElement(render, point, svgElement);
    expect(render.createElement).toHaveBeenCalled();
    expect(penService.createNewLine).toHaveBeenCalled();
    expect(groupeElement.appendChild).toHaveBeenCalled();
    expect(svgElement.appendChild).toHaveBeenCalled();
  });

  it('should have update call penService.updateSpeed', () => {
    const point = new Point(0, 1);
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const groupeElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    groupeElement.appendChild(svgElement);
    penService.element = svgElement;
    spyOn(penService, 'updateSpeed');
    penService.update(render, point);
    expect(penService.updateSpeed).toHaveBeenCalled();
  });

  it('should have update call penService.createNewLine', () => {
    const point = new Point(0, 1);
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const groupeElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    groupeElement.appendChild(svgElement);
    penService.element = svgElement;
    const newLineSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    spyOn(penService, 'createNewLine').and.returnValue(newLineSVG);
    penService.update(render, point);
    expect(penService.createNewLine).toHaveBeenCalled();
  });

  it('should have update call render.appendChild', () => {
    const point = new Point(0, 1);
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const groupeElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    groupeElement.appendChild(svgElement);
    penService.element = svgElement;
    spyOn(render, 'appendChild');
    penService.update(render, point);
    expect(render.appendChild).toHaveBeenCalled();
  });

  it('should have stop', () => {
    const expectedPoint = new Point(0, 0);
    penService.stop();
    expect(penService.previousPoint).toEqual(expectedPoint);
  });

  it('should have getAttribute', () => {
    const primaryColor = 'blue';
    const secondColor = 'red';
    const expectedAttributes = 'stroke-linecap:round;'
    + 'stroke-width:' + penService.maxWidth.toString()
    + ';stroke:' + primaryColor
    + ';fill:' + secondColor
    + ';';
    const attributes = penService.getAttribute(primaryColor, secondColor);
    expect(attributes).toEqual(expectedAttributes);
  });

  it('should have updateSpeed call Math methods when point.x and point.y > 0', (done) => {
    const point = new Point(10, 10);
    const previousPoint = new Point(5, 5);
    penService.previousPoint = previousPoint;
    spyOn(Math, 'abs').and.returnValue(1);
    spyOn(Math, 'sqrt').and.returnValue(1);
    spyOn(Math, 'ceil').and.returnValue(10);
    spyOn(window, 'clearTimeout');
    penService.updateSpeed(point);

    setTimeout( () => {
      expect(Math.abs).toHaveBeenCalledTimes(2);
      expect(Math.sqrt).toHaveBeenCalled();
      expect(Math.ceil).toHaveBeenCalled();
      expect(window.clearTimeout).toHaveBeenCalled();
      done();
    }, 5);
  });

  it('should have updateSpeed call Math methods when point.x and point.y = 0', (done) => {
    const point = new Point(10, 10);
    const previousPoint = new Point(0, 0);
    penService.previousPoint = previousPoint;
    spyOn(Math, 'abs').and.returnValue(1);
    spyOn(Math, 'sqrt').and.returnValue(1);
    spyOn(Math, 'ceil').and.returnValue(10);
    spyOn(window, 'clearTimeout');
    penService.updateSpeed(point);

    setTimeout( () => {
      expect(Math.abs).not.toHaveBeenCalledTimes(2);
      expect(Math.sqrt).not.toHaveBeenCalled();
      expect(Math.ceil).not.toHaveBeenCalled();
      expect(window.clearTimeout).toHaveBeenCalled();
      done();
    }, 5);
  });

  it('should have updateSpeed call Math methods when point.x > 0 and point.y = 0', (done) => {
    const point = new Point(10, 10);
    const previousPoint = new Point(1, 0);
    penService.previousPoint = previousPoint;
    spyOn(Math, 'abs').and.returnValue(1);
    spyOn(Math, 'sqrt').and.returnValue(1);
    spyOn(Math, 'ceil').and.returnValue(10);
    spyOn(window, 'clearTimeout');
    penService.updateSpeed(point);

    setTimeout( () => {
      expect(Math.abs).not.toHaveBeenCalledTimes(2);
      expect(Math.sqrt).not.toHaveBeenCalled();
      expect(Math.ceil).not.toHaveBeenCalled();
      expect(window.clearTimeout).toHaveBeenCalled();
      done();
    }, 5);
  });

  it('should have updateSpeed call Math methods when point.x = 0 and point.y > 0', (done) => {
    const point = new Point(10, 10);
    const previousPoint = new Point(0, 1);
    penService.previousPoint = previousPoint;
    spyOn(Math, 'abs').and.returnValue(1);
    spyOn(Math, 'sqrt').and.returnValue(1);
    spyOn(Math, 'ceil').and.returnValue(10);
    spyOn(window, 'clearTimeout');
    penService.updateSpeed(point);

    setTimeout( () => {
      expect(Math.abs).not.toHaveBeenCalledTimes(2);
      expect(Math.sqrt).not.toHaveBeenCalled();
      expect(Math.ceil).not.toHaveBeenCalled();
      expect(window.clearTimeout).toHaveBeenCalled();
      done();
    }, 5);
  });

  it('should have updateSpeed call Math methods when point.x < 0 and point.y < 0', (done) => {
    const point = new Point(10, 10);
    const previousPoint = new Point(-1, -1);
    penService.previousPoint = previousPoint;
    spyOn(Math, 'abs').and.returnValue(1);
    spyOn(Math, 'sqrt').and.returnValue(1);
    spyOn(Math, 'ceil').and.returnValue(10);
    spyOn(window, 'clearTimeout');
    penService.updateSpeed(point);

    setTimeout( () => {
      expect(Math.abs).not.toHaveBeenCalledTimes(2);
      expect(Math.sqrt).not.toHaveBeenCalled();
      expect(Math.ceil).not.toHaveBeenCalled();
      expect(window.clearTimeout).toHaveBeenCalled();
      done();
    }, 5);
  });

  it('should have updateSpeed set speed', () => {
    const point = new Point(10, 10);
    const previousPoint = new Point(0, 1);
    penService.previousPoint = previousPoint;
    spyOn(Math, 'abs').and.returnValue(1);
    spyOn(Math, 'sqrt').and.returnValue(1);
    spyOn(Math, 'ceil').and.returnValue(10);
    const expectedSpeed = 2;
    penService.speed = expectedSpeed;
    penService.updateSpeed(point);
    expect(penService.speed).toEqual(expectedSpeed);
  });

  it('should have updateSpeed set speed', () => {
    const point = new Point(10, 10);
    const previousPoint = new Point(0, 1);
    penService.previousPoint = previousPoint;
    spyOn(Math, 'abs').and.returnValue(1);
    spyOn(Math, 'sqrt').and.returnValue(1);
    spyOn(Math, 'ceil').and.returnValue(10);
    const expectedSpeed = 100;
    penService.speed = 200;
    penService.updateSpeed(point);
    expect(penService.speed).toEqual(expectedSpeed);
  });

  it('should have updateSpeed set speed', () => {
    const point = new Point(10, 10);
    const previousPoint = new Point(0, 1);
    penService.previousPoint = previousPoint;
    spyOn(Math, 'abs').and.returnValue(1);
    spyOn(Math, 'sqrt').and.returnValue(1);
    spyOn(Math, 'ceil').and.returnValue(10);
    const expectedSpeed = 1;
    penService.speed = 0;
    penService.updateSpeed(point);
    expect(penService.speed).toEqual(expectedSpeed);
  });

  it('should have updateWidth', () => {
    const mouseSpeedParam = 5;
    const minWidthParam = 5;
    const maxWidthParam = 5;

    const interval = maxWidthParam - minWidthParam;
    let factor = 1;

    factor = 101 - mouseSpeedParam;
    factor /= 100;

    const widthAdjustment = Math.floor(interval * factor);
    const expectedNewWidth = minWidthParam + widthAdjustment;
    const returnedValue = penService.updateWidth(mouseSpeedParam, minWidthParam, maxWidthParam);
    expect(returnedValue).toEqual(expectedNewWidth.toString());
  });

  it('should have createNewLine call render.createElement', () => {
    spyOn(render, 'createElement');
    const point = new Point(0, 0);
    penService.createNewLine(render, point);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should have createNewLine call render.setStyle', () => {
    spyOn(render, 'setStyle');
    const point = new Point(0, 0);
    penService.createNewLine(render, point);
    expect(render.setStyle).toHaveBeenCalled();
  });

  it('should have createNewLine call render.setAttribute 5 times when previousPoint.x = 0 and previousPoint.y = 0', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 0);
    penService.previousPoint = new Point(0, 0);
    penService.createNewLine(render, point);
    expect(render.setAttribute).toHaveBeenCalledTimes(5);
  });

  it('should have createNewLine call render.setAttribute 5 times when previousPoint.x != 0 and previousPoint.y != 0', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 0);
    penService.previousPoint = new Point(1, 1);
    penService.createNewLine(render, point);
    expect(render.setAttribute).toHaveBeenCalledTimes(5);
  });

  it('should have createNewLine call render.setAttribute 5 times when previousPoint.x != 0 and previousPoint.y = 0', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 0);
    penService.previousPoint = new Point(1, 0);
    penService.createNewLine(render, point);
    expect(render.setAttribute).toHaveBeenCalledTimes(5);
  });

  it('should have createNewLine call render.setAttribute 5 times when previousPoint.x = 0 and previousPoint.y != 0', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 0);
    penService.previousPoint = new Point(0, 1);
    penService.createNewLine(render, point);
    expect(render.setAttribute).toHaveBeenCalledTimes(5);
  });

  it('should have setMaxWidth', () => {
    const expectedValue = 5;
    penService.setMaxWidth(expectedValue);
    expect(penService.maxWidth).toEqual(expectedValue);
  });

  it('should have setMinWidth', () => {
    const expectedValue = 5;
    penService.setMinWidth(expectedValue);
    expect(penService.minWidth).toEqual(expectedValue);
  });
});
