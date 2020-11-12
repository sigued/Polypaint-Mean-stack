import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridService } from 'src/app/services/grid.service';
import { GridServiceStub } from 'src/app/stubs/gridService.stub';
import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let gridService: GridService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [ {provide: GridService, useClass: GridServiceStub}],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    gridService = TestBed.get(GridService);
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngOnInit is called verify attribute value', () => {
    component['gridService'].width = 10;
    component['gridService'].height = 10;
    component['gridService'].opacity = 5;
    component.ngOnInit();
    expect(component.width).toEqual(10);
    expect(component.height).toEqual(10);
    expect(component.opacity).toEqual(5);
  });

  it('when triggerResizeHeight is called verify that gridService setHeight is called', () => {
    spyOn(gridService, 'setHeight').and.callThrough();
    component.triggerResizeHeight();
    expect(gridService.setHeight).toHaveBeenCalled();
  });

  it('when opacityChanged is called verify setOpacity is called', () => {
    gridService.checked = true;
    component.height = 20;
    component.width = 20;
    spyOn(gridService, 'setOpacity').and.callThrough();
    component.opacityChanged = 20;
    expect(gridService.setOpacity).toHaveBeenCalled();
  });

  it('when triggerResizeWidth is called verify that gridService setWidth is called', () => {
    spyOn(gridService, 'setWidth').and.callThrough();
    component.triggerResizeWidth();
    expect(gridService.setWidth).toHaveBeenCalled();
  });

  it('when onCheck is true', () => {
    gridService.checked = true;
    spyOn(gridService, 'setWidth').and.callThrough();
    spyOn(gridService, 'setHeight').and.callThrough();
    const event: any = {
      target: {
        checked: true,
      },
    };
    component.onCheck(event);
    expect(gridService.setWidth).toHaveBeenCalled();
    expect(gridService.setHeight).toHaveBeenCalled();
  });

  it('when onCheck is false', () => {
    gridService.checked = false;
    spyOn(gridService, 'setWidth').and.callThrough();
    spyOn(gridService, 'setHeight').and.callThrough();
    const event: any = {
       target: {
         checked: false,
       },
     };
    component.onCheck(event);
    expect(gridService.setWidth).toHaveBeenCalled();
    expect(gridService.setHeight).toHaveBeenCalled();
  });

  it('should getActivationStatus', () => {
    expect(component.getActivationStatus()).toEqual(gridService.checked);
  });

});
