import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridService } from 'src/app/services/grid.service';
import { HandlerselectionService } from 'src/app/services/handlerselection.service';
import { MagnestismService } from 'src/app/services/magnetism.service';
import { HandlerselectionServiceStub } from 'src/app/stubs/handlerselectionService.stub';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let handler: HandlerselectionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      providers: [ MagnestismService, GridService, {provide: HandlerselectionService, useClass: HandlerselectionServiceStub}],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    handler = TestBed.get(HandlerselectionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    spyOn(handler, 'handleSelection');
    const index = 10;
    component.buttonClicked(index);
    expect(handler.handleSelection).toHaveBeenCalled();
  });

  it('should create', () => {
    spyOn(handler, 'selectAll');
    component.selectAll();
    expect(handler.selectAll).toHaveBeenCalled();
  });

});
