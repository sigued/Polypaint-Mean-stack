import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSliderModule } from '@angular/material';
import { SprayComponent } from './spray.component';

describe('SprayComponent', () => {
  let component: SprayComponent;
  let fixture: ComponentFixture<SprayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprayComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [MatSliderModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the radius', () => {
    const spy = spyOnProperty(component['sprayService'], 'setRadius', 'set');
    component.radiusChanged = 30;
    expect(spy).toHaveBeenCalled();
  });

  it('should set the quantity', () => {
    const spy = spyOnProperty(component['sprayService'], 'setQuantity', 'set');
    component.quantityChanged = 20;
    expect(spy).toHaveBeenCalled();
  });
});
