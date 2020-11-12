import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSliderModule } from '@angular/material';
import { PolygonComponent } from './polygon.component';

describe('PolygonComponent', () => {
  let component: PolygonComponent;
  let fixture: ComponentFixture<PolygonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygonComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [MatSliderModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when widthChanged is called it should called polygoneService setWeight', () => {
    const spy = spyOnProperty(component['polygoneService'], 'setWeight', 'set');
    component.widthChanged = 20;
    expect(spy).toHaveBeenCalled();
  });

  it('when nbSideChanged is called it should called polygoneService setNbSide', () => {
    const spy = spyOnProperty(component['polygoneService'], 'setNbSide', 'set');
    component.nbSideChanged();
    expect(spy).toHaveBeenCalled();
  });

  it('when typeChanged is called it should called polygoneService setType', () => {
    const spy = spyOnProperty(component['polygoneService'], 'setType', 'set');
    component.typeChanged(0);
    expect(spy).toHaveBeenCalled();
  });
});
