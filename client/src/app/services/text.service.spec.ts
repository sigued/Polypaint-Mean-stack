import { TestBed } from '@angular/core/testing';

import { Renderer2 } from '@angular/core';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { TextService } from './text.service';

describe('TextService', () => {
  let textService: TextService;
  let render: Renderer2;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [TextService, {provide: Renderer2, useClass: RenderStub}],
    });
    textService = TestBed.get(TextService);
    render = TestBed.get(Renderer2);
    textService.render = render;
  });

  it('should be created', () => {
    expect(textService).toBeTruthy();
  });

  it('should have attributes undefined', () => {
    expect(textService.render).toBeDefined();
    expect(textService.textElement).toBeUndefined();
    expect(textService.tspan).toBeUndefined();
    expect(textService.currentPoint).toBeUndefined();
    expect(textService.textCont).toBeUndefined();
    expect(textService.lineIncrement).toBeUndefined();
    expect(textService.fontSize).toEqual(50);
    expect(textService.fontFamily).toEqual('Sans-Serif');
    expect(textService.fontStyle).toEqual('');
    expect(textService.fontWeight).toEqual('');
    expect(textService.textAlign).toEqual('start');
    expect(textService.groupe).toBeUndefined();
    expect(textService.rectangle).toBeUndefined();
    expect(textService.rectangleHeight).toBeUndefined();
    expect(textService.rectangleWidth).toBeUndefined();
    expect(textService.svg).toBeUndefined();
    expect(textService.isEditing).toBeFalsy();
    expect(textService.leftCorner).toBeUndefined();
  });

  it('should have createElement', () => {
    spyOn(textService, 'createGroupe');
    spyOn(textService, 'setEmptyTextBox');
    const point = new Point(0, 1);
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    spyOn(textService, 'createTspan').and.returnValue(tspan);
    textService.tspan = tspan;
    textService.tspan.textContent = 'test';
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.appendChild(tspan);
    textService.textElement = textElement;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    textService.createElement(render, point, svg);
    expect(textService.createGroupe).toHaveBeenCalled();
    expect(textService.setEmptyTextBox).toHaveBeenCalled();
    expect(textService.createTspan).toHaveBeenCalled();
  });

  it('should have setEmptyTextBox', () => {
    spyOn(render, 'setAttribute');
    textService.render = render;
    const point = new Point(0, 1);
    textService.setEmptyTextBox(point);
    expect(render.setAttribute).toHaveBeenCalledTimes(3);
  });

  it('should have createTspan', () => {
    spyOn(render, 'appendChild');
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    textService.currentPoint = point;
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    spyOn(render, 'createElement').and.returnValue(tspan);
    textService.tspan = tspan;
    textService.tspan.textContent = 'test';
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.appendChild(tspan);
    textService.textElement = textElement;
    textService.createTspan(render, point.y);
    expect(render.createElement).toHaveBeenCalled();
    expect(render.appendChild).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalledTimes(2);
  });

  it('should have newLine', () => {
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    spyOn(textService, 'createTspan').and.returnValue(tspan);
    textService.currentPoint = new Point(0, 0);
    textService.newLine();
    expect(textService.createTspan).toHaveBeenCalled();
  });

  it('should have editText', () => {
    textService.render = render;
    spyOn(render, 'setAttribute');
    spyOn(textService, 'newLine');
    spyOn(textService, 'setRectangleWidth');
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    textService.tspan = tspan;
    textService.tspan.textContent = 'test';
    const event = new KeyboardEvent('Keydown', {key: 'Enter'});
    textService.editText(event);
    expect(textService.newLine).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalled();
    expect(textService.setRectangleWidth).toHaveBeenCalled();
  });

  it('should have editText', () => {
    spyOn(textService, 'delete');
    spyOn(textService, 'setRectangleWidth');
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    textService.tspan = tspan;
    textService.tspan.textContent = 'test';
    const event = new KeyboardEvent('Keydown', {key: 'Backspace'});
    textService.editText(event);
    expect(textService.delete).toHaveBeenCalled();
    expect(textService.setRectangleWidth).toHaveBeenCalled();
  });

  it('should have editText', () => {
    spyOn(textService, 'setRectangleWidth');
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    textService.tspan = tspan;
    textService.tspan.textContent = 'test';
    textService.textCont = 'test';
    const expectedValue = 'teste';
    const event = new KeyboardEvent('Keydown', {key: 'e'});
    textService.editText(event);
    expect(textService.textCont).toEqual(expectedValue);
    expect(textService.setRectangleWidth).toHaveBeenCalled();
  });

  it('should have editText', () => {
    spyOn(textService, 'setRectangleWidth');
    spyOn(textService, 'isAlphaNum').and.returnValue(false);
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    textService.tspan = tspan;
    textService.tspan.textContent = 'test';
    textService.textCont = 'test';

    const event = new KeyboardEvent('Keydown', {key: 'e'});
    textService.editText(event);
    expect(textService.textCont).toEqual('test');
    expect(textService.setRectangleWidth).toHaveBeenCalled();
  });

  it('should have setRectangleWidth', () => {
    textService.rectangleWidth = 50;
    const width = 15 ;
    spyOn(render, 'setAttribute');
    textService.setRectangleWidth(width, true);
    expect(render.setAttribute).toHaveBeenCalledTimes(0);
    expect(textService.rectangleWidth).toEqual(50);
  });

  it('should have setRectangleWidth', () => {
    textService.render = render;
    textService.rectangleWidth = 10;
    const point = new Point(0, 0);
    textService.currentPoint = point;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    textService.rectangle = rect;
    const width = 15 ;
    spyOn(render, 'setAttribute');
    spyOn(textService, 'getLeftCorner').and.returnValue(point.x);
    textService.setRectangleWidth(width, true);
    expect(render.setAttribute).toHaveBeenCalledTimes(2);
    expect(textService.rectangleWidth).toEqual(width);
    expect(textService.getLeftCorner).toHaveBeenCalled();
  });

  it('should have createTextElement call render.createElement', () => {
    spyOn(render, 'createElement');
    const point = new Point(0, 1);
    textService.createTextElement(render, point);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should have createTextElement call render.setAttribute 7 times', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    textService.createTextElement(render, point);
    expect(render.setAttribute).toHaveBeenCalledTimes(7);
  });

  it('should have createRectangleElement render functions', () => {
    spyOn(render, 'createElement');
    spyOn(render, 'setAttribute');
    spyOn(render, 'setStyle');
    const point = new Point(0, 1);
    textService.createRectangleElement(render, point);
    expect(render.createElement).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalledTimes(3);
    expect(render.setStyle).toHaveBeenCalled();
  });

  it('should have createGroupe call render methods and TextService methods', () => {
    spyOn(render, 'createElement');
    spyOn(render, 'appendChild');
    spyOn(textService, 'createRectangleElement');
    spyOn(textService, 'createTextElement');
    const point = new Point(0, 1);
    textService.createGroupe(render, point);
    expect(render.createElement).toHaveBeenCalled();
    expect(render.appendChild).toHaveBeenCalledTimes(2);
    expect(textService.createRectangleElement).toHaveBeenCalled();
    expect(textService.createTextElement).toHaveBeenCalled();
  });

  it('should have delete ', () => {
    textService.textCont = 'test';
    const expectedValue = 'tes';
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    textService.tspan = tspan;
    textService.tspan.textContent = expectedValue;
    textService.delete();
    expect(textService.textCont).toEqual(expectedValue);
    expect(textService.tspan.textContent).toEqual(textService.textCont);
  });

  it('should have delete call removeLine', () => {
    spyOn(textService, 'removeLine').and.callFake((index: number) => {
      index = 2;
      return index;
    });
    textService.textCont = 't';
    const expectedValue = '';
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    textService.tspan = tspan;
    textService.tspan.textContent = expectedValue;
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.appendChild(tspan);
    textService.textElement = textElement;
    textService.delete();
    expect(textService.removeLine).toHaveBeenCalled();
  });

  it('should have removeLine call render.removeChild 1 time when index > 0', () => {
    spyOn(render, 'removeChild');
    spyOn(render, 'appendChild');
    textService.render = render;
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    textService.tspan = tspan;
    textService.tspan.textContent = 'test';
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.appendChild(tspan);
    textService.textElement = textElement;
    const index = 1;
    textService.removeLine(index);
    expect(textService.textCont).toEqual(textService.tspan.innerHTML);
    expect(render.removeChild).toHaveBeenCalledTimes(1);
  });

  it('should have removeLine call render.removeChild 2 times when index = 0', () => {
    spyOn(render, 'removeChild');
    spyOn(render, 'appendChild');
    textService.render = render;
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    textService.tspan = tspan;
    textService.tspan.textContent = 't';
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.appendChild(tspan);
    textService.textElement = textElement;
    const index = 0;
    textService.removeLine(index);
    expect(render.removeChild).toHaveBeenCalledTimes(2);
  });

  it('should have removeLine call render.removeChild 2 times when index = 0 and text lenght > 1 ', () => {
    spyOn(render, 'removeChild');
    spyOn(render, 'appendChild');
    textService.render = render;
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    textService.tspan = tspan;
    textService.tspan.textContent = 'te';
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.appendChild(tspan);
    textService.textElement = textElement;
    const index = 0;
    textService.removeLine(index);
    expect(render.removeChild).toHaveBeenCalledTimes(1);
  });

  it('should have removeLine call render.removeChild 2 times when index != 0 and text lenght = 1 ', () => {
    spyOn(render, 'removeChild');
    spyOn(render, 'appendChild');
    textService.render = render;
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    textService.tspan = tspan;
    textService.tspan.textContent = 't';
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.appendChild(tspan);
    textService.textElement = textElement;
    const index = 1;
    textService.removeLine(index);
    expect(render.removeChild).toHaveBeenCalledTimes(1);
  });

  it('should have isAlphaNum', () => {
    expect(textService.isAlphaNum('t')).toEqual(true);
    expect(textService.isAlphaNum('ts')).toEqual(false);
    expect(textService.isAlphaNum('#')).toEqual(false);
  });

  it('should getLeftCorner', () => {
    textService.setTextAlign('middle');
    const point = new Point (10, 10);
    const width = 5;
    const expectedValue = 10;
    expect(textService.getLeftCorner(point, width)).toEqual(expectedValue);
  });

  it('should getLeftCorner', () => {
    textService.setTextAlign('end');
    const point = new Point (10, 10);
    const width = 0;
    const expectedValue = point.x - width;
    expect(textService.getLeftCorner(point, width)).toEqual(expectedValue);
  });

  it('should getLeftCorner', () => {
    textService.setTextAlign('start');
    const point = new Point (10, 10);
    const width = 5;
    const expectedValue = point.x ;
    expect(textService.getLeftCorner(point, width)).toEqual(expectedValue);
  });

  it('should setTextAlign', () => {
    const expectedValue = 'font';
    textService.setTextAlign(expectedValue);
    expect(textService.textAlign).toEqual(expectedValue);
  });

  it('should setFontFamily', () => {
    const expectedValue = 'font';
    textService.setFontFamily(expectedValue);
    expect(textService.fontFamily).toEqual(expectedValue);
  });

  it('should setFontStyle', () => {
    const expectedValue = 'font';
    textService.setFontStyle(expectedValue);
    expect(textService.fontStyle).toEqual(expectedValue);
  });

  it('should setFontWeight', () => {
    const expectedValue = 'font';
    textService.setFontWeight(expectedValue);
    expect(textService.fontWeight).toEqual(expectedValue);
  });

  it('should setFontSize', () => {
    const expectedValue = 20;
    textService.setFontSize(expectedValue);
    expect(textService.fontSize).toEqual(expectedValue);
  });
});
