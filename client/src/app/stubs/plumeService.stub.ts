import { Subject } from 'rxjs';
import { Point } from '../entity/point';

export class PlumeServiceStub {
    rotationAngle: number;
    element: SVGElement;
    previousPoint: Point;
    rotationAngleSubject = new Subject<number>();

    createElement() {/* */}
    update() {/* */}
    stop() {/* */}
    createNewLine() {/* */}
    generateIntermediateLines() {/* */}
    mouseWheelRotation() {/* */}
    degreesToRadianAngle() {/* */}
    setFeatherAttributes() {/* */}
    getColor() {/* */}
    setWidth() {/* */}
    setRotationAngle() {/* */}
}
