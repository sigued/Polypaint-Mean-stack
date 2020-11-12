import { ElementRef, Renderer2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
import { EraserServiceStub } from '../stubs/eraserService.stub';
import { EtampeServiceStub } from '../stubs/etampeService.stub';
import { LineServiceStub } from '../stubs/lineService.stub';
import { MagnestismServiceStub } from '../stubs/magnetismService.stub';
import { PenServiceStub } from '../stubs/penService.stub';
import { RectangleServiceStub } from '../stubs/rectangleService.stub';
import { RenderStub } from '../stubs/render.stub';
import { SelectStub } from '../stubs/select.stub';
import { SvgClickhandlerServiceStub } from '../stubs/svgclickhandlerService.stub';
import { TextServiceStub } from '../stubs/textService.stub';
import { ToolServiceStub } from '../stubs/toolService.stub';
import { DrawpageService } from './drawpage.service';
import { EllipseService } from './ellipse.service';
import { EraserService } from './eraser.service';
import { EtampeService } from './etampe.service';
import { LineService } from './line.service';
import { MagnestismService } from './magnetism.service';
import { PenService } from './pen.service';
import { PencilBrushService } from './pencilBrush.service';
import { PolygonService } from './polygon.service';
import { RectangleService } from './rectangle.service';
import { SelectService } from './select.service';
import { SvgClickhandlerService } from './svgclickhandler.service';
import { TextService } from './text.service';
import { ToolService } from './tool.service';

describe('DrawpageService attribute', () => {
  let drawpageService: DrawpageService;
  let render: Renderer2;
  let textService: TextService;
  let svgClickhandlerService: SvgClickhandlerService;
  const firstPoint = new Point(0, 0);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [DrawpageService,
        { provide: Renderer2, useClass: RenderStub },
        { provide: TextService, useClass: TextServiceStub },
        { provide: SvgClickhandlerService, useClass: SvgClickhandlerServiceStub },
        { provide: MagnestismService, useClass: MagnestismServiceStub },
      ],
    });
    drawpageService = TestBed.get(DrawpageService);
    textService = TestBed.get(TextService);
    svgClickhandlerService = TestBed.get(SvgClickhandlerService);
    render = TestBed.get(Renderer2);
  });

  it('should be created', inject([DrawpageService], (service: DrawpageService) => {
    expect(service).toBeTruthy();
  }));

  it('should have as stroke \'black\'', () => {
    expect(drawpageService.primaryColor).toEqual('black');
  });

  it('should have as fill \'none\'', () => {
    expect(drawpageService.secondColor).toEqual('none');
  });

  it('should have as active 0', () => {
    expect(drawpageService.active).toEqual(0);
  });

  it('should have as isEmpty true', () => {
    expect(drawpageService.isEmpty).toEqual(true);
  });

  it('should have as hasBeenSet false', () => {
    expect(drawpageService.hasBeenSet).toEqual(false);
  });

  it('should emitActive', () => {
    spyOn(drawpageService.activeSubject, 'next');
    drawpageService.emitActive();
    expect(drawpageService.activeSubject.next).toHaveBeenCalled();
  });

  it('should getCurrentSvgContent', () => {
    spyOn(drawpageService.activeSubject, 'next');
    drawpageService.workArea = new ElementRef('test');
    expect(drawpageService.getCurrentSvgContent()).toEqual(drawpageService.workArea.nativeElement.innerHTLM);
  });

  it('should getCurrentSvgContent', () => {
    spyOn(drawpageService.elementTab, 'push');
    const svgHTML = document.createElement('svg');
    const svg: ElementRef = new ElementRef(svgHTML);
    drawpageService.addSvgElement(new SvgElement(2, new Point(0, 0), new Point(0, 0), 0, 0, svg));
    expect(drawpageService.elementTab.push).toHaveBeenCalled();
  });

  it('should getCurrentSvgContent', () => {
    spyOn(drawpageService.activeSubject, 'next');
    const svgHTML = document.createElement('svg');
    const svg: ElementRef = new ElementRef(svgHTML);
    drawpageService.workArea = new ElementRef(svg);
    drawpageService.updateCurrentSvgContent('test1');
    expect(drawpageService.workArea.nativeElement.innerHTLM).toEqual(undefined);
  });

  it('should setActive 1', () => {
    spyOn(drawpageService, 'emitActive');
    drawpageService.setActive(1);
    expect(drawpageService.active).toEqual(1);
    expect(drawpageService.emitActive).toHaveBeenCalled();
    expect(textService.isEditing).toEqual(false);
  });

  it('should setActive 11', () => {
    spyOn(drawpageService, 'emitActive');
    drawpageService.setActive(11);
    expect(drawpageService.active).toEqual(11);
    expect(drawpageService.emitActive).toHaveBeenCalled();
    expect(textService.isEditing).toBeUndefined();
  });

  it('should set the current svg and render', () => {
    spyOn(svgClickhandlerService, 'setRender');
    spyOn(svgClickhandlerService, 'setSvg');
    spyOn(svgClickhandlerService, 'setSvgElement');
    const svg: ElementRef = new ElementRef('test');
    const area: ElementRef = new ElementRef('test');
    drawpageService.setCurrentRenderAndSVG(render, svg, area);
    expect(svgClickhandlerService.setRender).toHaveBeenCalled();
    expect(svgClickhandlerService.setSvg).toHaveBeenCalled();
    expect(svgClickhandlerService.setSvgElement).toHaveBeenCalled();
    expect(drawpageService.svg).toEqual(svg);
    expect(drawpageService.render).toEqual(render);
  });

  it('should clean the svg', () => {
    const svgHTML = document.createElement('svg');
    const svg: ElementRef = new ElementRef(svgHTML);
    const area: ElementRef = new ElementRef('test');
    const event: any = {
      shiftKey: true,
    };
    drawpageService.setCurrentRenderAndSVG(render, svg, area);
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.stop(render, element, new Point(0, 0), true);
    spyOn(render, 'removeChild');
    drawpageService.cleanSVG();
    expect(render.removeChild).toHaveBeenCalled();
    expect(drawpageService.elementTab).toEqual([]);
    expect(drawpageService.nbElement).toEqual(0);
  });
});

