import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSliderModule } from '@angular/material';
import { DEFAULT_FEATHER_WIDTH, STRAIGHT_ANGLE } from 'src/app/constant';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { PlumeService } from 'src/app/services/plume.service';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { PlumeServiceStub } from 'src/app/stubs/plumeService.stub';
import { PlumeComponent } from './plume.component';

describe('PlumeComponent', () => {
  let component: PlumeComponent;
  let plumeService: PlumeService;
  let fixture: ComponentFixture<PlumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlumeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [MatSliderModule, ],
      providers: [ {provide: PlumeService, useClass: PlumeServiceStub},
        {provide: DrawpageService, useClass: DrawpageServiceStub}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlumeComponent);
    plumeService = TestBed.get(PlumeService);
    // drawpageService = TestBed.get(DrawpageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngOnInit is called', () => {
    spyOn(plumeService.rotationAngleSubject, 'subscribe');
    component.ngOnInit();
    expect(component.width).toEqual(DEFAULT_FEATHER_WIDTH);
    expect(component.rotationAngle).toEqual(STRAIGHT_ANGLE);
    expect(plumeService.rotationAngleSubject.subscribe).toHaveBeenCalled();
  });

  it('should change the width', () => {
    spyOn(plumeService, 'setWidth');
    component.width = 10;
    component.widthChanged();
    expect(plumeService.setWidth).toHaveBeenCalled();
  });

  it('should change the angle', () => {
    spyOn(plumeService, 'setRotationAngle');
    component.rotationAngle = 60;
    component.rotationAngleChanged();
    expect(plumeService.setRotationAngle).toHaveBeenCalled();
  });
});
