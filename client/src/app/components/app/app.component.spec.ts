import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UndoRedoCommand } from 'src/app/services/command/undoRedoCommand';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { HandlerselectionService } from 'src/app/services/handlerselection.service';
import { ShortcutService } from 'src/app/services/shortcut.service';
import { TextService } from 'src/app/services/text.service';
import { HandlerselectionServiceStub } from 'src/app/stubs/handlerselectionService.stub';
import { ModalManagerServiceStub } from 'src/app/stubs/modalManagerService.stub';
import { ShortcutServiceStub } from 'src/app/stubs/shortcutService.stub';
import { TextServiceStub } from 'src/app/stubs/textService.stub';
import { UndoRedoServiceStub } from 'src/app/stubs/undoRedoService.stubs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let modalManagerService: ModalManagerService;
  let undoRedoCommandService: UndoRedoCommand;
  let handlerSelectionService: HandlerselectionService;
  let textService: TextService;
  let shortCutService: ShortcutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      providers: [{provide: ModalManagerService, useClass: ModalManagerServiceStub},
        {provide: UndoRedoCommand, useClass: UndoRedoServiceStub },
        {provide: HandlerselectionService, useClass: HandlerselectionServiceStub },
        {provide: TextService, useClass: TextServiceStub },
        {provide: ShortcutService, useClass: ShortcutServiceStub }, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    modalManagerService = TestBed.get(ModalManagerService);
    shortCutService = TestBed.get(ShortcutService);
    undoRedoCommandService = TestBed.get(UndoRedoCommand);
    textService = TestBed.get(TextService);
    handlerSelectionService = TestBed.get(HandlerselectionService);
    fixture.detectChanges();
    fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call eventHandling', async(() => {
    const event = new KeyboardEvent('Keydown', {code: 'KeyS', ctrlKey: true});
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopImmediatePropagation');
    component.eventHandling(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopImmediatePropagation).toHaveBeenCalled();
  }));

  it('should call open(1)', async(() => {
    spyOn(modalManagerService, 'openDialog');
    component.open(1);
    expect(modalManagerService.openDialog).toHaveBeenCalled();
  }));

  it('should call open(2)', async(() => {
    spyOn(modalManagerService, 'openDialog');
    component.open(2);
    expect(modalManagerService.openDialog).toHaveBeenCalled();
  }));

  it('should call open(1)', async(() => {
    spyOn(modalManagerService, 'openDialog');
    component.open(1);
    expect(modalManagerService.openDialog).toHaveBeenCalled();
  }));

  it('should call open(3)', async(() => {
    spyOn(modalManagerService, 'openDialog');
    component.open(3);
    expect(modalManagerService.openDialog).toHaveBeenCalled();
  }));
  it('should call open(4)', async(() => {
    spyOn(modalManagerService, 'openDialog');
    component.open(4);
    expect(modalManagerService.openDialog).toHaveBeenCalled();
  }));

  it('should call undo', async(() => {
    spyOn(undoRedoCommandService, 'undo');
    component.undo();
    expect(undoRedoCommandService.undo).toHaveBeenCalled();
  }));

  it('should call redo', async(() => {
    spyOn(undoRedoCommandService, 'redo');
    component.redo();
    expect(undoRedoCommandService.redo).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with modalIsOpen true', async(() => {
    modalManagerService.modalIsOpen = true;
    spyOn(undoRedoCommandService, 'redo');
    spyOn(component, 'open');
    const key = new KeyboardEvent('KeyO');
    component.keyboardShortcut(key);
    expect(component.open).toHaveBeenCalledTimes(0);
    expect(undoRedoCommandService.redo).toHaveBeenCalledTimes(0);
  }));

  it('should call keyboardShortcut modalIsOpen false', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(component, 'open');
    const key = new KeyboardEvent('KeyO');
    component.keyboardShortcut(key);
    expect(component.open).toHaveBeenCalledTimes(0);
  }));

  it('should call keyboardShortcut with keyO', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(component, 'open');
    spyOn(component, 'eventHandling');
    const key = new KeyboardEvent('Keydown', {code: 'KeyO', ctrlKey: true});
    component.keyboardShortcut(key);
    expect(component.open).toHaveBeenCalled();
    expect(component.eventHandling).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with keyS', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(component, 'open');
    spyOn(component, 'eventHandling');
    const key = new KeyboardEvent('Keydown', {code: 'KeyS', ctrlKey: true});
    component.keyboardShortcut(key);
    expect(component.open).toHaveBeenCalled();
    expect(component.eventHandling).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with keyG', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(component, 'open');
    spyOn(component, 'eventHandling');
    const key = new KeyboardEvent('Keydown', {code: 'KeyG', ctrlKey: true});
    component.keyboardShortcut(key);
    expect(component.open).toHaveBeenCalled();
    expect(component.eventHandling).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with keyE', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(component, 'open');
    spyOn(component, 'eventHandling');
    const key = new KeyboardEvent('Keydown', {code: 'KeyE', ctrlKey: true});
    component.keyboardShortcut(key);
    expect(component.open).toHaveBeenCalled();
    expect(component.eventHandling).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with keyZ', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(undoRedoCommandService, 'undo');
    const key = new KeyboardEvent('Keydown', {code: 'KeyZ', ctrlKey: true});
    component.keyboardShortcut(key);
    expect(undoRedoCommandService.undo).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with keyZ shiftKey', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(undoRedoCommandService, 'redo');
    const key = new KeyboardEvent('Keydown', {code: 'KeyZ', shiftKey: true, ctrlKey: true});
    component.keyboardShortcut(key);
    expect(undoRedoCommandService.redo).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with keyA', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(handlerSelectionService, 'selectAll');
    const key = new KeyboardEvent('Keydown', {code: 'KeyA', ctrlKey: true});
    component.keyboardShortcut(key);
    expect(handlerSelectionService.selectAll).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with keyC', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(handlerSelectionService, 'copy');
    const key = new KeyboardEvent('Keydown', {code: 'KeyC', ctrlKey: true});
    component.keyboardShortcut(key);
    expect(handlerSelectionService.copy).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with keyX', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(handlerSelectionService, 'cut');
    const key = new KeyboardEvent('Keydown', {code: 'KeyX', ctrlKey: true});
    component.keyboardShortcut(key);
    expect(handlerSelectionService.cut).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with keyV', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(handlerSelectionService, 'paste');
    const key = new KeyboardEvent('Keydown', {code: 'KeyV', ctrlKey: true});
    component.keyboardShortcut(key);
    expect(handlerSelectionService.paste).toHaveBeenCalled();
  }));

  it('should call keyboardShortcut with keyD', async(() => {
    modalManagerService.modalIsOpen = false;
    spyOn(handlerSelectionService, 'duplicate');
    const key = new KeyboardEvent('Keydown', {code: 'KeyD', ctrlKey: true});
    component.keyboardShortcut(key);
    expect(handlerSelectionService.duplicate).toHaveBeenCalled();
  }));

  it('should call textService', async(() => {
    modalManagerService.modalIsOpen = false;
    textService.isEditing = true;
    spyOn(textService, 'editText');
    const key = new KeyboardEvent('Keydown', {});
    component.keyboardShortcut(key);
    expect(textService.editText).toHaveBeenCalled();
  }));

  it('should call textService', async(() => {
    modalManagerService.modalIsOpen = false;
    textService.isEditing = false;
    spyOn(shortCutService, 'selectTool');
    const key = new KeyboardEvent('Keydown', {});
    component.keyboardShortcut(key);
    expect(shortCutService.selectTool).toHaveBeenCalled();
  }));

});
