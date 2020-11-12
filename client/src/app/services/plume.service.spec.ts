import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import * as CONST from '../constant';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { PlumeService } from './plume.service';

describe('PlumeService', () => {
  let service: PlumeService;
  let render: Renderer2;
  let svg: ElementRef;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [PlumeService, { provide: Renderer2, useClass: RenderStub }],
    });
    service = TestBed.get(PlumeService);
    render = TestBed.get(Renderer2);
    const svgHTML = document.createElement('svg');
    svgHTML.setAttribute('xmlns', CONST.SVG_LINK);
    svgHTML.setAttribute('x', '10');
    svgHTML.setAttribute('y', '10');
    svgHTML.setAttribute('width', '50');
    svgHTML.setAttribute('height', '50');
    svg = new ElementRef(svgHTML);
  });

  it('should be created', () => {
    const servicePlume: PlumeService = TestBed.get(PlumeService);
    expect(servicePlume).toBeTruthy();
    expect(service.rotationAngle).toEqual(CONST.STRAIGHT_ANGLE);
    expect(service['width']).toEqual(CONST.DEFAULT_FEATHER_WIDTH);
    expect(service.previousPoint).toEqual(new Point(0, 0));
  });

  it('should create the update', () => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    spyOn(service, 'createNewLine').and.returnValue(line);
    spyOn(render, 'createElement').and.returnValue(group);
    service.createElement(render, new Point(5, 5), svg.nativeElement);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should get color', () => {
    expect(service.getColor()).toEqual('rgba(0,0,0,1)');
  });

  it('should change the type of angle', () => {
    expect(service.degreesToRadianAngle(180)).toEqual(Math.PI);
  });

  it('should set the width', () => {
    service.setWidth(8);
    expect(service['width']).toEqual(8);
  });

  it('should set rotation angle', () => {
    service.setRotationAngle(15);
    expect(service['rotationAngle']).toEqual(15);
  });

  it('should set the feather attributes', () => {
    spyOn(render, 'setAttribute');
    spyOn(render, 'setStyle');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    service.setFeatherAttributes(render, line, new Point(5, 5));
    expect(render.setAttribute).toHaveBeenCalledTimes(4);
    expect(render.setStyle).toHaveBeenCalledTimes(2);
  });

  it('should change the rotation angle with the wheel', async () => {
    const event = document.createEvent('WheelEvent') as WheelEvent;
    service.mouseWheelRotation(event);
    expect(service.rotationAngle).toEqual(75);
    const eventUp = document.createEvent('WheelEvent');
    spyOnProperty(eventUp, 'deltaY').and.returnValue(10);
    service.mouseWheelRotation(eventUp);
    expect(service.rotationAngle).toEqual(90);
  });

  it('should generate an intermediate line', () => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.appendChild(line);
    service.element = line;
    const spy = spyOn(render, 'appendChild');
    service.generateIntermediateLines(render, new Point(4, 4));
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should update the tool', () => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.appendChild(line);
    service.element = line;
    const spy = spyOn(render, 'appendChild');
    service.update(render, new Point(4, 4), svg.nativeElement);
    expect(service.previousPoint).toEqual(new Point(4, 4));
    expect(spy).toHaveBeenCalled();
  });
});
