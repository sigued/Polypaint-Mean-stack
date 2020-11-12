export class Point {
    x = 0;
    y = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

    static parse(event: any): Point {
      return new Point(event.clientX, event.clientY);
    }

    isSamePoint(point: Point): boolean {
      return (this.x === point.x && this.y === point.y);
    }
}
