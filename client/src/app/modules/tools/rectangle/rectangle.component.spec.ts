import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSliderModule } from '@angular/material';
import { RectangleService } from 'src/app/services/rectangle.service';
import { RectangleServiceStub } from 'src/app/stubs/rectangleService.stub';
import { RectangleComponent } from './rectangle.component';

describe('RectangleComponent', () => {
  let component: RectangleComponent;
  let fixture: ComponentFixture<RectangleComponent>;
  let rectangleService: RectangleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectangleComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [MatSliderModule, ],
      providers: [{ provide: RectangleService, useClass: RectangleServiceStub}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleComponent);
    component = fixture.componentInstance;
    rectangleService =  TestBed.get(RectangleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.typeRef).toEqual(0);
    expect(component.weight).toEqual(1);
  });

  it('should widthChanged', () => {
    spyOn(rectangleService, 'setWeight');
    component.widthChanged = 20;
    expect(rectangleService.setWeight).toHaveBeenCalled();
  });

  it('should onTypeSelectionChange', () => {
    spyOn(rectangleService, 'setType');
    component.onTypeSelectionChange(5);
    expect(rectangleService.setType).toHaveBeenCalled();
  });

});
