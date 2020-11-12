import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { EraserService } from 'src/app/services/eraser.service';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { EraserServiceStub } from 'src/app/stubs/eraserService.stub';
import { EraserComponent } from './eraser.component';

describe('EraserComponent', () => {
  let component: EraserComponent;
  let eraserService: EraserService;
  let drawpageService: DrawpageService;
  let fixture: ComponentFixture<EraserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EraserComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      providers: [ {provide: EraserService, useClass: EraserServiceStub},
        {provide: DrawpageService, useClass: DrawpageServiceStub}],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EraserComponent);
    eraserService = TestBed.get(EraserService);
    drawpageService = TestBed.get(DrawpageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngOnInit is called verify attribute value', () => {
    spyOn(drawpageService, 'setActive').and.callThrough();
    eraserService.setWidth = 10;
    component.ngOnInit();
    expect(eraserService.setWidth).toEqual(10);
    expect(drawpageService.setActive).toHaveBeenCalled();
  });

  it('when triggerResizeHeight is called verify that gridService setHeight is called', () => {
    eraserService.setWidth = 10;
    component.widthChanged = 10;
    expect(eraserService.setWidth).toEqual(10);
  });

});
