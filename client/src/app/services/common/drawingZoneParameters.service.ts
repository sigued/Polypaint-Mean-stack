import { Subject } from 'rxjs';
import { RGBA_WHITE_COLOR } from 'src/app/constant';
import { DrawingZoneParameters } from '../../model/drawingZoneParameters.model';

export class DrawingZoneParametersService {
  private drawingZoneParameters: DrawingZoneParameters = {
    height: window.innerHeight,
    width: window.innerWidth,
    backgroundColor: RGBA_WHITE_COLOR,
  };
  userSubject = new Subject<DrawingZoneParameters>();
  private backgroundColor = RGBA_WHITE_COLOR;
  backgroundcolorSubject = new Subject<string>();

  emitParameters() {
    this.userSubject.next(this.drawingZoneParameters);
  }

  setDrawingZoneParameters(drawingZoneparameters: DrawingZoneParameters) {
    this.drawingZoneParameters = drawingZoneparameters;
    this.emitParameters();
  }

  emitBackgroundColor() {
    this.backgroundcolorSubject.next(this.backgroundColor);
  }

  setBackgroundColor(backgroundCol: string) {
    this.backgroundColor = backgroundCol;
    this.emitBackgroundColor();
  }
}
