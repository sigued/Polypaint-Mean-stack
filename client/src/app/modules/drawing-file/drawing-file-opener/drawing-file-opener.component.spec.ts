import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgElement } from 'src/app/entity/svgElement';
import { DrawingFile } from 'src/app/model/drawingFile.model';
import { DrawingFileService } from 'src/app/services/common/drawingFile.service';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { DrawingFileServiceStub } from 'src/app/stubs/drawingFileService.stub';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { ModalManagerServiceStub } from 'src/app/stubs/modalManagerService.stub';
import { SafeHtmlPipe } from '../safeHtml.pipe';
import { DrawingFileOpenerComponent } from './drawing-file-opener.component';

describe('DrawingFileOpenerComponent', () => {
  let component: DrawingFileOpenerComponent;
  let fixture: ComponentFixture<DrawingFileOpenerComponent>;
  let drawingFileService: DrawingFileService;
  let modalManagerService: ModalManagerService;
  let drawpageService: DrawpageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SafeHtmlPipe, DrawingFileOpenerComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: DrawingFileService, useClass: DrawingFileServiceStub},
        {provide: ModalManagerService, useClass: ModalManagerServiceStub}, {provide: DrawpageService, useClass: DrawpageServiceStub}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingFileOpenerComponent);
    component = fixture.componentInstance;
    drawingFileService = TestBed.get(DrawingFileService);
    modalManagerService = TestBed.get(ModalManagerService);
    drawpageService = TestBed.get(DrawpageService);
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should onFileChange with good event', () => {
    spyOn(component.drawingFileform.controls.fileName, 'setValue');
    const blob = new Blob(['dfdf', 'dfdf'], {type: 'plain/text'});
    const event: any = {
      target: {
        files: [blob],
      },
    };
    component.onFileChange(event);
    expect(component.drawingFileform.controls.fileName.setValue).toHaveBeenCalled();
  });

  it('should onFileChange with unproper event', () => {
    spyOn(component.drawingFileform, 'patchValue');
    const event: any = {
      target: {
        checked: false,
      },
    };
    component.onFileChange(event);
    expect(component.drawingFileform.patchValue).toHaveBeenCalledTimes(0);
  });

  it('should onSubmit with is onErrorsLocal false', () => {
    spyOn(component, 'open');
    spyOn(drawingFileService, 'validateDrawing').and.returnValue(true);
    const elemet: SvgElement[] = [];
    const testelement = JSON.stringify(elemet);
    const test = 'testendofouterhtml' + testelement;
    component.drawingFileform.controls.file.setValue(test);
    component.drawingFileform.controls.fileName.setValue('test');
    component.onSubmit();
    expect(component.open).toHaveBeenCalled();
  });

  it('should onSubmit with is onErrorsLocal true', () => {
    spyOn(component, 'open');
    spyOn(drawingFileService, 'validateDrawing').and.returnValue(false);
    component.drawingFileform.controls.file.setValue('test');
    component.drawingFileform.controls.fileName.setValue('test');
    component.onSubmit();
    expect(component.open).toHaveBeenCalledTimes(0);
  });

  it('should not opening file with with window confirm false', () => {
    const dummyDrawingFile: DrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
    };
    drawpageService.isEmpty = false;
    spyOn(window, 'confirm').and.returnValues(false);
    spyOn(component, 'onClose');
    component.open(dummyDrawingFile);
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(component.onClose).toHaveBeenCalledTimes(0);
  });

  it('should not open file with first confirm window true and second one false', () => {
    const dummyDrawingFile: DrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
    };
    drawpageService.isEmpty = false;
    spyOn(window, 'confirm').and.returnValues(true, false);
    spyOn(component, 'onClose');
    component.open(dummyDrawingFile);
    expect(window.confirm).toHaveBeenCalledTimes(2);
    expect(component.onClose).toHaveBeenCalledTimes(0);
  });

  it('should open file with window confirm true then true', () => {
    const dummyDrawingFile: DrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
    };
    drawpageService.isEmpty = false;
    spyOn(window, 'confirm').and.returnValues(true, true);
    spyOn(component, 'onClose');
    spyOn(drawpageService, 'cleanSVG');
    component.open(dummyDrawingFile);
    expect(window.confirm).toHaveBeenCalledTimes(2);
    expect(drawpageService.cleanSVG).toHaveBeenCalled();
    expect(component.onClose).toHaveBeenCalled();
  });

  it('should not open file with drawpage is empty true', () => {
    const dummyDrawingFile: DrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
    };
    drawpageService.isEmpty = true;
    spyOn(window, 'confirm').and.returnValue(true);
    component.open(dummyDrawingFile);
    expect(window.confirm).toHaveBeenCalledTimes(1);
  });

  it('should remove', () => {

    const dummyDrawingFile: DrawingFile = {
      id: '1',
      name: 'testing Angular',
      outerHtml: 'Hello World',
      tags: [],
      elementTab: [],
    };
    spyOn(drawingFileService, 'deleteDrawingFile');
    component.remove(dummyDrawingFile);
    expect(drawingFileService.deleteDrawingFile).toHaveBeenCalledWith(dummyDrawingFile);
  });

  it('should applyFilter', () => {
    fixture.whenStable();
    const dummyDrawingFile = 'testing Angular';
    spyOnProperty(component.dataSource, 'paginator').and.returnValue(true);
    spyOn(component.paginator, 'firstPage');
    component.ngOnInit();
    component.applyFilter(dummyDrawingFile);
    expect(component.paginator.firstPage).toHaveBeenCalled();
  });

  it('should applyFilter', () => {
    fixture.whenStable();
    const dummyDrawingFile = 'testing Angular';
    spyOn(component.paginator, 'firstPage');
    component.ngOnInit();
    spyOnProperty(component.dataSource, 'paginator').and.returnValue(false);
    component.applyFilter(dummyDrawingFile);
    expect(component.paginator.firstPage).toHaveBeenCalledTimes(0);
  });

  it('should close', () => {
    spyOn(modalManagerService, 'onClose');
    component.onClose();
    expect(modalManagerService.onClose).toHaveBeenCalled();
  });

  it('should Ondestroy', () => {
    spyOn(drawingFileService, 'getAllDrawingFiles');
    spyOn(component.drawingFileServiceSubscription, 'unsubscribe');
    spyOn(component.isOnErrorsSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(drawingFileService.getAllDrawingFiles).toHaveBeenCalled();
    expect(component.drawingFileServiceSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.isOnErrorsSubscription.unsubscribe).toHaveBeenCalled();
  });

});
