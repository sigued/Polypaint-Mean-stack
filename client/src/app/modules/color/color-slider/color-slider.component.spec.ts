import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ColorSliderComponent } from './color-slider.component';

describe('ColorSliderComponent', () => {
  let component: ColorSliderComponent;
  let fixture: ComponentFixture<ColorSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorSliderComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When generateSlider is called, a canvas filled with color stops is created', () => {
    const xCoord = 45;
    const yCoord =  245;
    const marron = 'rgba(0,0,0,1)';
    component['selectedColor'] = 0;
    component.generateSlider();
    expect(component.getRGBA(xCoord, yCoord)).toEqual(marron);
  });

  it('When generateSlider is called, with selectedColor = true', () => {
    const xCoord = 45;
    const yCoord =  245;
    const marron = 'rgba(0,0,0,1)';

    component['selectedColor'] = 1;
    spyOn(component['ctx'], 'beginPath');
    spyOn(component['ctx'], 'rect');
    spyOn(component['ctx'], 'stroke');
    spyOn(component['ctx'], 'closePath');
    spyOn(component['ctx'], 'clearRect');
    spyOn(component['ctx'], 'createLinearGradient');
    spyOn(component['ctx'], 'fill');
    component.generateSlider();
    expect(component['ctx'].beginPath).toHaveBeenCalledTimes(2);
    expect(component['ctx'].strokeStyle).toEqual('#000000');
    expect(component['ctx'].lineWidth).toEqual(2);
    expect(component['ctx'].rect).toHaveBeenCalled();
    expect(component['ctx'].stroke).toHaveBeenCalled();
    expect(component['ctx'].closePath).toHaveBeenCalledTimes(2);
    expect(component['ctx'].clearRect).toHaveBeenCalled();
    expect(component['ctx'].createLinearGradient).toHaveBeenCalled();
    expect(component['ctx'].fill).toHaveBeenCalled();
    expect(component.getRGBA(xCoord, yCoord)).toEqual(marron);
  });

  it('When generateSlider is called, a canvas filled with color stops is created', () => {
    const xCoord = 45;
    const yCoord =  245;
    const marron = 'rgba(0,0,0,1)';
    component.generateSlider();
    expect(component.getRGBA(xCoord, yCoord)).toEqual(marron);
  });

  it('onMouseUp the value of isDown property should be false', () => {
    const initialMouseEvent = false;
    component.onMouseUp('mouseup');
    const newMouseEvent = component['isDown'];
    expect(newMouseEvent).toEqual(initialMouseEvent);
  });

  it('onMouseDown the value of isDown property should be true', () => {
    spyOn(component, 'generateSlider');
    spyOn(component, 'emitColor');
    component.onMouseDown('mousedown');
    expect(component['isDown']).toBe(true);
    expect(component.generateSlider).toHaveBeenCalled();
    expect(component.emitColor).toHaveBeenCalled();
  });

  it('onMouseMove when the value of isDown is true', () => {
    component['isDown'] = true;
    spyOn(component, 'generateSlider');
    spyOn(component, 'emitColor');
    component.onMouseMove('mousemove');
    expect(component.generateSlider).toHaveBeenCalled();
    expect(component.emitColor).toHaveBeenCalled();
  });

  it('onMouseMove when the value of isDown is false', () => {
    component['isDown'] = false;
    spyOn(component, 'generateSlider');
    spyOn(component, 'emitColor');
    component.onMouseMove('mousemove');
    expect(component.generateSlider).not.toHaveBeenCalled();
    expect(component.emitColor).not.toHaveBeenCalled();
  });

  it('emitColor, the output value emitted should match the color selected', () => {
    spyOn(component.color, 'emit');
    const xCoord = 45;
    const yCoord =  245;
    const marron = 'rgba(0,0,0,1)';
    component.emitColor(xCoord, yCoord);
    expect(component.color.emit).toHaveBeenCalledWith(marron);
  });

  it('getRGBA should return an RGBA code', () => {
    spyOn(component.color, 'emit');
    const xCoord = 45;
    const yCoord =  245;
    const marron = 'rgba(0,0,0,1)';
    expect(component.getRGBA(xCoord, yCoord)).toEqual(marron);
  });

});
