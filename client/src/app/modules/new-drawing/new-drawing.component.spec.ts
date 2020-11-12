import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material';
import { DrawingZoneParametersService } from 'src/app/services/common/drawingZoneParameters.service';
import { ModalManagerService } from 'src/app/services/common/modalManager.service';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { ModalManagerServiceStub } from 'src/app/stubs/modalManagerService.stub';
import { NewDrawingComponent } from './new-drawing.component';

describe('NewDrawingComponent', () => {
  let component: NewDrawingComponent;
  let fixture: ComponentFixture<NewDrawingComponent>;
  let drawpageService: DrawpageService;
  let modalManagerService: ModalManagerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDrawingComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
      ],
      providers: [DrawingZoneParametersService, MatDialog, Overlay, {provide: DrawpageService, useClass: DrawpageServiceStub},
        {provide: ModalManagerService, useClass: ModalManagerServiceStub}],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrawingComponent);
    component = fixture.componentInstance;
    drawpageService = TestBed.get(DrawpageService);
    modalManagerService = TestBed.get(ModalManagerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngOnInit is called verify that initForm is called', () => {
    spyOn(component, 'initForm').and.callThrough();
    component.ngOnInit();
    expect(component.initForm).toHaveBeenCalled();
  });

  it('when onNotify is called, color value and newDrawingForm should have new color valeur', () => {
    const rgba = 'rgba(255,255,255,1)';
    expect(component.color).toEqual('rgba(255,255,255,1)');
    component.onNotify(rgba);
    expect(component.newDrawingform.controls['backgroundColor'].value).toEqual('rgba(255,255,255,1)');
  });

  it('when newdrawing form invalid', () => {
    component.ngOnInit();
    expect(component.newDrawingform.valid).toBeTruthy();
  });

  it('when onCheck is false', () => {
    spyOn(component.newDrawingform.controls.backgroundColor, 'enable').and.callThrough();
    spyOn(component.newDrawingform.controls.backgroundColorHexa, 'setValidators').and.callThrough();
    spyOn(component.newDrawingform.controls.backgroundColorHexa, 'updateValueAndValidity').and.callThrough();
    const event: any = {
      target: {
        checked: false,
      },
    };
    component.onCheck(event);
    expect(component.newDrawingform.controls.backgroundColor.enable).toHaveBeenCalled();
    expect(component.newDrawingform.controls.backgroundColorHexa.setValidators).toHaveBeenCalled();
    expect(component.newDrawingform.controls.backgroundColorHexa.updateValueAndValidity).toHaveBeenCalled();
  });

  it('when onCheck is true', () => {
    spyOn(component.newDrawingform.controls.backgroundColor, 'disable').and.callThrough();
    spyOn(component.newDrawingform.controls.backgroundColorHexa, 'setValidators').and.callThrough();
    spyOn(component.newDrawingform.controls.backgroundColorHexa, 'updateValueAndValidity').and.callThrough();
    const event: any = {
      target: {
        checked: true,
      },
    };
    component.onCheck(event);
    expect(component.newDrawingform.controls.backgroundColor.disable).toHaveBeenCalled();
    expect(component.newDrawingform.controls.backgroundColorHexa.setValidators).toHaveBeenCalled();
    expect(component.newDrawingform.controls.backgroundColorHexa.updateValueAndValidity).toHaveBeenCalled();
  });

  it('when convertHEXtoRGBA is called and hexa.charAt(0) != #', () => {
    const hexa = '1234567';
    const rPart: number = parseInt(hexa.substring(0, 2), 16);
    const gPart: number = parseInt(hexa.substring(2, 4), 16);
    const bPart: number = parseInt(hexa.substring(4, 6), 16);
    component.convertHEXtoRGBA(hexa);
    expect(component.color).toEqual(`rgba(${rPart},${gPart},${bPart}, 1)`);
  });

  it('when convertHEXtoRGBA is called and hexa.charAt(0) = #', () => {
    const hexa = '#1234567';
    const rPart: number = parseInt(hexa.substring(1, 3), 16);
    const gPart: number = parseInt(hexa.substring(3, 5), 16);
    const bPart: number = parseInt(hexa.substring(5, 7), 16);
    component.convertHEXtoRGBA(hexa);
    expect(component.color).toEqual(`rgba(${rPart},${gPart},${bPart}, 1)`);
  });

  it('when onSubmitForm is called', () => {
    spyOn(component.newDrawingform.controls['backgroundColorHexa'], 'setValidators').and.callThrough();
    spyOn(component.drawingZoneParametersService, 'setDrawingZoneParameters').and.callThrough();
    spyOn(drawpageService, 'cleanSVG').and.callThrough();
    spyOn(component, 'onClose');
    drawpageService.isEmpty = true;
    component.onSubmitForm();
    expect(drawpageService.cleanSVG).toHaveBeenCalled();
    expect(component.drawingZoneParametersService.setDrawingZoneParameters).toHaveBeenCalled();
    expect(component.onClose).toHaveBeenCalled();
  });

  it('when onSubmitForm is called with isChecked is true', () => {
    component.hexIsChecked = true;
    drawpageService.isEmpty = true;
    spyOn(component.newDrawingform.controls['backgroundColorHexa'], 'setValidators').and.callThrough();
    spyOn(component.drawingZoneParametersService, 'setDrawingZoneParameters').and.callThrough();
    spyOn(component, 'convertHEXtoRGBA').and.callThrough();
    component.onSubmitForm();
    expect(component.convertHEXtoRGBA).toHaveBeenCalled();
    expect(component.drawingZoneParametersService.setDrawingZoneParameters).toHaveBeenCalled();
  });

  it('when onSubmitForm is called with isEmpty is false', () => {
    drawpageService.isEmpty = false;
    spyOn(window, 'confirm').and.returnValue(false);
    component.onSubmitForm();
    expect(window.confirm).toHaveBeenCalled();
  });

  it('should onclose', () => {
    spyOn(modalManagerService, 'onClose');
    component.onClose();
    expect(modalManagerService.onClose).toHaveBeenCalledWith();
  });

  it('should get backgroundColorHexaError', () => {

    expect(component.backgroundColorHexaError).toBe(component.newDrawingform.controls.backgroundColorHexa.errors);

  });

  it('should onResize height', () => {
    spyOn(component.newDrawingform.controls.height, 'setValue');
    component.onResize();
    expect(component.newDrawingform.controls.height.setValue).toHaveBeenCalled();
  });

  it('should not onResize height', () => {
    fixture.whenStable();
    component.newDrawingform.controls.height.markAsDirty();
    spyOn(component.newDrawingform.controls.height, 'setValue');
    component.onResize();
    expect(component.newDrawingform.controls.height.setValue).toHaveBeenCalledTimes(0);
  });

  it('should onResize width', () => {
    spyOn(component.newDrawingform.controls.width, 'setValue');
    component.onResize();
    expect(component.newDrawingform.controls.width.setValue).toHaveBeenCalled();
  });

  it('should not onResize width', () => {
    fixture.whenStable();
    component.newDrawingform.controls.width.markAsDirty();
    spyOn(component.newDrawingform.controls.width, 'setValue');
    component.onResize();
    expect(component.newDrawingform.controls.width.setValue).toHaveBeenCalledTimes(0);
  });
});
