import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorService } from 'src/app/services/common/color.service';
import { DrawingZoneParametersService } from 'src/app/services/common/drawingZoneParameters.service';
import { ColorServiceStub } from 'src/app/stubs/colorService.stub';
import { DrawingZoneParametersServiceStub } from 'src/app/stubs/drawingZoneParametersService.stub';
import { ColorComponent } from './color.component';

describe('ColorComponent', () => {
  let component: ColorComponent;
  let fixture: ComponentFixture<ColorComponent>;
  let colorService: ColorService;
  let drawingZone: DrawingZoneParametersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      providers: [{ provide: ColorService, useClass: ColorServiceStub},
        {provide: DrawingZoneParametersService, useClass: DrawingZoneParametersServiceStub }, ],
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ColorComponent);
      component = fixture.componentInstance;
      colorService = TestBed.get(ColorService);
      drawingZone = TestBed.get(DrawingZoneParametersService);
      fixture.detectChanges();
      fixture.whenStable();
    });
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have active as 1', () => {
    expect(component.active).toEqual(1);
  });

  it('should have paletteIsUsing as Undefined', () => {
    expect(component.paletteIsUsing).toBeUndefined();
  });

  it('should onNotify', () => {
    const rgba = 'rgba(210,205,215,1)';
    spyOn(colorService, 'updateActiveColor');
    spyOn(component, 'getActiveColor').and.callThrough();
    component.onNotify(rgba);
    expect(component.paletteIsUsing).toBeFalsy();
    expect(component.getActiveColor).toHaveBeenCalled();
    expect(colorService.updateActiveColor).toHaveBeenCalled();
  });

  it('should onNotify', () => {
    const rgba = '0,205,215,1)';
    spyOn(colorService, 'updateActiveColor');
    spyOn(component, 'getActiveColor').and.callThrough();
    component.onNotify(rgba);
    expect(component.paletteIsUsing).toBeFalsy();
    expect(component.getActiveColor).toHaveBeenCalled();
    expect(colorService.updateActiveColor).toHaveBeenCalled();
  });

  it('should onNotify', () => {
    const rgba = '0,205,215,1)';
    component.active = 3;
    spyOn(drawingZone, 'setBackgroundColor');
    component.onNotify(rgba);
    expect(drawingZone.setBackgroundColor).toHaveBeenCalled();
  });

  it('when getActiveColor is called and active is equal to one, it should return primaryColor', () => {
    component.active = 1;
    component.primaryColor = 'white';
    expect(component.getActiveColor()).toEqual(component.primaryColor);
  });

  it('when getActiveColor is called and active is not equal to one, it should return secondColor', () => {
    component.active = 2;
    component.secondColor = 'white';
    expect(component.getActiveColor()).toEqual(component.secondColor);
  });

  it('should have primaryColorChange call isValidHex that returns true', () => {
    component.primaryColor = 'white';
    spyOn(colorService, 'setPrimaryColor');
    spyOn(component, 'isValidHex').and.returnValue(true);
    component.primaryColorChange();
    expect(colorService.setPrimaryColor).toHaveBeenCalledWith('white');
  });

  it('should have primaryColorChange call isValidHex that returns false windows alert should be called', () => {
    spyOn(window, 'alert');
    spyOn(component, 'isValidHex').and.returnValue(false);
    component.primaryColorChange();
    expect(window.alert).toHaveBeenCalledWith('Invalid Color');
  });

  it('should have primaryColorChange call isValidHex that returns false primary color should be set', () => {
    spyOn(component, 'isValidHex').and.returnValue(false);
    component.primaryColorChange();
    expect(component.primaryColor).toEqual('rgb(155,150,155)');
  });

  it('when openPalette is called paletteIsUsing should return true', () => {
    component.openPalette();
    expect(component.paletteIsUsing).toBeTruthy();
  });

  it('should have secondColorChange call isValidHex that returns true', () => {
    component.secondColor = 'white';
    spyOn(colorService, 'setSecondColor');
    spyOn(component, 'isValidHex').and.returnValue(true);
    component.secondColorChange();
    expect(colorService.setSecondColor).toHaveBeenCalledWith('white');
  });

  it('should have secondColorChange call isValidHex that returns false windows alert should be called', () => {
    spyOn(window, 'alert');
    spyOn(component, 'isValidHex').and.returnValue(false);
    component.secondColorChange();
    expect(window.alert).toHaveBeenCalledWith('Invalid Color');
  });

  it('should have secondColorChange call isValidHex that returns false second color should be set', () => {
    spyOn(component, 'isValidHex').and.returnValue(false);
    component.secondColorChange();
    expect(component.secondColor).toEqual('rgb(155,150,155)');
  });

  it('should have onactiveSelectionChange, value number is assigned to attribute active and colorService', () => {
    const expectedValue = 10;
    spyOn(colorService, 'setActive');
    component.onActiveSelectionChange(expectedValue);
    expect(component.active).toEqual(expectedValue);
    expect(colorService.setActive).toHaveBeenCalled();
  });

  it('should have setColorFromLastSelectedColor', () => {
    const color = 'white';
    component.active = 1;
    spyOn(colorService, 'updateActiveColor');
    component.setColorFromLastSelectedColor(color);
    expect(colorService.updateActiveColor).toHaveBeenCalledWith(1, 'white', 1);
  });

  it('when swapColor is called', () => {
    component.primaryColor = 'white';
    component.secondColor = 'white';
    component.swapColor();
    expect(component.primaryColor).toEqual('white');
    expect(component.secondColor).toEqual('white');
  });

  it('shoud have isValidHex return false if input is null', () => {
    const color: any = '';
    component.isValidHex(color);
    expect(component.isValidHex(color)).toEqual(/^[0-9A-F]{3}$/i.test(color));
  });

  it('it should isValidHex when color is a string length 4', () => {
    const color = '#123';
    component.isValidHex(color);
    expect(component.isValidHex(color)).toEqual(/^[0-9A-F]{3}$/i.test('123'));
  });

  it('it should isValidHex when color is a string length 4', () => {
    const color = '123';
    component.isValidHex(color);
    expect(component.isValidHex(color)).toEqual(/^[0-9A-F]{3}$/i.test('123'));
  });

  it('it should isValidHex when color is a string length 7', () => {
    const color = '#123456';
    component.isValidHex(color);
    expect(component.isValidHex(color)).toEqual(/^[0-9A-F]{6}$/i.test('123456'));
  });

  it('it should isValidHex when color is a string length 9', () => {
    const color = '#12345678';
    component.isValidHex(color);
    expect(component.isValidHex(color)).toEqual(/^[0-9A-F]{8}$/i.test('12345678'));
  });

  it('it should isValidHex when color is a string length 2', () => {
    const color = '#2';
    component.isValidHex(color);
    expect(component.isValidHex(color)).toBeFalsy();
  });

});
