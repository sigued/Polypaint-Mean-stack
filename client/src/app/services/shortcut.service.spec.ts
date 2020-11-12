import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DrawpageServiceStub } from '../stubs/drawpageService.stub';
import { GridServiceStub } from '../stubs/gridService.stub';
import { LineServiceStub } from '../stubs/lineService.stub';
import { SvgClickhandlerServiceStub } from '../stubs/svgclickhandlerService.stub';
import { DrawpageService } from './drawpage.service';
import { GridService } from './grid.service';
import { LineService } from './line.service';
import { MagnestismService } from './magnetism.service';
import { ShortcutService } from './shortcut.service';
import { SvgClickhandlerService } from './svgclickhandler.service';

describe('ShortcutService', () => {
  let shortcutService: ShortcutService;
  let drawpageService: DrawpageService;
  let gridService: GridService;
  let lineService: LineService;
  let svgClickHandler: SvgClickhandlerService;
  let magnetism: MagnestismService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [MagnestismService, ShortcutService, {provide: DrawpageService, useClass: DrawpageServiceStub},
        {provide: GridService, useClass: GridServiceStub},
        {provide: LineService, useClass: LineServiceStub},
        {provide: SvgClickhandlerService, useClass: SvgClickhandlerServiceStub},
      ],
    });
    drawpageService =  TestBed.get(DrawpageService);
    shortcutService = TestBed.get(ShortcutService);
    gridService = TestBed.get(GridService);
    lineService = TestBed.get(LineService);
    svgClickHandler = TestBed.get(SvgClickhandlerService);
    magnetism = TestBed.get(MagnestismService);
  });

  it('should be created', () => {
    expect(shortcutService).toBeTruthy();
  });

  it('should be selectTool pencil brush', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'w'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool pencil', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'c'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool pen', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'y'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool rectangle', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: '1'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool ellipse', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: '2'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool polygon', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: '3'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool line', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'l'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool text', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 't'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool pipette', () => {
    spyOn(drawpageService, 'setActive');
    spyOn(svgClickHandler, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'i'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
    expect(svgClickHandler.setActive).toHaveBeenCalled();
  });

  it('should be selectTool colorApplicator', () => {
    spyOn(drawpageService, 'setActive');
    spyOn(svgClickHandler, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'r'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
    expect(svgClickHandler.setActive).toHaveBeenCalled();
  });

  it('should be selectTool select', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 's'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool grid', () => {
    spyOn(gridService, 'setAttributes');
    const key = new KeyboardEvent('Keydown', {key: 'g'});
    shortcutService.selectTool(key);
    expect(gridService.setAttributes).toHaveBeenCalled();
  });

  it('should be selectTool minus', () => {
    spyOn(gridService, 'decreaseWidthAndHeight');
    const key = new KeyboardEvent('Keydown', {key: '-'});
    shortcutService.selectTool(key);
    expect(gridService.decreaseWidthAndHeight).toHaveBeenCalled();
  });

  it('should be selectTool plus', () => {
    spyOn(gridService, 'increaseWidthAndHeight');
    const key = new KeyboardEvent('Keydown', {key: '+'});
    shortcutService.selectTool(key);
    expect(gridService.increaseWidthAndHeight).toHaveBeenCalled();
  });

  it('should be selectTool eraser', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'e'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool delete', () => {
    spyOn(lineService, 'backspaceClicked');
    const key = new KeyboardEvent('Keydown', {key: 'Backspace'});
    shortcutService.selectTool(key);
    expect(lineService.backspaceClicked).toHaveBeenCalled();
  });

  it('should be selectTool escape', () => {
    const svgHTML = document.createElement('svg');
    const svg: ElementRef = new ElementRef(svgHTML);
    drawpageService.svg = svg;
    spyOn(lineService, 'escapeClicked');
    const key = new KeyboardEvent('Keydown', {key: 'Escape'});
    shortcutService.selectTool(key);
    expect(lineService.escapeClicked).toHaveBeenCalled();
  });

  it('should be selectTool plume', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'p'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool magnetism', () => {
    magnetism.isActivated = false;
    const key = new KeyboardEvent('Keydown', {key: 'm'});
    shortcutService.selectTool(key);
    expect(magnetism.isActivated).toBeTruthy();
  });

  it('should be selectTool magnetism', () => {
    magnetism.isActivated = true;
    const key = new KeyboardEvent('Keydown', {key: 'm'});
    shortcutService.selectTool(key);
    expect(magnetism.isActivated).toBeFalsy();
  });

  it('should be selectTool spray', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'a'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool spray', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'o'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('should be selectTool spray', () => {
    spyOn(drawpageService, 'setActive');
    const key = new KeyboardEvent('Keydown', {key: 'b'});
    shortcutService.selectTool(key);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

});
