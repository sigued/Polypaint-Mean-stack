import { ElementRef } from '@angular/core';
import { Point } from './point';
import { SvgElement } from './svgElement';

const originPoint = new Point(1, 2);
const firstPoint = new Point(10, 20);
const element = document.createElement('svg');
const svg: ElementRef = new ElementRef(element);

describe('SgvElement Entity', () => {
    let svgElement: SvgElement;

    beforeEach(() => { svgElement = new SvgElement(1, originPoint, firstPoint, 5, 5, svg ); });

    it('should have a height of 5', () => {
        expect(svgElement.height).toEqual(5);
    });

    it('should have a width of 5', () => {
        expect(svgElement.width).toEqual(5);
    });

    it('should have a originPoint of (1, 2)', () => {
        const expectedValue = new Point(1, 2);
        expect(svgElement.originPoint).toEqual(expectedValue);
    });

    it('should have a firstPoint of (10, 20)', () => {
        const expectedValue = new Point(10, 20);
        expect(svgElement.firstPoint).toEqual(expectedValue);
    });

    it('should have sn id of 1', () => {
        expect(svgElement.id).toEqual(1);
    });

    it('should have a lastx of 0', () => {
        expect(svgElement.lastx).toEqual(0);
    });

    it('should have a lasty of 0', () => {
        expect(svgElement.lastx).toEqual(0);
    });

    it('should setFirstPoint', () => {
        const point = new Point(0, 1);
        svgElement.setFirstPoint(point);
        expect(svgElement.firstPoint).toEqual(point);
    });

    it('should updateRectAttr lastx = actualCoord.x with active = 0', () => {
        const point = new Point(15, 15);
        svgElement.updateRectAttr(point, 0);
        expect(svgElement.lastx).toEqual(point.x);
    });

    it('should updateRectAttr lastY = actualCoord.Y with active = 0', () => {
        const point = new Point(15, 15);
        svgElement.updateRectAttr(point, 0);
        expect(svgElement.lasty).toEqual(point.y);
    });

    it('should updateRectAttr lastx = actualCoord.x with active = 1', () => {
        const point = new Point(15, 15);
        svgElement.updateRectAttr(point, 1);
        expect(svgElement.lastx).toEqual(point.x);
    });

    it('should updateRectAttr lasty = actualCoord.y with active = 1', () => {
        const point = new Point(15, 15);
        svgElement.updateRectAttr(point, 1);
        expect(svgElement.lasty).toEqual(point.y);
    });

    it('should updateRectAttr call math.abs 2 times', () => {
        spyOn(Math, 'abs');
        const point = new Point(15, 15);
        svgElement.updateRectAttr(point, 1);
        expect(Math.abs).toHaveBeenCalledTimes(2);
    });

    it('should updateRectAttr update lastx and lasty when active not 0 or 1', () => {
        const point = new Point(15, 15);
        svgElement.updateRectAttr(point, 3);
        expect(svgElement.lasty).toEqual(point.y);
        expect(svgElement.lastx).toEqual(point.x);
    });

    it('should updateRectAttr call findUpperLeftCorner()', () => {
        spyOn(svgElement, 'findUpperLeftCorner').and.callThrough();
        const point = new Point(15, 15);
        svgElement.updateRectAttr(point, 1);
        expect(svgElement.findUpperLeftCorner).toHaveBeenCalledWith(point);
    });

    it('should finaliseAttribute call updateRectAttr()', () => {
        spyOn(svgElement, 'updateRectAttr').and.callThrough();
        const point = new Point(15, 15);
        const active = 1;
        svgElement.finaliseAttribute(point, active);
        expect(svgElement.updateRectAttr).toHaveBeenCalledWith(point, active);
    });

    it('should be in range', () => {
        spyOn(svgElement, 'getX').and.returnValue(1);
        spyOn(svgElement, 'getWidth').and.returnValue(1);
        spyOn(svgElement, 'getY').and.returnValue(1);
        spyOn(svgElement, 'getHeight').and.returnValue(1);
        const point = new Point(0, 0);
        const width = 1;
        const height = 1;
        const expectedValue = svgElement.isInRange(point, width, height);
        expect(expectedValue).toEqual(true);
    });

    it('should isInRange call getX 2 times and getWidth once', () => {
        spyOn(svgElement, 'getX').and.returnValue(1);
        spyOn(svgElement, 'getWidth').and.returnValue(1);
        spyOn(svgElement, 'getY').and.returnValue(1);
        spyOn(svgElement, 'getHeight').and.returnValue(1);
        const point = new Point(0, 0);
        const width = 1;
        const height = 1;
        svgElement.isInRange(point, width, height);
        expect(svgElement.getX).toHaveBeenCalledTimes(2);
        expect(svgElement.getWidth).toHaveBeenCalled();
    });

    it('should isInRange call getY 2 times and getHeight once', () => {
        spyOn(svgElement, 'getX').and.returnValue(1);
        spyOn(svgElement, 'getWidth').and.returnValue(1);
        spyOn(svgElement, 'getY').and.returnValue(1);
        spyOn(svgElement, 'getHeight').and.returnValue(1);
        const point = new Point(0, 0);
        const width = 1;
        const height = 1;
        svgElement.isInRange(point, width, height);
        expect(svgElement.getY).toHaveBeenCalledTimes(2);
        expect(svgElement.getHeight).toHaveBeenCalled();
    });

    it('should not be in range', () => {
        spyOn(svgElement, 'getX').and.returnValue(1);
        spyOn(svgElement, 'getWidth').and.returnValue(1);
        spyOn(svgElement, 'getY').and.returnValue(1);
        spyOn(svgElement, 'getHeight').and.returnValue(1);
        const point = new Point(5, 5);
        const width = 1;
        const height = 1;
        const expectedValue = svgElement.isInRange(point, width, height);
        expect(expectedValue).toEqual(false);
    });

    it('should updateRectAttr call math.abs 2 times', () => {
        spyOn(Math, 'abs');
        const point = new Point(15, 15);
        svgElement.lastx = 25;
        svgElement.lasty = 25;
        svgElement.updateRectAttr(point, 0);
        expect(Math.abs).toHaveBeenCalledTimes(2);
    });

    it('should findUpperLeftCorner', () => {
        const point = new Point(0, 0);
        expect(svgElement.findUpperLeftCorner(point)).toEqual(point);
    });

    it('should getX', () => {
        const div = document.createElement('div');
        const mockedSVGElement = document.createElement('svg');
        const SVGElementRef = new ElementRef(mockedSVGElement);
        spyOn(div, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
        spyOn(mockedSVGElement, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
        svgElement.element = div;
        svgElement.svg = SVGElementRef;
        const expectedValue = 0;
        expect(svgElement.getX()).toEqual(expectedValue);
    });

    it('should getY', () => {
        const div = document.createElement('div');
        const mockedSVGElement = document.createElement('svg');
        const SVGElementRef = new ElementRef(mockedSVGElement);
        spyOn(div, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
        spyOn(mockedSVGElement, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
        svgElement.element = div;
        svgElement.svg = SVGElementRef;
        const expectedValue = 0;
        expect(svgElement.getY()).toEqual(expectedValue);
    });

    it('should getWidth', () => {
        const div = document.createElement('div');
        const mockedSVGElement = document.createElement('svg');
        const SVGElementRef = new ElementRef(mockedSVGElement);
        spyOn(div, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
        spyOn(mockedSVGElement, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
        svgElement.element = div;
        svgElement.svg = SVGElementRef;
        const expectedValue = 0;
        expect(svgElement.getWidth()).toEqual(expectedValue);
    });

    it('should getHeight', () => {
        const div = document.createElement('div');
        const mockedSVGElement = document.createElement('svg');
        const SVGElementRef = new ElementRef(mockedSVGElement);
        spyOn(div, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
        spyOn(mockedSVGElement, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
        svgElement.element = div;
        svgElement.svg = SVGElementRef;
        const expectedValue = 0;
        expect(svgElement.getHeight()).toEqual(expectedValue);
    });

    it('should updatetranslatePoint', () => {
        const value = new Point(5, 5);
        svgElement.updateTranslate(value);
        expect(svgElement.translatePoint).toEqual(value);
    });

  });
