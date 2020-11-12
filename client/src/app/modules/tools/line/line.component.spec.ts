import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSliderModule } from '@angular/material';
import { GridService } from 'src/app/services/grid.service';
import { LineService } from 'src/app/services/line.service';
import { MagnestismService } from 'src/app/services/magnetism.service';
import { LineServiceStub } from 'src/app/stubs/lineService.stub';
import { LineComponent } from './line.component';

describe('LineComponent', () => {
  let component: LineComponent;
  let fixture: ComponentFixture<LineComponent>;
  let service: LineService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [MatSliderModule, ],
      providers: [ MagnestismService, GridService, LineComponent, {provide: LineService, useClass: LineServiceStub}, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineComponent);
    service = TestBed.get(LineService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when junctionTypeChanged is called', () => {
    spyOn(service, 'setJunctionType').and.callThrough();
    const value = 2;
    component.junctionTypeChanged(value);
    expect(component.junctionType).toEqual(value);
    expect(service.setJunctionType).toHaveBeenCalled();
  });

  it('when diameterChanged is called', () => {
    spyOn(service, 'setJunctionDiametre').and.callThrough();
    component.diameterChanged();
    expect(service.setJunctionDiametre).toHaveBeenCalled();
  });

  it('when dashedLineChanged is called', () => {
    spyOn(service, 'setDashed').and.callThrough();
    const value = 2;
    component.dashedLineChanged(value);
    expect(component.dashedLine).toEqual(value);
    expect(service.setDashed).toHaveBeenCalled();
  });

  it('when widthChanged is called', () => {
    spyOn(service, 'setWidth').and.callThrough();
    component.widthChanged = '20';
    expect(service.setWidth).toHaveBeenCalled();
  });

});
