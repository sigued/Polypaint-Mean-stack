import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { EraserService } from './eraser.service';

const SVG_LINK = 'http://www.w3.org/2000/svg';
const BAD_ATT = 'bad attribute';

describe('EraserService without svg setting', () => {
  let service: EraserService;
  let render: Renderer2;
  let svg: ElementRef;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [EraserService,
        {provide: Renderer2, useClass: RenderStub}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service =  TestBed.get(EraserService);
    render = TestBed.get(Renderer2);
    const svgHTML = document.createElement('svg');
    svgHTML.setAttribute('xmlns', SVG_LINK);
    svgHTML.setAttribute('x', '10');
    svgHTML.setAttribute('y', '10');
    svgHTML.setAttribute('width', '50');
    svgHTML.setAttribute('height', '50');
    svg = new ElementRef(svgHTML);
    service.setSvg = svg;
    service.setWidth = 3;
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should set the svg', () => {
    const element = document.createElement('svg');
    const svgTest: ElementRef = new ElementRef(element);
    service.setSvg = svgTest;
    expect(service['svg']).toEqual(svgTest.nativeElement);
  });

  it('should set the width', () => {
    service.setWidth = 4;
    expect(service['width']).toEqual(4);
  });

  it('should create the element and initialise the delete table', () => {
    service.createElement(render, new Point(0, 0));
    expect(service['deleteTable']).toEqual([]);
  });

  it('shoud spy on update attribute on create', () => {
    const spy = spyOn<any>(render, 'setAttribute');
    service.createElement(render, new Point(0, 0));
    expect(spy).toHaveBeenCalledTimes(5);
  });

  it('should spy on setAttribute on createElement', () => {
    const spy = spyOn<any>(render, 'setAttribute');
    service.createElement(render, new Point(0, 0));
    service.update(render, new Point(0, 0), false);
    expect(spy).toHaveBeenCalledTimes(9);
  });

  it('should call create element', () => {
    spyOn(service, 'createElement');
    const point = new Point(0, 1);
    service.createElement(render, point);
    expect(service.createElement).toHaveBeenCalled();
  });

  it('should give the origin point', () => {
    expect(service['findOriginPoint'](new Point(2, 2))).toEqual(new Point(1, 1));
  });

  it('should set the memMarkTable & markTable at []', () => {
    service['fillMarkTables']();
    expect(service['markTable'].length).toEqual(2);
    expect(service['memMarkTable']).toEqual([]);
  });

  it('should be an g element', () => {
    const element = document.createElementNS(SVG_LINK, 'g');
    const elementRect = document.createElementNS(SVG_LINK, 'rect');
    expect(service['isGElement'](element)).toEqual(true);
    expect(service['isGElement'](elementRect)).toEqual(false);
  });

  it('should be an g element empty', () => {
    const element = document.createElementNS(SVG_LINK, 'g');
    const elementRect = document.createElementNS(SVG_LINK, 'rect');
    expect(service['isEmptyG'](element)).toEqual(true);
    element.appendChild(elementRect);
    expect(service['isEmptyG'](element)).toEqual(false);
  });

  it('should be an redRect', () => {
    const elementRect = document.createElementNS(SVG_LINK, 'rect');
    elementRect.setAttribute('id', 'deleteRect');
    expect(service['isRedRect'](elementRect)).toEqual(true);
  });

  it('should comfirm if the rectangle have a red stroke', () => {
    const elementRectRed = document.createElementNS(SVG_LINK, 'rect');
    const elementGRed = document.createElementNS(SVG_LINK, 'g');
    const elementRect = document.createElementNS(SVG_LINK, 'rect');
    const elementGRect = document.createElementNS(SVG_LINK, 'g');
    elementGRect.appendChild(elementRect);
    elementGRed.appendChild(elementRectRed);
    elementRectRed.setAttribute('style', 'stroke: rgb(205,10,10);');
    expect(service['isStrokeRed'](elementGRect)).toEqual(false);
    expect(service['isStrokeRed'](elementGRed)).toEqual(true);
  });

  it('should ultimatly create the eraser', () => {
    const spyFill = spyOn<any>(service, 'fillMarkTables');
    const spyUpt = spyOn<any>(service, 'updateAttribut');
    const spyCheck = spyOn<any>(service, 'checkingElement');
    service.createElement(render, new Point(0, 0));
    expect(spyFill).toHaveBeenCalled();
    expect(spyUpt).toHaveBeenCalled();
    expect(spyCheck).toHaveBeenCalled();
  });

  it('should comfirm if its an undesirable element', () => {
    const gEl = document.createElementNS(SVG_LINK, 'g');
    const rect = document.createElementNS(SVG_LINK, 'rect');
    const rectRed = document.createElementNS(SVG_LINK, 'rect');
    rectRed.setAttribute('id', 'deleteRect');
    expect(service['isElementUndesirable'](gEl)).toEqual(true);
    expect(service['isElementUndesirable'](rectRed)).toEqual(true);
    expect(service['isElementUndesirable'](rect)).toEqual(false);
  });

  it('should a element who can be used', () => {
    const rect = document.createElementNS(SVG_LINK, 'rect');
    expect(service['isWorkElement'](rect)).toEqual(true);
    rect.setAttribute('id', 'eraser');
    expect(service['isWorkElement'](rect)).toEqual(false);
  });

  it('should throw an error when the attribute is undefined', () => {
    expect( () => { service['putAttributToNumber'](null); }).toThrowError(BAD_ATT);
  });

  it('should check all the border point of the eraser', () => {
    const eraser = document.createElementNS(SVG_LINK, 'rect');
    eraser.setAttribute('x', '100');
    eraser.setAttribute('y', '100');
    eraser.setAttribute('width', '3');
    eraser.setAttribute('height', '3');
    service['svgEraser'] = eraser;

    const spy = spyOn<any>(service, 'isPointInside');
    const element = document.createElementNS(SVG_LINK, 'rect');
    element.setAttribute('x', '10');
    element.setAttribute('y', '10');
    element.setAttribute('width', '10');
    element.setAttribute('height', '10');
    expect(service['isValidElement'](element)).toEqual(false);
    expect(spy).toHaveBeenCalledTimes(8);
  });

});

