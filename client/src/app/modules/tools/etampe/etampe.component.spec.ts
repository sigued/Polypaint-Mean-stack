import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSliderModule } from '@angular/material';
import { Subject } from 'rxjs';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { EtampeService } from 'src/app/services/etampe.service';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { EtampeServiceStub } from 'src/app/stubs/etampeService.stub';
import { EtampeComponent } from './etampe.component';

describe('EtampeComponent', () => {
  let component: EtampeComponent;
  let fixture: ComponentFixture<EtampeComponent>;
  let stampeService: EtampeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtampeComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [MatSliderModule, ],
      providers: [{provide: EtampeService, useClass: EtampeServiceStub}, {provide: DrawpageService, useClass: DrawpageServiceStub}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    stampeService = TestBed.get(EtampeService);
    stampeService.rotationAngleSubject = new Subject<number>();
    stampeService.rotationAngleSubject.next(0);
    fixture = TestBed.createComponent(EtampeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngOnInit is called verify that setActive is called', () => {
    spyOn(stampeService, 'setActiveStamp');
    component.ngOnInit();
    expect(stampeService.setActiveStamp).toHaveBeenCalled();
  });

  it('when ngOnInit is called verify that onStampSelectionChange is called', () => {
    spyOn(component, 'onStampSelectionChange');
    component.ngOnInit();
    expect(component.onStampSelectionChange).toHaveBeenCalledWith(0);
  });

  it('when scaleChanged() is called should call stampService.setEchelle()', () => {
    spyOn(stampeService, 'setEchelle');
    component.scaleChanged(20);
    expect(stampeService.setEchelle).toHaveBeenCalled();
  });

  it('when rotationAngleChanged() is called should call stampService.setRotationAngle()', () => {
    spyOn(stampeService, 'setRotationAngle');
    component.rotationAngleChanged(20);
    expect(stampeService.setRotationAngle).toHaveBeenCalled();
  });

  it('when onStampSelectionChange() is called should call stampService.setActiveStamp()', () => {
    spyOn(stampeService, 'setActiveStamp');
    const expectedValue = 20;
    component.onStampSelectionChange(expectedValue);
    expect(stampeService.setActiveStamp).toHaveBeenCalled();
  });

  it('should set the angle at 360 or 0 if rotationAngleSubject exceeds the limits', () => {
    stampeService.rotationAngleSubject.next(720);
    expect(component.rotationAngle).toEqual(360);
    stampeService.rotationAngleSubject.next(-50);
    expect(component.rotationAngle).toEqual(0);
  });

});
