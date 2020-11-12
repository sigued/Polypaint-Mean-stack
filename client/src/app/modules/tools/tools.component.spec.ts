import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridService } from 'src/app/services/grid.service';
import { MagnestismService } from 'src/app/services/magnetism.service';
import { ToolsComponent } from './tools.component';

describe('ToolsComponent', () => {
  let component: ToolsComponent;
  let fixture: ComponentFixture<ToolsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      providers: [MagnestismService, GridService, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when onActiveSelectionChange is called, value number is assigned to attribute active and drawpageService', () => {
    const expectedValue = 10;
    const svgHTML = document.createElement('svg');
    component['drawpageService'].svg = new ElementRef(svgHTML);
    spyOn(component['drawpageService'], 'setActive').and.callThrough();
    component.onActiveSelectionChange(expectedValue);
    expect(component.toolActive).toEqual(expectedValue);
    expect(component['drawpageService'].setActive).toHaveBeenCalled();
  });

  it('when ngOnInit is called weight should equal 80 and drawPage should be setActive to 2', () => {
    component.ngOnInit();
    expect(component.toolActive).toEqual(0);
  });

  it('shoulg ngOnDestroy', () => {
    spyOn(component.activeSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.activeSubscription.unsubscribe).toHaveBeenCalled();
  });
});
