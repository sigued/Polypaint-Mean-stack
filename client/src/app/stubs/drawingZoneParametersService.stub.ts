import { Subject } from 'rxjs';
import { RGBA_WHITE_COLOR } from '../constant';
import { DrawingZoneParameters } from '../model/drawingZoneParameters.model';

export class DrawingZoneParametersServiceStub {

  drawingZoneParameters: DrawingZoneParameters = {
    height: window.innerHeight,
    width: window.innerWidth,
    backgroundColor: RGBA_WHITE_COLOR,
  };
  userSubject = new Subject<DrawingZoneParameters>();
  backgroundColor = RGBA_WHITE_COLOR;
  backgroundcolorSubject = new Subject<string>();

  emitParameters() {
    this.userSubject.next(this.drawingZoneParameters);
  }
  setDrawingZoneParameters(drawingZoneparameters: DrawingZoneParameters) {
    this.drawingZoneParameters = drawingZoneparameters;
    this.emitParameters();
  }
  setBackgroundColor() {/** */}
  emitBackgroundColor() {
    this.backgroundcolorSubject.next(this.backgroundColor);
  }

}
