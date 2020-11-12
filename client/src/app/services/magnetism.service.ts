import { Point } from '../entity/point';
import { GridService } from './grid.service';

export class MagnestismService {

    isActivated = false;
    corner = 'Top Left';
    constructor(private gridService: GridService) {/** */}

    getClosestPoint(point: Point, delta: Point): Point {
        if (delta.x >= 0 && delta.y < 0) {
            return this.getClosestPointYBackward(point);
        } else if (delta.x < 0 && delta.y < 0) {
            return this.getClosestPointBothBackward(point);
        } else if (delta.x < 0 && delta.y >= 0) {
            return this.getClosestPointXBackward(point);
        } else {
            return this.getClosestPointBothForward(point);
        }
    }

    getClosestPointBothForward(point: Point): Point {
        return new Point(this.getClosestForwardValue(point.x, this.gridService.width),
        this.getClosestForwardValue(point.y, this.gridService.height));
    }

    getClosestPointBothBackward(point: Point): Point {
        return new Point(this.getClosestBackwardValue(point.x, this.gridService.width),
        this.getClosestBackwardValue(point.y, this.gridService.height));
    }

    getClosestPointXBackward(point: Point): Point {
        return new Point(this.getClosestBackwardValue(point.x, this.gridService.width),
        this.getClosestForwardValue(point.y, this.gridService.height));
    }

    getClosestPointYBackward(point: Point): Point {
        return new Point(this.getClosestForwardValue(point.x, this.gridService.width),
        this.getClosestBackwardValue(point.y, this.gridService.height));
    }

    getClosestForwardValue(value: number, incrementValue: number): number {
        value = Math.round(value);
        incrementValue = Math.round(incrementValue);
        return value + incrementValue - (value % incrementValue);
    }

    getClosestBackwardValue(value: number, incrementValue: number): number {
        value = Math.round(value);
        incrementValue = Math.round(incrementValue);
        return value - (value % incrementValue);
    }
}
