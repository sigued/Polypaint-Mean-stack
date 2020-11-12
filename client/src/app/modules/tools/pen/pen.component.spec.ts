import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSliderModule } from '@angular/material';
import { PenService } from 'src/app/services/pen.service';
import { PenServiceStub } from 'src/app/stubs/penService.stub';
import { PenComponent } from './pen.component';

describe('PenComponent', () => {
  let component: PenComponent;
  let fixture: ComponentFixture<PenComponent>;
  let service: PenService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [MatSliderModule, ],
      providers: [ PenComponent, {provide: PenService, useClass: PenServiceStub}, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenComponent);
    service = TestBed.get(PenService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.minValue).toEqual(1);
    expect(component.maxValue).toEqual(10);
  });

  it('when minValueChanged is called it should called penService setMinWidth', () => {
    spyOn(service, 'setMinWidth').and.callThrough();
    component.minValueChanged();
    expect(service.setMinWidth).toHaveBeenCalled();
  });

  it('when minValueChanged is called it should called penService setMaxWidth', () => {
    spyOn(service, 'setMaxWidth').and.callThrough();
    component.maxValueChanged();
    expect(service.setMaxWidth).toHaveBeenCalled();
  });

});
