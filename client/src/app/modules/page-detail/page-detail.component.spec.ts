import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Point } from 'src/app/entity/point';
import { DrawingZoneParameters } from 'src/app/model/drawingZoneParameters.model';
import { ColorService } from 'src/app/services/common/color.service';
import { DrawingZoneParametersService } from 'src/app/services/common/drawingZoneParameters.service';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { GridService } from 'src/app/services/grid.service';
import { MagnestismService } from 'src/app/services/magnetism.service';
import { ColorServiceStub } from 'src/app/stubs/colorService.stub';
import { DrawingZoneParametersServiceStub } from 'src/app/stubs/drawingZoneParametersService.stub';
import { DrawpageServiceStub } from 'src/app/stubs/drawpageService.stub';
import { PageDetailComponent } from './page-detail.component';

describe('PageDetailComponent', () => {
  let component: PageDetailComponent;
  let fixture: ComponentFixture<PageDetailComponent>;
  let drawpageService: DrawpageService;
  let drawingzoneParameterService: DrawingZoneParametersService;
  enum MouseState { mouseDown = 1, mouseMove = 2, mouseUp = 3, mouseWheel = 4, doubleClick = 5 }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDetailComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      providers: [ MagnestismService, GridService,
        /*{provide: GridService, useClass: GridServiceStub},*/
        {provide: ColorService, useClass: ColorServiceStub},
        {provide: DrawpageService, useClass: DrawpageServiceStub},
        {provide: DrawingZoneParametersService, useClass: DrawingZoneParametersServiceStub} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDetailComponent);
    component = fixture.componentInstance;
    drawpageService = TestBed.get(DrawpageService);
    drawingzoneParameterService = TestBed.get(DrawingZoneParametersService);
    fixture.detectChanges();
    fixture.whenStable();
  });

  it('should updateDrawing', () => {
    spyOn(drawpageService, 'update');
    const point = new Point(0, 0);
    component.updateDrawing(point, false, true);
    expect(drawpageService.update).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when the constructor is called shape attributes should be default values', () => {
    expect(component['mouseState']).toEqual(0);
    expect(component['colorZone']).toEqual('rgba(255,255,255,1)');
  });

  it('startDrawing', () => {
    spyOn(drawpageService, 'createElement');
    const point = new Point(0, 0);
    const event: any = {};
    component.startDrawing(point, event);
    expect(component.isDrawing).toBeFalsy();
    expect(drawpageService.createElement).toHaveBeenCalled();
  });

  it('startDrawing', () => {
    spyOn(drawpageService, 'createElement').and.returnValue(document.createElement('svg'));
    spyOn(component.svg.nativeElement, 'appendChild');
    const point = new Point(0, 0);
    const event: any = {};
    component.startDrawing(point, event);
    expect(component.isDrawing).toBeTruthy();
    expect(drawpageService.createElement).toHaveBeenCalled();
    expect(component.svg.nativeElement.appendChild).toHaveBeenCalled();
  });

  it('stopDrawing', () => {
    spyOn(drawpageService, 'stop');
    component.stopDrawing(new Point(0, 0), false);
    expect(component.isDrawing).toBeFalsy();
    expect(drawpageService.stop).toHaveBeenCalled();
    expect(drawpageService.isEmpty).toBeFalsy();
  });

  it('stopDrawing active = 3', () => {
    drawpageService.active = 3;
    spyOn(drawpageService, 'stop');
    component.stopDrawing(new Point(0, 0), false);
    expect(component.isDrawing).toBeTruthy();
    expect(drawpageService.stop).toHaveBeenCalled();
  });

  it('when ngOnInit Is Called', () => {
    spyOn(drawpageService, 'setCurrentRenderAndSVG').and.callThrough();
    spyOn(drawingzoneParameterService, 'emitParameters').and.callThrough();
    spyOn(drawingzoneParameterService, 'emitBackgroundColor').and.callThrough();
    component.ngOnInit();
    expect(component.mouseState).toEqual(0);
    expect(component.heightZone).toEqual(window.innerHeight);
    expect(component.widthZone).toEqual(window.innerWidth);
    expect(component.colorZone).toEqual('rgba(255,255,255,1)');
    expect(component.path).toEqual('');
    expect(drawingzoneParameterService.emitParameters).toHaveBeenCalled();
    expect(drawingzoneParameterService.emitBackgroundColor).toHaveBeenCalled();
    expect(drawpageService.setCurrentRenderAndSVG).toHaveBeenCalled();
  });

  it('when ngOnInit Is Called', () => {
    spyOn(drawpageService, 'setCurrentRenderAndSVG').and.callThrough();
    const drawingZoneParametersMock: DrawingZoneParameters = {
      height: 10,
      width: 10,
      backgroundColor: 'white',
    };
    drawingzoneParameterService.setDrawingZoneParameters(drawingZoneParametersMock);
    component.ngOnInit();
    expect(component.mouseState).toEqual(0);
    expect(component.colorZone).toEqual('rgba(255,255,255,1)');
    expect(component.path).toEqual('');
    expect(drawpageService.setCurrentRenderAndSVG).toHaveBeenCalled();
  });

  it('when onResize is called with heightZone changed', () => {
      drawpageService.hasBeenSet = false;
      drawpageService.isEmpty = true;
      component.zoneTravailH = 2;
      spyOn(drawpageService, 'createElement');
      component.onResize();
      fixture.detectChanges();
      window.dispatchEvent(new Event('resize'));
      expect(drawpageService.createElement).toHaveBeenCalledTimes(0);
    });

  it('when mouseEvent with mouseState MouseDown', () => {
      spyOn(component, 'startDrawing');
      drawpageService.active = 2;
      const event: any = {
        clientX: '',
      };
      component.mouseEvent(event, MouseState.mouseDown);
      expect(component.startDrawing).toHaveBeenCalled();
  });

  it('when mouseEvent with mouseState MouseDown active 3', () => {
    spyOn(component, 'startDrawing');
    drawpageService.active = 3;
    const event: any = {
      clientX: '',
    };
    component.mouseEvent(event, MouseState.mouseDown);
    expect(component.startDrawing).toHaveBeenCalledTimes(0);
  });

  it('when mouseEvent  mouseState mouseUp', () => {
      spyOn(component, 'stopDrawing').and.callThrough();
      const event: any = {
        clientX: '',
      };
      component.mouseEvent(event, MouseState.mouseUp);
      expect(component.stopDrawing).toHaveBeenCalled();
  });

  it('when wheel event is called mouseWheel', () => {
    spyOn(drawpageService, 'mouseWheel');
    const event: any = {
      altKey: true,
    };
    component.wheelEvent(event.altKey, MouseState.mouseWheel);
    expect(drawpageService.mouseWheel).toHaveBeenCalled();
  });

  it('when mouseEvent mouseState mouseMove', () => {
    spyOn(drawpageService, 'update').and.callThrough();
    component.isDrawing = true;
    const event: any = {
      shiftKey: true,
    };
    component.updateDrawing(new Point(0, 0), event.shiftKey, true);
    expect(drawpageService.update).toHaveBeenCalled();
  });

  it('when mouseEvent mouseState mouseMove isDrawing false', () => {
    spyOn(drawpageService, 'movingMouse');
    drawpageService.active = 2;
    const event: any = {
      clientX: '',
    };
    component.mouseEvent(event, MouseState.mouseMove);
    expect(drawpageService.movingMouse).toHaveBeenCalled();
  });

  it('when mouseEvent mouseState doubleClick active 2', () => {
    drawpageService.active = 2;
    spyOn(drawpageService, 'doubleClick');
    component.isDrawing = true;
    const event: any = {
      shiftKey: true,
    };
    component.mouseEvent(event.shiftKey, MouseState.doubleClick);
    expect(drawpageService.doubleClick).toHaveBeenCalled();
  });

  it('when mouseEvent mouseState doubleClick active 3', () => {
    drawpageService.active = 3;
    spyOn(drawpageService, 'doubleClick');
    component.isDrawing = true;
    const event: any = {
      shiftKey: true,
    };
    component.mouseEvent(event.shiftKey, MouseState.doubleClick);
    expect(component.isDrawing).toBeFalsy();
    expect(drawpageService.doubleClick).toHaveBeenCalled();
  });

  it('when onResize is called with zonetravaiH et W in if', () => {
    component.heightZone = 1000;
    component.widthZone = 1000;
    drawpageService.hasBeenSet = false;
    drawpageService.isEmpty = true;
    component.onResize();
    expect(component.zoneTravailH).toEqual(window.innerHeight);
    expect(component.zoneTravailW).toEqual(window.innerWidth);
  });

  it('when onResize is called with zonetravaiH et W in else', () => {
    component.heightZone = 500;
    component.widthZone = 500;
    drawpageService.hasBeenSet = true;
    drawpageService.isEmpty = true;
    component.onResize();
    expect(component.zoneTravailH).toEqual(window.innerHeight);
    expect(component.zoneTravailW).toEqual(window.innerWidth);
  });

  it('when onResize is called with zonetravaiH et W in else', () => {
    component.heightZone = 10500;
    component.widthZone = 10500;
    drawpageService.hasBeenSet = true;
    drawpageService.isEmpty = true;
    component.onResize();
    expect(component.zoneTravailH).toEqual(10500);
    expect(component.zoneTravailW).toEqual(10500);
  });

});
