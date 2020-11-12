import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
import { ColorApplicatorStub } from '../stubs/colorApplicator.stub';
import { GridServiceStub } from '../stubs/gridService.stub';
import { PipetteServiceStub } from '../stubs/pipetteService.stub';
import { RenderStub } from '../stubs/render.stub';
import { SelectStub } from '../stubs/select.stub';
import { ColorapplicatorService } from './colorapplicator.service';
import { GridService } from './grid.service';
import { MagnestismService } from './magnetism.service';
import { PipetteService } from './pipette.service';
import { SelectService } from './select.service';
import { SvgClickhandlerService } from './svgclickhandler.service';

describe('Service: Svgclickhandler', () => {
  let svgClickhandlerService: SvgClickhandlerService;
  let pipetteService: PipetteService;
  let colorApplicator: ColorapplicatorService;
  let selectService: SelectService;
  // let magnestismService: MagnestismService;

  let render: Renderer2;
  const svgHTML = document.createElement('svg');
  const svg: ElementRef = new ElementRef(svgHTML);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvgClickhandlerService,
        {provide: Renderer2, useClass: RenderStub},
        {provide: colorApplicator, useClass: ColorApplicatorStub},
        {provide: selectService, useClass: SelectStub},
        {provide: MagnestismService, useClass: MagnestismService},
        {provide: GridService, useClass: GridServiceStub},
        { provide: pipetteService, useClass: PipetteServiceStub}],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    svgClickhandlerService = TestBed.get(SvgClickhandlerService);
    pipetteService = TestBed.get(PipetteService);
    colorApplicator = TestBed.get(ColorapplicatorService);
    selectService = TestBed.get(SelectService);
    // magnestismService = TestBed.get(MagnestismService);
    render = TestBed.get(Renderer2);
  });

  it('should ...', inject([SvgClickhandlerService], (service: SvgClickhandlerService) => {
    expect(service).toBeTruthy();
  }));

  it('should be set render', () => {
    svgClickhandlerService.setRender(render);
    expect(svgClickhandlerService['render']).toEqual(render);
  });

  it('should be set svg', () => {
    svgClickhandlerService.setSvg(svg);
    expect(svgClickhandlerService['svg']).toEqual(svg);
  });

  it('should be set svg elements', () => {
    const elements: SvgElement[] = [];
    elements.push(new SvgElement(0, new Point(0, 0), new Point(0, 0), 0, 0, svg));
    svgClickhandlerService.setSvgElement(elements);
    expect(svgClickhandlerService['svgElement']).toEqual(elements);
  });

  it('should be set active', () => {
    svgClickhandlerService.setActive(1);
    expect(svgClickhandlerService['active']).toEqual(1);
  });

  it('should handleClick', () => {
    svgClickhandlerService['render'] = render;
    spyOn(render, 'listen').and.callThrough();
    spyOn(svgClickhandlerService, 'applyClickAction');
    svgClickhandlerService.handleClick(svgHTML);
    expect(render.listen).toHaveBeenCalledTimes(3);
    expect(svgClickhandlerService.applyClickAction).toHaveBeenCalledTimes(3);
  });

  it('should applyClickAction with active = pipette', () => {
    const event: any = {
      clientX: 10,
      clientY: 10,
    };
    svgClickhandlerService['render'] = render;
    svgClickhandlerService['svg'] = svg;
    svgClickhandlerService['active'] = 7;
    spyOn(pipetteService, 'handlePipette');
    svgClickhandlerService.applyClickAction(event, 0);
    expect(pipetteService.handlePipette).toHaveBeenCalled();
  });

  it('should applyClickAction with active = select', () => {
    const event: any = {
      clientX: 10,
      clientY: 10,
    };
    svgClickhandlerService['render'] = render;
    svgClickhandlerService['svg'] = svg;
    svgClickhandlerService['active'] = 8;
    spyOn(selectService, 'selectItem');
    svgClickhandlerService.applyClickAction(event, 0, true);
    expect(selectService.selectItem).toHaveBeenCalled();
  });

  it('should not applyClickAction with active = select', () => {
    const event: any = {
      clientX: 10,
      clientY: 10,
    };
    svgClickhandlerService['render'] = render;
    svgClickhandlerService['svg'] = svg;
    svgClickhandlerService['active'] = 8;
    spyOn(selectService, 'selectItem');
    svgClickhandlerService.applyClickAction(event, 0, false);
    expect(selectService.selectItem).not.toHaveBeenCalled();
  });

  it('should applyClickAction with active = colorapplicator', () => {
    const event: any = {
      clientX: 10,
      clientY: 10,
    };
    svgClickhandlerService['render'] = render;
    svgClickhandlerService['svg'] = svg;
    svgClickhandlerService['active'] = 14;
    spyOn(colorApplicator, 'handleColor');
    svgClickhandlerService.applyClickAction(event, 0);
    expect(colorApplicator.handleColor).toHaveBeenCalled();
  });

  it('should applyClickAction with active = nothing', () => {
    const event: any = {
      clientX: 10,
      clientY: 10,
    };
    svgClickhandlerService['render'] = render;
    svgClickhandlerService['svg'] = svg;
    svgClickhandlerService['active'] = 2;
    spyOn(colorApplicator, 'handleColor');
    spyOn(selectService, 'selectItem');
    svgClickhandlerService.applyClickAction(event, 0);
    expect(selectService.selectItem).not.toHaveBeenCalled();
    expect(colorApplicator.handleColor).not.toHaveBeenCalled();
  });

});
