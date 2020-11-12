import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSliderModule } from '@angular/material';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { EllipseService } from 'src/app/services/ellipse.service';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { EllipseComponent } from './ellipse.component';

describe('EllipseComponent', () => {
  let component: EllipseComponent;
  let fixture: ComponentFixture<EllipseComponent>;
  let ellipseService: EllipseService;
  let drawpageService: DrawpageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EllipseComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [MatSliderModule, ],
      providers: [EllipseService, {provide: DrawpageService, useClass: DrawpageServiceStub}, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipseComponent);
    component = fixture.componentInstance;
    ellipseService = TestBed.get(EllipseService);
    drawpageService = TestBed.get(DrawpageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngOnInit is called verify that setActive is called', () => {
    spyOn(drawpageService, 'setActive');
    component.ngOnInit();
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('when onTypeSelectionChange is called it sets the typeRef', () => {
    const expectedValue = 5;
    component.onTypeSelectionChange(expectedValue);
    expect(component.typeRef).toEqual(expectedValue);
  });

  it('when onTypeSelectionChange is called ellipseService.setType() is called', () => {
    spyOn(ellipseService, 'setType');
    const typeRef = 5;
    component.onTypeSelectionChange(typeRef);
    expect(ellipseService.setType).toHaveBeenCalledWith(typeRef);
  });

  it('when widthChanged is called ellipseService.setWidth() is called', () => {
    spyOn(ellipseService, 'setWeight');
    const expectedValue = component.weight;
    component.widthChanged = 1;
    expect(ellipseService.setWeight).toHaveBeenCalledWith(expectedValue.toString());
  });

});
