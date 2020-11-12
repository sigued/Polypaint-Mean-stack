import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
import { ClipboardStub } from '../stubs/clipboard.stub';
import { RenderStub } from '../stubs/render.stub';
import { SelectStub } from '../stubs/select.stub';
import { ClipboardService } from './clipboard.service';
import { HandlerselectionService } from './handlerselection.service';
import { SelectService } from './select.service';

enum SelectionOption { COPY = 0, CUT = 1, PASTE = 2, DUPLICATE = 3, DELETE = 4, NONE = 5 }
describe('Service: Handlerselection', () => {
  let handlerselectionService: HandlerselectionService;
  let clipBoardService: ClipboardService;
  let selectService: SelectService;

  let render: Renderer2;
  const svgHTML = document.createElement('svg');
  const svg: ElementRef = new ElementRef(svgHTML);

  const elements: SvgElement[] = [];
  elements.push(new SvgElement(0, new Point(0, 0), new Point(0, 0), 0, 0, svg));
  elements[0].element = document.createElement('rect');

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [HandlerselectionService,
        {provide: Renderer2, useClass: RenderStub},
        {provide: clipBoardService, useClass: ClipboardStub},
        {provide: SelectService, useClass: SelectStub},
      ],
    });
    handlerselectionService = TestBed.get(HandlerselectionService);
    clipBoardService = TestBed.get(ClipboardService);
    selectService = TestBed.get(SelectService);
    render = TestBed.get(Renderer2);
    selectService.selectedElement = elements;
  });

  it('should exist', () => {
    expect(handlerselectionService).toBeTruthy();
  });

  it('should handleSelection - copy', () => {
    spyOn(handlerselectionService, 'copy');
    handlerselectionService.handleSelection(SelectionOption.COPY);
    expect(handlerselectionService.copy).toHaveBeenCalled();
  });

  it('should handleSelection - cut', () => {
    spyOn(handlerselectionService, 'cut');
    handlerselectionService.handleSelection(SelectionOption.CUT);
    expect(handlerselectionService.cut).toHaveBeenCalled();
  });

  it('should handleSelection - paste', () => {
    spyOn(handlerselectionService, 'paste');
    handlerselectionService.handleSelection(SelectionOption.PASTE);
    expect(handlerselectionService.paste).toHaveBeenCalled();
  });

  it('should handleSelection - duplicate', () => {
    spyOn(handlerselectionService, 'duplicate');
    handlerselectionService.handleSelection(SelectionOption.DUPLICATE);
    expect(handlerselectionService.duplicate).toHaveBeenCalled();
  });

  it('should init properties', () => {
    handlerselectionService.init(render, svg, elements);
    expect(handlerselectionService['render']).toEqual(render);
    expect(handlerselectionService['svg']).toEqual(svg);
    expect(handlerselectionService['svgElements']).toEqual(elements);
  });

  it('should copy', () => {
    spyOn(clipBoardService, 'copy');
    spyOn(clipBoardService, 'setExtremum');
    handlerselectionService.copy();
    expect(clipBoardService.copy).toHaveBeenCalled();
    expect(clipBoardService.setExtremum).toHaveBeenCalled();
  });

  it('should duplicate', () => {
    spyOn(clipBoardService, 'copy');
    spyOn(clipBoardService, 'setExtremum');
    spyOn(handlerselectionService, 'remove');
    handlerselectionService.cut();
    expect(clipBoardService.copy).toHaveBeenCalled();
    expect(clipBoardService.setExtremum).toHaveBeenCalled();
    expect(handlerselectionService.remove).toHaveBeenCalled();
  });

  it('should selectAll', () => {
    handlerselectionService['render'] = render;
    handlerselectionService['svg'] = svg;
    spyOn(selectService, 'init');
    spyOn(selectService, 'selectAll');
    handlerselectionService.selectAll();
    expect(selectService.init).toHaveBeenCalled();
    expect(selectService.selectAll).toHaveBeenCalled();
  });

  it('should createGroupContainer', () => {
    handlerselectionService['render'] = render;
    handlerselectionService['svg'] = svg;
    spyOn(render, 'createElement');
    spyOn(render, 'appendChild');
    handlerselectionService.createGroupContainer();
    expect(render.createElement).toHaveBeenCalled();
    expect(render.appendChild).toHaveBeenCalled();
  });

  it('should removeElement', () => {
    handlerselectionService['svgElements'] = elements;
    handlerselectionService.removeElement(elements[0]);
    expect(handlerselectionService['svgElements'].length).toEqual(0);
  });
});