describe('EraserService with svg setting', () => {
  let service: EraserService;
  let render: Renderer2;
  let svg: ElementRef;
  let elG: SVGElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [EraserService,
        { provide: Renderer2, useClass: RenderStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.get(EraserService);
    render = TestBed.get(Renderer2);
    const svgHTML = document.createElement('svg');
    svgHTML.setAttribute('xmlns', SVG_LINK);
    svgHTML.setAttribute('x', '0');
    svgHTML.setAttribute('y', '0');
    svgHTML.setAttribute('width', '50');
    svgHTML.setAttribute('height', '50');
    svg = new ElementRef(svgHTML);

    elG = document.createElementNS(SVG_LINK, 'g');
    const elRect = document.createElementNS(SVG_LINK, 'rect');
    elRect.setAttribute('x', '10');
    elRect.setAttribute('y', '10');
    elRect.setAttribute('width', '10');
    elRect.setAttribute('height', '10');
    elRect.setAttribute('style', 'stroke:rgb(0,0,0);fill:none');
    elG.appendChild(elRect);
    for (let i = 0; i < 3; i++) {
      const filler = document.createElementNS(SVG_LINK, 'g');
      svg.nativeElement.appendChild(filler);
    }
    svg.nativeElement.appendChild(elG);

    const eraser = document.createElementNS(SVG_LINK, 'rect');
    eraser.setAttribute('x', '10');
    eraser.setAttribute('y', '10');
    eraser.setAttribute('width', '3');
    eraser.setAttribute('height', '3');
    service['svgEraser'] = eraser;

    service.setSvg = svg;
    service.setWidth = 3;
    service['fillMarkTables']();
  });

  it('should add an element to the markTable', () => {
    expect(service['markTable'][0][0]).toEqual(elG);
    expect(service['memMarkTable'][0]).toEqual(false);
  });

  it('should mark the element', () => {
    const createdRect = document.createElementNS(SVG_LINK, 'rect');
    spyOn(render, 'createElement').and.returnValue(createdRect);

    service['markElement'](render, elG);
    expect(service['memMarkTable'][0]).toEqual(true);
    expect(service['markTable'][1][0].localName).toEqual('rect');
  });

  it('should unmark the element', () => {
    const createdRect = document.createElementNS(SVG_LINK, 'rect');
    spyOn(render, 'createElement').and.returnValue(createdRect);

    service['markElement'](render, elG);
    service['unmarkElement'](render, elG);
    expect(service['memMarkTable'][0]).toEqual(false);
  });

  it('should be create a redRect', () => {
    const spyAtt = spyOn(render, 'setAttribute').and.callThrough();
    const spySty = spyOn(render, 'setStyle').and.callThrough();
    const createdRect = document.createElementNS(SVG_LINK, 'rect');
    spyOn(render, 'createElement').and.returnValue(createdRect);
    service['createRedRect'](render, elG);
    expect(spyAtt).toHaveBeenCalledTimes(5);
    expect(spySty).toHaveBeenCalledTimes(3);
  });

  it('should be create a redRect with a large red stroke', () => {
    const spyAtt = spyOn(render, 'setAttribute').and.callThrough();
    const spySty = spyOn(render, 'setStyle').and.callThrough();
    const createdRect = document.createElementNS(SVG_LINK, 'rect');
    (elG.firstElementChild as Element).setAttribute('style', 'stroke:rgb(250,50,50)');
    spyOn(render, 'createElement').and.returnValue(createdRect);
    service['createRedRect'](render, elG);
    expect(spyAtt).toHaveBeenCalledTimes(5);
    expect(spySty).toHaveBeenCalledTimes(3);
  });

  it('should say if an element to can be mark contact', () => {
    const rectRed = document.createElementNS(SVG_LINK, 'rect');
    rectRed.setAttribute('id', 'deleteRect');
    expect(service['canBeMark'](elG)).toEqual(true);
    expect(service['canBeMark'](rectRed)).toEqual(false);
  });

  it('should be in deleteTable', () => {
    service['deleteTable'] = [];
    const redRect = document.createElementNS(SVG_LINK, 'rect');
    spyOn(render, 'createElement').and.returnValue(redRect);
    service['deleteElement'](render, elG);
    expect(service['isInDeleteTable'](elG)).toEqual(true);
  });

  it('should stop to use the eraser service', () => {
    const redRect = document.createElementNS(SVG_LINK, 'rect');
    spyOn(render, 'createElement').and.returnValue(redRect);
    const spy = spyOn(render, 'removeChild');
    service['deleteTable'] = [];
    service['deleteElement'](render, elG);
    service.stop(render);
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should add an element to deleteTable', () => {
    const redRect = document.createElementNS(SVG_LINK, 'rect');
    spyOn(render, 'createElement').and.returnValue(redRect);

    service['deleteTable'] = [];
    service['deleteElement'](render, elG);
    expect(service['deleteTable'].length).toEqual(1);
  });

});
