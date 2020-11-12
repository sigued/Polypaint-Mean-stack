import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPickerComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call when opacity changed with valid color', () => {
    component.color = 'rgba(100, 100, 100, 1)';
    component.opacity = 50;
    component.opacityChanged();
    expect(component.color).toEqual('rgba(100, 100, 100,0.5)');
   });
});
