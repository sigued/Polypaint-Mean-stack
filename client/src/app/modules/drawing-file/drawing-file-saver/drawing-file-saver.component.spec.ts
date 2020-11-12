import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { DrawingFileService } from 'src/app/services/common/drawingFile.service';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { DrawingFileServiceStub } from 'src/app/stubs/drawingFileService.stub';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { ModalManagerServiceStub } from 'src/app/stubs/modalManagerService.stub';
import { SafeHtmlPipe } from '../safeHtml.pipe';
import { DrawingFileSaverComponent } from './drawing-file-saver.component';

describe('DrawingFileSaverComponent', () => {
  let component: DrawingFileSaverComponent;
  let fixture: ComponentFixture<DrawingFileSaverComponent>;
  let drawingFileService: DrawingFileService;
  let modalManagerService: ModalManagerService;
  let drawpageService: DrawpageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SafeHtmlPipe, DrawingFileSaverComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
      ],
      providers: [{ provide: DrawingFileService, useClass: DrawingFileServiceStub},
        {provide: ModalManagerService, useClass: ModalManagerServiceStub},
        {provide: DrawpageService, useClass:  DrawpageServiceStub}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingFileSaverComponent);
    component = fixture.componentInstance;
    drawingFileService = TestBed.get(DrawingFileService);
    drawpageService =  TestBed.get(DrawpageService);
    modalManagerService = TestBed.get(ModalManagerService);
    fixture.detectChanges();
    fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initForm when nginit is called', () => {
    spyOn(component, 'initForm');
    spyOn(drawpageService, 'getCurrentSvgContent');
    component.ngOnInit();
    expect(component.initForm).toHaveBeenCalled();
  });

  it('should call initForm when drawpageservice is not empty', () => {
    drawpageService.isEmpty = false;
    spyOn(drawpageService, 'getCurrentSvgContent');
    component.initForm();
    expect(drawpageService.getCurrentSvgContent).toHaveBeenCalled();
  });

  it('should call initForm when drawpageservice is empty', () => {
    drawpageService.isEmpty = true;
    spyOn(drawpageService, 'getCurrentSvgContent');
    component.initForm();
    expect(drawpageService.getCurrentSvgContent).toHaveBeenCalledTimes(0);
  });

  it('should onSaveDrawFileServer', async () => {
    component.isOnErrors = true;
    spyOn(component, 'onClose');
    await component.onSaveDrawFileServer();
    expect(component.onClose).toHaveBeenCalledTimes(0);
  });

  it('should onSaveDrawFileServer when isOnErrors is false', async () => {
    fixture.whenStable();
    component.newDrawingFileform.controls.name.setValue('as');
    component.getTags().push(new FormControl('auto'));
    component.isOnErrors = false;
    expect(component.newDrawingFileform.value.tags).toBeTruthy();
    spyOn(drawingFileService, 'addNewDrawingFile').and.callThrough();
    spyOn(component, 'onClose');
    await component.onSaveDrawFileServer();
    expect(component.onClose).toHaveBeenCalled();
  });

  it('should onSaveDrawFileServer', async () => {
    fixture.whenStable();
    component.isOnErrors = true;
    component.newDrawingFileform.removeControl('tags');
    spyOn(drawingFileService, 'addNewDrawingFile').and.callThrough();
    spyOn(component, 'onClose');
    component.newDrawingFileform.controls.name.setValue('as');
    await component.onSaveDrawFileServer();
    expect(component.onClose).toHaveBeenCalledTimes(0);
  });

  it('should onSaveDrawFileLocal', async () => {
    spyOn(drawingFileService, 'saveDrawingFileLocal');
    component.onSaveDrawFileLocal();
    expect(drawingFileService.saveDrawingFileLocal).toHaveBeenCalled();
  });

  it('should onSaveDrawFile', async () => {
    component.isSaveOnLocal = true;
    spyOn(component, 'onSwitch');
    spyOn(component, 'onSaveDrawFileLocal');
    spyOn(component, 'onSaveDrawFileServer');
    await component.onSaveDrawFile();
    expect(component.onSwitch).toHaveBeenCalled();
    expect(component.onSaveDrawFileLocal).toHaveBeenCalled();
    expect(component.onSaveDrawFileServer).toHaveBeenCalledTimes(0);
  });

  it('should onSaveDrawFile', async () => {
    component.isSaveOnLocal = false;
    spyOn(component, 'onSwitch');
    spyOn(component, 'onSaveDrawFileLocal');
    spyOn(component, 'onSaveDrawFileServer');
    await component.onSaveDrawFile();
    expect(component.onSwitch).toHaveBeenCalled();
    expect(component.onSaveDrawFileLocal).toHaveBeenCalledTimes(0);
    expect(component.onSaveDrawFileServer).toHaveBeenCalled();
  });

  it('should getTags', () => {
    component.onAddTags();
    expect(component.getTags().length).toEqual(1);
  });

  it('should onDeleteTags', () => {
    component.onAddTags();
    component.onDeleteTags(0);
    expect(component.getTags().length).toEqual(0);
  });

  it('should onClose', () => {
    spyOn(modalManagerService, 'onClose');
    component.onClose();
    expect(modalManagerService.onClose).toHaveBeenCalled();
  });

  it('should ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(modalManagerService.modalIsOpen).toBeFalsy();
  });

  it('should store when checked False', () => {
    const event: any = {
      target: {
        checked: false,
      },
    };
    spyOn(component.getTags(), 'enable');
    component.store(event);
    expect(component.isSaveOnLocal).toBeFalsy();
    expect(component.getTags().enable).toHaveBeenCalled();
  });

  it('should store when checked True', () => {
    const event: any = {
      target: {
        checked: true,
      },
    };
    spyOn(component.getTags(), 'disable');
    component.store(event);
    expect(component.isSaveOnLocal).toBeTruthy();
    expect(component.getTags().disable).toHaveBeenCalled();
  });

  it('should onSwitch()', () => {
    component.hide = false;
    component.onSwitch();
    expect(component.hide).toBeTruthy();
  });

});