describe('Service: Handlerselection', () => {
  let handlerselectionService: HandlerselectionService;
  let clipBoardService: ClipboardService;
  let selectService: SelectService;

  let render: Renderer2;
  const svgHTML = document.createElement('svg');
  const svg: ElementRef = new ElementRef(svgHTML);

  const elements: SvgElement[] = [];
  elements.push(new SvgElement(0, new Point(0, 0), new Point(0, 0), 0, 0, svg));
  elements[0].element = document.createElement('rect');

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [HandlerselectionService,
        {provide: Renderer2, useClass: RenderStub},
        {provide: clipBoardService, useClass: ClipboardStub},
        {provide: SelectService, useClass: SelectStub},
      ],
    });
    handlerselectionService = TestBed.get(HandlerselectionService);
    clipBoardService = TestBed.get(ClipboardService);
    selectService = TestBed.get(SelectService);
    render = TestBed.get(Renderer2);
    selectService.selectedElement = elements;

    handlerselectionService['render'] = render;
    handlerselectionService['svgElements'] = [];
    handlerselectionService['lastGroupElements'] = elements;
    handlerselectionService['svg'] = svg;
  });
  it('should translateSelectedGroup', () => {
    handlerselectionService['action'] = SelectionOption.COPY;
    spyOn(handlerselectionService['render'], 'createElement').and.returnValue(document.createElement('g'));
    spyOn(handlerselectionService['render'], 'setAttribute');
    handlerselectionService.translateSelectedGroup(new Point(100, 100));
    expect(render.createElement).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should translateSelectedGroup with negative points', () => {
    handlerselectionService['action'] = SelectionOption.COPY;
    handlerselectionService['svgElements'] = [];
    spyOn(handlerselectionService['render'], 'createElement').and.returnValue(document.createElement('g'));
    spyOn(handlerselectionService['render'], 'setAttribute');
    handlerselectionService.translateSelectedGroup(new Point(-10, -10));
    expect(render.createElement).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should paste after COPY', () => {
    handlerselectionService['action'] = SelectionOption.COPY;
    spyOn(clipBoardService, 'getElement').and.returnValue(elements);
    spyOn(handlerselectionService, 'translateSelectedGroup');
    spyOn(selectService, 'deselect');
    spyOn(selectService, 'drawSelectItem');
    spyOn(clipBoardService, 'copy');
    spyOn(clipBoardService, 'setExtremum');
    handlerselectionService.paste();
    expect(clipBoardService.getElement).toHaveBeenCalled();
    expect(selectService.deselect).toHaveBeenCalled();
    expect(selectService.drawSelectItem).toHaveBeenCalled();
    expect(clipBoardService.copy).toHaveBeenCalled();
    expect(clipBoardService.setExtremum).toHaveBeenCalled();
  });

  it('should paste after CUT', () => {
    handlerselectionService['action'] = SelectionOption.CUT;
    spyOn(clipBoardService, 'getElement').and.returnValue(elements);
    spyOn(handlerselectionService, 'translateSelectedGroup');
    spyOn(selectService, 'deselect');
    spyOn(selectService, 'drawSelectItem');
    spyOn(clipBoardService, 'copy');
    spyOn(clipBoardService, 'setExtremum');
    handlerselectionService.paste();
    expect(clipBoardService.getElement).toHaveBeenCalled();
    expect(selectService.deselect).toHaveBeenCalled();
    expect(selectService.drawSelectItem).toHaveBeenCalled();
    expect(clipBoardService.copy).toHaveBeenCalled();
    expect(clipBoardService.setExtremum).toHaveBeenCalled();
  });

  it('should paste after Duplicate', () => {
    handlerselectionService['action'] = SelectionOption.DUPLICATE;
    spyOn(clipBoardService, 'getElement').and.returnValue(elements);
    spyOn(handlerselectionService, 'translateSelectedGroup');
    spyOn(selectService, 'deselect');
    spyOn(selectService, 'drawSelectItem');
    spyOn(clipBoardService, 'copy');
    spyOn(clipBoardService, 'setExtremum');
    handlerselectionService.paste();
    expect(selectService.deselect).toHaveBeenCalled();
    expect(selectService.drawSelectItem).toHaveBeenCalled();
    expect(clipBoardService.copy).toHaveBeenCalled();
    expect(clipBoardService.setExtremum).toHaveBeenCalled();
  });

  it('should handleSelection - remove', () => {
    spyOn(handlerselectionService, 'remove');
    handlerselectionService.handleSelection(SelectionOption.DELETE);
    expect(handlerselectionService.remove).toHaveBeenCalled();
  });

  it('should remove', () => {
    spyOn(selectService, 'getSelectedElement').and.returnValue(elements);
    spyOn(render, 'removeChild');
    spyOn(handlerselectionService, 'removeElement');
    spyOn(selectService, 'deselect');
    spyOn(selectService, 'initSelectedElement');
    handlerselectionService.remove();
    expect(render.removeChild).toHaveBeenCalled();
    expect(handlerselectionService.removeElement).toHaveBeenCalled();
    expect(selectService.deselect).toHaveBeenCalled();
    expect(selectService.initSelectedElement).toHaveBeenCalled();
  });

  it('should cut', () => {
    spyOn(clipBoardService, 'copy');
    spyOn(handlerselectionService, 'paste');
    handlerselectionService.duplicate();
    expect(clipBoardService.copy).toHaveBeenCalled();
    expect(handlerselectionService.paste).toHaveBeenCalled();
  });

  it('should paste with nothing selected', () => {
    handlerselectionService['action'] = SelectionOption.COPY;
    spyOn(clipBoardService, 'getElement').and.returnValue([]);
    spyOn(selectService, 'deselect');
    spyOn(selectService, 'drawSelectItem');
    spyOn(clipBoardService, 'copy');
    spyOn(clipBoardService, 'getExtremun');
    handlerselectionService.paste();
    expect(clipBoardService.getElement).toHaveBeenCalled();
    expect(selectService.deselect).not.toHaveBeenCalled();
    expect(selectService.drawSelectItem).not.toHaveBeenCalled();
    expect(clipBoardService.copy).not.toHaveBeenCalled();
    expect(clipBoardService.getExtremun).toHaveBeenCalled();
  });
});