describe('DrawpageService', () => {
  let drawpageService: DrawpageService;
  let rectangleService: RectangleService;
  let render: Renderer2;
  let pencilBrushService: PencilBrushService;
  let lineService: LineService;
  let ellipseService: EllipseService;
  let polygonService: PolygonService;
  let etampeService: EtampeService;
  let selectService: SelectService;
  let eraserService: EraserService;
  let textService: TextService;
  let penService: PenService;
  let event: any;

  let svg: ElementRef;
  const firstPoint = new Point(0, 0);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [DrawpageService,
        { provide: Renderer2, useClass: RenderStub },
        { provide: ToolService, useClass: ToolServiceStub },
        { provide: RectangleService, useClass: RectangleServiceStub },
        { provide: PolygonService, useClass: RectangleServiceStub },
        { provide: PencilBrushService, useClass: PenServiceStub },
        { provide: SelectService, useClass: SelectStub },
        { provide: EtampeService, useClass: EtampeServiceStub },
        { provide: LineService, useClass: LineServiceStub },
        { provide: EllipseService, useClass: RectangleServiceStub },
        { provide: EraserService, useClass: EraserServiceStub },
        { provide: TextService, useClass: TextServiceStub },
        { provide: SvgClickhandlerService, useClass: SvgClickhandlerServiceStub },
        { provide: PenService, useClass: PenServiceStub },
      ],
    });
    drawpageService = TestBed.get(DrawpageService);
    pencilBrushService = TestBed.get(PencilBrushService);
    rectangleService = TestBed.get(RectangleService);
    lineService = TestBed.get(LineService);
    ellipseService = TestBed.get(EllipseService);
    polygonService = TestBed.get(PolygonService);
    etampeService = TestBed.get(EtampeService);
    selectService = TestBed.get(SelectService);
    eraserService = TestBed.get(EraserService);
    textService = TestBed.get(TextService);
    penService = TestBed.get(PenService);
    render = TestBed.get(Renderer2);
    drawpageService.render = render;
    const svgHTML = document.createElement('svg');
    svg = new ElementRef(svgHTML);
    drawpageService.setCurrentRenderAndSVG(render, svg, new ElementRef('test'));
    event = { shiftKey: true };
  });

  it('should create an svg element 0', () => {
    drawpageService.active = 0;
    spyOn(pencilBrushService, 'createElement');
    drawpageService.createElement(render, firstPoint, event);
    expect(pencilBrushService.createElement).toHaveBeenCalledTimes(1);
  });

  it('should create an svg element (pencilBrush)', () => {
    drawpageService.active = 1;
    spyOn(pencilBrushService, 'createElement');
    drawpageService.createElement(render, firstPoint, event);
    expect(pencilBrushService.createElement).toHaveBeenCalled();
  });

  it('should create an svg element (rectangle)', () => {
    drawpageService.active = 2;
    spyOn(rectangleService, 'createElement');
    drawpageService.createElement(render, firstPoint, event);
    expect(rectangleService.createElement).toHaveBeenCalled();
  });

  it('should create an svg element (ellipse)', () => {
    drawpageService.active = 4;
    spyOn(ellipseService, 'createElement');
    drawpageService.createElement(render, firstPoint, event);
    expect(ellipseService.createElement).toHaveBeenCalled();
  });

  it('should create an svg element (polygon)', () => {
    drawpageService.active = 5;
    spyOn(polygonService, 'createElement');
    drawpageService.createElement(render, firstPoint, event);
    expect(polygonService.createElement).toHaveBeenCalled();
  });

  it('should create an svg element (etampe)', () => {
    drawpageService.active = 6;
    spyOn(etampeService, 'createElement');
    drawpageService.createElement(render, firstPoint, event);
    expect(etampeService.createElement).toHaveBeenCalled();
  });

  it('should create an svg element undefined', () => {
    drawpageService.active = 100;
    spyOn(render, 'createElement');
    drawpageService.createElement(render, firstPoint, event);
    expect(render.createElement).toHaveBeenCalled();
  });

  it('should create an svg element (selectService)', () => {
    drawpageService.active = 8;
    spyOn(selectService, 'createElement');
    drawpageService.createElement(render, firstPoint, event);
    expect(selectService.createElement).toHaveBeenCalled();
  });

  it('should create an svg element (penService)', () => {
    const svgHTML = document.createElement('svg');
    drawpageService.active = 10;
    spyOn(penService, 'createElement').and.returnValue(svgHTML as unknown as SVGElement);
    drawpageService.createElement(render, firstPoint, event);
    expect(penService.createElement).toHaveBeenCalled();
  });

  it('should create an svg element (textService)', () => {
    drawpageService.active = 11;
    spyOn(textService, 'createElement');
    drawpageService.createElement(render, firstPoint, event);
    expect(textService.createElement).toHaveBeenCalled();
  });

  it('should update 0', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 0;
    spyOn(pencilBrushService, 'update');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(pencilBrushService.update).toHaveBeenCalledTimes(1);
  });

  it('should update (pencilBrush)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 1;
    spyOn(pencilBrushService, 'update');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(pencilBrushService.update).toHaveBeenCalled();
  });

  it('should update (rectangleService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 2;
    spyOn(rectangleService, 'update');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(rectangleService.update).toHaveBeenCalled();
  });

  it('should update (lineService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 3;
    spyOn(lineService, 'showPotentialLine');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(lineService.showPotentialLine).toHaveBeenCalled();
  });

  it('should update (ellipseService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 4;
    spyOn(ellipseService, 'update');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(ellipseService.update).toHaveBeenCalled();
  });

  it('should update (polygonService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 5;
    spyOn(polygonService, 'update');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(polygonService.update).toHaveBeenCalled();
  });

  it('should update (etampeService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 6;
    spyOn(etampeService, 'update');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(etampeService.update).toHaveBeenCalled();
  });

  it('should update (selectService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 8;
    spyOn(selectService, 'update');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(selectService.update).toHaveBeenCalled();
  });

  it('should update (eraserService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 9;
    spyOn(eraserService, 'update');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(eraserService.update).toHaveBeenCalled();
  });

  it('should update (penService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 10;
    spyOn(penService, 'update');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(penService.update).toHaveBeenCalled();
  });

  it('should update default', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 20;
    spyOn(penService, 'update');
    drawpageService.update(render, firstPoint, element, event, true);
    expect(penService.update).toHaveBeenCalledTimes(0);
  });

  it('should movingMouse (eraserService)', () => {
    drawpageService.active = 9;
    spyOn(eraserService, 'update');
    drawpageService.movingMouse(render, firstPoint);
    expect(eraserService.update).toHaveBeenCalled();
  });

  it('should movingMouse (eraserService)', () => {
    drawpageService.active = 11;
    spyOn(eraserService, 'update');
    drawpageService.movingMouse(render, firstPoint);
    expect(eraserService.update).toHaveBeenCalledTimes(0);
  });

  it('should mouseWheel (etampeService)', () => {
    drawpageService.active = 6;
    spyOn(etampeService, 'mouseWheelRotation');
    drawpageService.mouseWheel(event);
    expect(etampeService.mouseWheelRotation).toHaveBeenCalled();
  });

  it('should update (etampeService) default', () => {
    drawpageService.active = 5;
    spyOn(etampeService, 'mouseWheelRotation');
    drawpageService.mouseWheel(event);
    expect(etampeService.mouseWheelRotation).toHaveBeenCalledTimes(0);
  });

  it('should doubleclick (lineService)', () => {
    drawpageService.active = 3;
    lineService.element = document.createElementNS(SVG_LINK, 'line');
    const gElement = document.createElementNS(SVG_LINK, 'g');
    const gLineSVG = document.createElementNS(SVG_LINK, 'g');
    const lineSVG = document.createElementNS(SVG_LINK, 'g');
    gLineSVG.appendChild(lineSVG);
    drawpageService['lineService'].element = lineSVG;
    spyOn(render, 'createElement').and.returnValue(gElement);
    spyOn(lineService, 'stop');
    spyOn(drawpageService.elementTab, 'push');
    spyOn(drawpageService.actionModel.actions, 'push');
    drawpageService.doubleClick(render, firstPoint, event);
    expect(drawpageService.elementTab.push).toHaveBeenCalled();
    expect(drawpageService.actionModel.actions.push).toHaveBeenCalled();
    expect(lineService.stop).toHaveBeenCalled();
  });

  it('should stop 0', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 0;
    spyOn(drawpageService.actionModel.actions, 'push');
    spyOn(drawpageService.elementTab, 'push');
    spyOn(pencilBrushService, 'stop');
    drawpageService.stop(render, firstPoint, element, event);
    expect(pencilBrushService.stop).toHaveBeenCalledTimes(1);
    expect(drawpageService.actionModel.actions.push).toHaveBeenCalled();
    expect(drawpageService.elementTab.push).toHaveBeenCalled();
  });

  it('should stop (pencilBrush)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 1;
    spyOn(drawpageService.actionModel.actions, 'push');
    spyOn(drawpageService.elementTab, 'push');
    spyOn(pencilBrushService, 'stop');
    drawpageService.stop(render, firstPoint, element, event);
    expect(pencilBrushService.stop).toHaveBeenCalled();
    expect(drawpageService.actionModel.actions.push).toHaveBeenCalled();
    expect(drawpageService.elementTab.push).toHaveBeenCalled();
  });

  it('should stop (lineService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 3;
    spyOn(drawpageService.actionModel.actions, 'push');
    spyOn(drawpageService.elementTab, 'push');
    spyOn(lineService, 'mouseUp');
    drawpageService.stop(render, firstPoint, element, event);
    expect(lineService.mouseUp).toHaveBeenCalled();
    expect(drawpageService.actionModel.actions.push).not.toHaveBeenCalled();
    expect(drawpageService.elementTab.push).not.toHaveBeenCalled();
  });

  it('should stop 4', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 4;
    spyOn(drawpageService.actionModel.actions, 'push');
    spyOn(drawpageService.elementTab, 'push');
    spyOn(selectService, 'stop');
    drawpageService.stop(render, firstPoint, element, event);
    expect(selectService.stop).toHaveBeenCalledTimes(0);
    expect(drawpageService.actionModel.actions.push).toHaveBeenCalled();
    expect(drawpageService.elementTab.push).toHaveBeenCalled();
  });

  it('should stop (selectService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 8;
    spyOn(selectService, 'stop');
    drawpageService.stop(render, firstPoint, element, event);
    expect(selectService.stop).toHaveBeenCalled();
  });

  it('should stop (eraserService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 9;
    spyOn(drawpageService.actionModel.actions, 'push');
    spyOn(drawpageService.elementTab, 'push');
    spyOn(eraserService, 'stop');
    drawpageService.stop(render, firstPoint, element, event);
    expect(eraserService.stop).toHaveBeenCalled();
    expect(drawpageService.actionModel.actions.push).toHaveBeenCalled();
    expect(drawpageService.elementTab.push).toHaveBeenCalled();
  });

  it('should stop (penService)', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 10;
    spyOn(drawpageService.actionModel.actions, 'push');
    spyOn(drawpageService.elementTab, 'push');
    spyOn(penService, 'stop');
    drawpageService.stop(render, firstPoint, element, event);
    expect(penService.stop).toHaveBeenCalled();
    expect(drawpageService.actionModel.actions.push).toHaveBeenCalled();
    expect(drawpageService.elementTab.push).toHaveBeenCalled();
  });

  it('should stop default', () => {
    const element = drawpageService.createElement(render, firstPoint, event);
    drawpageService.active = 20;
    spyOn(drawpageService.actionModel.actions, 'push');
    spyOn(drawpageService.elementTab, 'push');
    spyOn(penService, 'stop');
    drawpageService.stop(render, firstPoint, element, event);
    expect(penService.stop).toHaveBeenCalledTimes(0);
    expect(drawpageService.actionModel.actions.push).toHaveBeenCalled();
    expect(drawpageService.elementTab.push).toHaveBeenCalled();
  });
});
