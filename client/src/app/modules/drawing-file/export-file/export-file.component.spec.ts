import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Point } from 'src/app/entity/point';
import { SvgElement } from 'src/app/entity/svgElement';
import { FORMAT_ARRAY } from 'src/app/entity/tool/toolList';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { ExportFileService } from 'src/app/services/export-file.service';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { ExportFileServiceStub } from 'src/app/stubs/exportFileService.stub';
import { ModalManagerServiceStub } from 'src/app/stubs/modalManagerService.stub';
import { ExportFileComponent } from './export-file.component';

describe('ExportFileComponent', () => {
  let component: ExportFileComponent;
  let fixture: ComponentFixture<ExportFileComponent>;
  let service: ExportFileService;
  let modalManagerService: ModalManagerService;
  let drawpageService: DrawpageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportFileComponent, ],
      providers: [ {provide: ExportFileService, useClass: ExportFileServiceStub},
        {provide: ModalManagerService, useClass: ModalManagerServiceStub}, {provide: DrawpageService, useClass: DrawpageServiceStub},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportFileComponent);
    service = TestBed.get(ExportFileService);
    modalManagerService = TestBed.get(ModalManagerService);
    drawpageService = TestBed.get(DrawpageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngOnDestroy is called', () => {
    component.ngOnDestroy();
    expect(modalManagerService.modalIsOpen).toBeFalsy();
  });

  it('when ngOnInit is called', () => {
    component.ngOnInit();
    expect(component.hide).toBeFalsy();
    expect(component.formatTypeArray).toEqual(FORMAT_ARRAY);
  });

  it('when exportFile is called', () => {
    spyOn(service, 'loadImage').and.callThrough();
    spyOn(component, 'onClose').and.callThrough();
    component.exportFile();
    expect(service.loadImage).toHaveBeenCalled();
    expect(component.onClose).toHaveBeenCalled();
  });

  it('when onClose is called', () => {
    spyOn(modalManagerService, 'onClose').and.callThrough();
    component.onClose();
    expect(modalManagerService.onClose).toHaveBeenCalled();
  });

  it('when toggle is called', () => {
    component.hide = true;
    component.toggle();
    expect(component.hide).toBeFalsy();
  });

  it('when onFormatSelectionChanged is called', () => {
    const value = 2;
    component.onFormatSelectionChange(value);
    expect(component.format).toEqual(value);
  });

  it('when drawingExist is called', () => {
    expect(component.drawingExist()).toBeFalsy();
  });

  it('when drawingExist is called', () => {
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    const sgvElement = new SvgElement(1, new Point(0, 0), new Point(0, 0), 0, 0, svg);
    drawpageService.elementTab = [sgvElement];
    expect(component.drawingExist()).toBeTruthy();
  });

});
