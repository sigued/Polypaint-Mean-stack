import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Actions } from 'src/app/entity/action';
import { Point } from 'src/app/entity/point';
import { SvgElement } from 'src/app/entity/svgElement';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { RenderStub } from 'src/app/stubs/render.stub';
import { DrawpageService } from '../drawpage.service';
import { UndoRedoCommand } from './undoRedoCommand';

describe('UndoRedoCommand', () => {
  let undoRedoCommand: UndoRedoCommand;
  let drawpageService: DrawpageService;
  let render: Renderer2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      providers: [Actions, UndoRedoCommand, {provide: DrawpageService, useClass: DrawpageServiceStub},
      {provide: Renderer2, useClass: RenderStub}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    render = TestBed.get(Renderer2);
    undoRedoCommand = TestBed.get(UndoRedoCommand);
    drawpageService = TestBed.get(DrawpageService);
    undoRedoCommand['drawpageService'] = drawpageService;
    undoRedoCommand['drawpageService'].render = render;
    undoRedoCommand['actionModel'].actions = [];
    undoRedoCommand['actionModel'].redoActions = [];
  });

  it('when undoDisabled is called', () => {
    expect(undoRedoCommand.undoDisabled()).toBeTruthy();
  });

  it('when redoDisabled is called', () => {
    expect(undoRedoCommand.redoDisabled()).toBeTruthy();
  });

  it('when undo is called with one element', () => {
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const sgvElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    undoRedoCommand['drawpageService'].svg = svg;
    sgvElement.element = element;
    undoRedoCommand['actionModel'].redoActions = [];
    undoRedoCommand['actionModel'].actions.push(sgvElement);
    spyOn(undoRedoCommand['actionModel'].actions, 'pop').and.returnValue(sgvElement);
    spyOn(undoRedoCommand, 'removeElement');
    undoRedoCommand.undo();
    expect(undoRedoCommand['actionModel'].actions.pop).toHaveBeenCalled();
    expect(undoRedoCommand.removeElement).toHaveBeenCalled();
  });

  it('when undo is called with no element', () => {
    spyOn(undoRedoCommand['actionModel'].actions, 'pop').and.returnValue(undefined);
    spyOn(undoRedoCommand['actionModel'].redoActions, 'push');
    undoRedoCommand.undo();
    expect(undoRedoCommand['actionModel'].redoActions.push).toHaveBeenCalledTimes(0);
  });

  it('when redo is called with no element', () => {
    spyOn(undoRedoCommand['actionModel'].redoActions, 'pop').and.returnValue(undefined);
    spyOn(undoRedoCommand['actionModel'].actions, 'push');
    undoRedoCommand.redo();
    expect(undoRedoCommand['actionModel'].actions.push).toHaveBeenCalledTimes(0);
  });

  it('when redo is called with one element', () => {
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const sgvElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    undoRedoCommand['drawpageService'].svg = svg;
    sgvElement.element = element;
    undoRedoCommand['actionModel'].actions = [];
    undoRedoCommand['actionModel'].redoActions.push(sgvElement);
    undoRedoCommand['drawpageService'].elementTab = [];
    spyOn(drawpageService.svg.nativeElement, 'appendChild');
    spyOn(undoRedoCommand['actionModel'].redoActions, 'pop').and.returnValue(sgvElement);
    undoRedoCommand.redo();
    expect(drawpageService.svg.nativeElement.appendChild).toHaveBeenCalled();
  });

  it('should removeElement', () => {
      const svgHTML = document.createElement('svg');
      const svg: ElementRef = new ElementRef(svgHTML);
      const tab: SvgElement[] = [];
      tab.push(new SvgElement(0, new Point(0, 0), new Point(0, 0), 0, 0, svg));
      tab[0].element = document.createElement('rec');
      undoRedoCommand.removeElement(tab[0], tab);
      expect(tab.length).toEqual(0);
    });

  it('should removeElement', () => {
      const svgHTML = document.createElement('svg');
      const svg: ElementRef = new ElementRef(svgHTML);
      const tab: SvgElement[] = [];
      undoRedoCommand.removeElement(new SvgElement(0, new Point(0, 0), new Point(0, 0), 0, 0, svg), tab);
      expect(tab.length).toEqual(0);
  });
});
