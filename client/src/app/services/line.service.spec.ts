import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { LineService } from './line.service';

describe('LineService', () => {
  let lineService: LineService;
  let render: Renderer2;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [LineService, {provide: Renderer2, useClass: RenderStub}, ],
    });
    lineService = TestBed.get(LineService);
    render = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(lineService).toBeDefined();
  });

  it('should have a styleAttribute undefined', () => {
    expect(lineService.styleAttribute).toBeUndefined();
  });

  it('should have an initialStyleAttribute initialized', () => {
    expect(lineService.initialStyleAttribute).toEqual('stroke-linejoin:miter;stroke-dasharray:0;');
  });

  it('should have a width of 1', () => {
    expect(lineService.width).toEqual('1');
  });

  it('should have a junctionDiameter of 5', () => {
    expect(lineService.junctionDiameter).toEqual('5');
  });

  it('should have a junctionType of 0', () => {
    expect(lineService.junctionType).toEqual(0);
  });

  it('should have a dashedLine of 0', () => {
    expect(lineService.dashedLine).toEqual(0);
  });

  it('should have a circleCounter of 0', () => {
    expect(lineService.circleCounter).toEqual(0);
  });

  it('should have an empty path', () => {
    expect(lineService.path).toEqual('');
  });

  it('should have an empty previousPath', () => {
    expect(lineService.previousPath).toEqual('');
  });

  it('should have an empty tempPath', () => {
    expect(lineService.path).toEqual('');
  });

  it('should have a firstPoint of (0, 0)', () => {
    const point = new Point(0, 0);
    expect(lineService.firstPoint).toEqual(point);
  });

  it('should have a keyboardEvent undefined', () => {
    expect(lineService.keyboardEvent).toBeUndefined();
  });

  it('should have an element undefined', () => {
    expect(lineService.element).toBeUndefined();
  });

  it('should have an group undefined', () => {
    expect(lineService.group).toBeUndefined();
  });

  it('should have a startDrawing undefined', () => {
    expect(lineService.startDrawing).toBeUndefined();
  });

  it('should have mouseUp call render.createElement', () => {
    const point = new Point(0, 1);
    const isDrawing = false;
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    lineService.mouseUp(render, point, isDrawing, svgElement);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should have mouseUp call lineService.createElement', () => {
    const point = new Point(0, 1);
    const isDrawing = false;
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    lineService.mouseUp(render, point, isDrawing, svgElement);
    expect(lineService.createElement).toHaveBeenCalled();
  });

  it('should have mouseUp call SVGGroupeElement.appendChild', () => {
    const point = new Point(0, 1);
    const isDrawing = false;
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    spyOn(group, 'appendChild');
    lineService.mouseUp(render, point, isDrawing, svgElement);
    expect(group.appendChild).toHaveBeenCalled();
  });

  it('should have mouseUp call SVGElement.appendChild', () => {
    const point = new Point(0, 1);
    const isDrawing = false;
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    spyOn(svgElement, 'appendChild');
    lineService.mouseUp(render, point, isDrawing, svgElement);
    expect(svgElement.appendChild).toHaveBeenCalled();
  });

  it('should have mouseUp call update', () => {
    const point = new Point(0, 1);
    const isDrawing = true;
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    spyOn(lineService, 'update');
    lineService.mouseUp(render, point, isDrawing, svgElement);
    expect(lineService.update).toHaveBeenCalled();
  });

  it('should have createElement call render.createElement', () => {
    spyOn(render, 'createElement');
    const point = new Point(1, 1);
    lineService.createElement(render, point);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should have createElement call render.setAttribute 3 times', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(1, 1);
    lineService.createElement(render, point);
    expect(render.setAttribute).toHaveBeenCalledTimes(3);
  });

  it('should have createElement call lineService.getCurrentPath', () => {
    spyOn(lineService, 'getCurrentPath');
    const point = new Point(1, 1);
    lineService.createElement(render, point);
    expect(lineService.getCurrentPath).toHaveBeenCalled();
  });

  it('should have createElement call lineService.getAttribute', () => {
    spyOn(lineService, 'getAttribute');
    const point = new Point(1, 1);
    lineService.createElement(render, point);
    expect(lineService.getAttribute).toHaveBeenCalled();
  });

  it('should have createElement call lineService.setFirstPoint', () => {
    const point = new Point(1, 1);
    spyOn(lineService, 'setFirstPoint').and.returnValue(point);
    lineService.createElement(render, point);
    expect(lineService.setFirstPoint).toHaveBeenCalled();
  });

  it('should have createElement call lineService.changeLineDashed', () => {
    spyOn(lineService, 'changeLineDashed');
    const point = new Point(1, 1);
    lineService.createElement(render, point);
    expect(lineService.changeLineDashed).toHaveBeenCalled();
  });

  it('should have update call lineService.createElement when startDrawing = true', () => {
    lineService.startDrawing = true;
    const point = new Point(10, 10);
    const nativeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    lineService.update(render, point, nativeSVG);
    expect(lineService.createElement).toHaveBeenCalled();
  });

  it('should have update call render.createElement when startDrawing = true', () => {
    lineService.startDrawing = true;
    const point = new Point(10, 10);
    const nativeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    lineService.update(render, point, nativeSVG);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should have update call SVGGroupeElement.appendChild when startDrawing = true', () => {
    lineService.startDrawing = true;
    const point = new Point(10, 10);
    const nativeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    spyOn(group, 'appendChild');
    lineService.update(render, point, nativeSVG);
    expect(group.appendChild).toHaveBeenCalled();
  });

  it('should have update call SVGElement.appendChild when startDrawing = true', () => {
    lineService.startDrawing = true;
    const point = new Point(10, 10);
    const nativeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    spyOn(nativeSVG, 'appendChild');
    lineService.update(render, point, nativeSVG);
    expect(nativeSVG.appendChild).toHaveBeenCalled();
  });

  it('should have update call render.setAttribute when startDrawing = true', () => {
    lineService.startDrawing = true;
    const point = new Point(10, 10);
    const nativeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    spyOn(render, 'setAttribute');
    lineService.update(render, point, nativeSVG);
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should have update call lineService.changeLineJunction when startDrawing = true', () => {
    lineService.startDrawing = true;
    const point = new Point(10, 10);
    const nativeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    spyOn(lineService, 'changeLineJunction');
    lineService.update(render, point, nativeSVG);
    expect(lineService.changeLineJunction).toHaveBeenCalled();
  });

  it('should have update call lineService.changeLineDashed when startDrawing = true', () => {
    lineService.startDrawing = true;
    const point = new Point(10, 10);
    const nativeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    spyOn(render, 'createElement').and.returnValue(group);
    spyOn(lineService, 'createElement').and.returnValue(polyline);
    spyOn(lineService, 'changeLineDashed');
    lineService.update(render, point, nativeSVG);
    expect(lineService.changeLineDashed).toHaveBeenCalled();
  });

  it('should have update call render.setAttribute when startDrawing = false', () => {
    lineService.startDrawing = false;
    const point = new Point(10, 10);
    const nativeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    spyOn(render, 'setAttribute');
    lineService.update(render, point, nativeSVG);
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should have update call lineService.changeLineJunction when startDrawing = false', () => {
    lineService.startDrawing = false;
    const point = new Point(10, 10);
    const nativeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    spyOn(lineService, 'changeLineJunction');
    lineService.update(render, point, nativeSVG);
    expect(lineService.changeLineJunction).toHaveBeenCalled();
  });

  it('should have update call lineService.changeLineDashed when startDrawing = false', () => {
    lineService.startDrawing = false;
    const point = new Point(10, 10);
    const nativeSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    spyOn(lineService, 'changeLineDashed');
    lineService.update(render, point, nativeSVG);
    expect(lineService.changeLineDashed).toHaveBeenCalled();
  });

  it('should have showPotentialLine call render.setAttribute', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    lineService.showPotentialLine(render, point);
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should getAttribute return attribute', () => {
    const expectValue = lineService.initialStyleAttribute
    + 'stroke-width:' + lineService.width + ';stroke:' + 'green' + ';fill:none' + ';';
    expect(lineService.getAttribute('green')).toEqual(expectValue);
  });

  it('should getCurrentPath', () => {
    const point = new Point(0, 1);
    const expectedPath = ' ' + point.x + ',' + point.y;
    expect(lineService.getCurrentPath(point)).toEqual(expectedPath);
  });

  it('should have changeLineJunction call render.setStyle ', () => {
    const point = new Point(0, 1);
    lineService.junctionType = 0;
    spyOn(render, 'setStyle');
    lineService.changeLineJunction(render, point);
    expect(render.setStyle).toHaveBeenCalled();
  });

  it('should have changeLineJunction call render.setStyle ', () => {
    const point = new Point(0, 1);
    lineService.junctionType = 1;
    spyOn(render, 'setStyle');
    lineService.changeLineJunction(render, point);
    expect(render.setStyle).toHaveBeenCalled();
  });

  it('should have changeLineJunction call 2 functions ', () => {
    lineService.junctionType = 2;
    lineService.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const junctionCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    spyOn(lineService, 'createCircle').and.returnValue(junctionCircle);
    spyOn(render, 'appendChild');
    const point = new Point(0, 1);
    lineService.changeLineJunction(render, point);
    expect(lineService.createCircle).toHaveBeenCalled();
    expect(render.appendChild).toHaveBeenCalled();
  });

  it('should have createCircle call 2 functions', () => {
    const cx = 5;
    const cy = 5;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    spyOn(render, 'createElement').and.returnValue(circle);
    spyOn(render, 'setAttribute');
    lineService.createCircle(render, cx, cy);
    expect(render.createElement).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalledTimes(4);
  });

  it('should have changeLineDashed call render.setStyle ', () => {
    lineService.dashedLine = 0;
    spyOn(render, 'setStyle');
    lineService.changeLineDashed(render);
    expect(render.setStyle).toHaveBeenCalled();
  });

  it('should have changeLineDashed call render.setStyle ', () => {
    lineService.dashedLine = 1;
    spyOn(render, 'setStyle');
    lineService.changeLineDashed(render);
    expect(render.setStyle).toHaveBeenCalled();
  });

  it('should have backspaceClicked call render.setAttribute ', () => {
    spyOn(render, 'setAttribute');
    lineService.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    lineService.backspaceClicked(render);
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should have backspaceClicked call render.setAttribute ', () => {
    spyOn(render, 'setAttribute');
    lineService.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    lineService.backspaceClicked(render);
    lineService.circleCounter = 0;
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should have backspaceClicked call SVGGroupElement.removeChild ', () => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    group.appendChild(svg);
    lineService.group = group;
    lineService.circleCounter = 5;
    spyOn(lineService.group, 'removeChild');
    lineService.backspaceClicked(render);
    expect(lineService.group.removeChild).toHaveBeenCalled();
  });

  it('should have escapeClicked callSVGGroupElement.removeChild when lineService.circleCounter > 0 ', () => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    group.appendChild(svg);
    lineService.group = group;
    lineService.circleCounter = 1;
    spyOn(lineService.group, 'removeChild');
    lineService.escapeClicked();
    expect(lineService.group.removeChild).toHaveBeenCalled();
  });

  it('should have escapeClicked callSVGGroupElement.removeChild when lineService.circleCounter = 0 ', () => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    group.appendChild(svg);
    lineService.group = group;
    lineService.circleCounter = 0;
    spyOn(lineService.group, 'removeChild');
    lineService.escapeClicked();
    expect(lineService.group.removeChild).not.toHaveBeenCalled();
  });

  it('should have escapeClicked not call SVGGroupElement.removeChild when lineService.circleCounter < 0 ', () => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    group.appendChild(svg);
    lineService.group = group;
    lineService.circleCounter = -1;
    spyOn(lineService.group, 'removeChild');
    lineService.escapeClicked();
    expect(lineService.group.removeChild).not.toHaveBeenCalled();
  });

  it('should have escapeClicked not call SVGGroupElement.removeChild when lineService.group.firstElementChild = false ', () => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    lineService.group = group;
    lineService.circleCounter = 1;
    spyOn(lineService.group, 'removeChild');
    lineService.escapeClicked();
    expect(lineService.group.removeChild).not.toHaveBeenCalled();
  });

  it('should setFirstPoint', () => {
    const expectedPoint = new Point(0, 1);
    expect(lineService.setFirstPoint(expectedPoint)).toEqual(expectedPoint);
  });

  it('should setJunctionDiametre', () => {
    const expectedDiametre = '50';
    lineService.setJunctionDiametre(expectedDiametre);
    expect(lineService.junctionDiameter).toEqual(expectedDiametre);
  });

  it('should setWidth', () => {
    const expectedWidth = '50';
    lineService.setWidth(expectedWidth);
    expect(lineService.width).toEqual(expectedWidth);
  });

  it('should setDashed', () => {
    const expectedDashed = 50;
    lineService.setDashed(expectedDashed);
    expect(lineService.dashedLine).toEqual(expectedDashed);
  });

  it('should setJunctionType', () => {
    const expectedJuntion = 50;
    lineService.setJunctionType(expectedJuntion);
    expect(lineService.junctionType).toEqual(expectedJuntion);
  });

  it('should have stop call render.setAttribute', () => {
    spyOn(render, 'setAttribute');
    const point = new Point (10 , 10);
    const shiftKeyPressed = true;
    lineService.stop(render, point, shiftKeyPressed);
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should have stop increment lineService.path from lineService.firstPoint when shiftKeyPressed', () => {
    const point = new Point (10 , 10) ;
    const linePath = lineService.path;
    const expectedPath = linePath + ' ' + point.x + ',' + point.y
    + ' ' + lineService.firstPoint.x + ',' + lineService.firstPoint.y;
    const shiftKeyPressed = true;
    lineService.stop(render, point, shiftKeyPressed);
    expect(lineService.path).toEqual(expectedPath);
  });

  it('should have stop increment lineService.path when shiftKeyPressed = false', () => {
    const point = new Point (10 , 10);
    const linePath = lineService.path;
    const expectedPath = linePath + ' ' + point.x + ',' + point.y;
    const shiftKeyPressed = false;
    lineService.stop(render, point, shiftKeyPressed);
    expect(lineService.path).toEqual(expectedPath);
  });
});
