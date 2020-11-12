import { DrawingZoneParameters } from 'src/app/model/drawingZoneParameters.model';
import { DrawingZoneParametersService } from './drawingZoneParameters.service';

describe('Service: drawingZoneParameter', () => {
  let service: DrawingZoneParametersService;

  beforeEach(() => {
    service = new DrawingZoneParametersService();
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('when emitParameters is called', () => {
    spyOn(service.userSubject, 'next');
    service.emitParameters();
    expect(service.userSubject.next).toHaveBeenCalled();
  });

  it('when setDrawingZoneParameters is called', () => {
    const drawingZoneParametersMock: DrawingZoneParameters = {
      height: 10,
      width: 10,
      backgroundColor: 'white',
    };
    expect(service['drawingZoneParameters'].backgroundColor).toEqual('rgba(255,255,255,1)');
    spyOn(service, 'emitParameters').and.callThrough();
    service.setDrawingZoneParameters(drawingZoneParametersMock);
    expect(service['drawingZoneParameters'].width).toEqual(10);
    expect(service['drawingZoneParameters'].height).toEqual(10);
    expect(service.emitParameters).toHaveBeenCalled();
  });

  it('when emitBackgroundColor is called', () => {
    spyOn(service.backgroundcolorSubject, 'next');
    service.emitBackgroundColor();
    expect(service.backgroundcolorSubject.next).toHaveBeenCalled();
  });

  it('when setDrawingZoneParameters is called', () => {
    spyOn(service, 'emitBackgroundColor');
    service.setBackgroundColor('test');
    expect(service.emitBackgroundColor).toHaveBeenCalled();
  });

});
