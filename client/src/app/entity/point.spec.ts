import { Point } from './point';

describe('Point Entity', () => {

    it('should return new client position', () => {
      const event = {clientX: 0, clientY: 1};
      const myPoint = Point.parse(event);
      expect(myPoint.x).toEqual(event.clientX);
      expect(myPoint.y).toEqual(event.clientY);
    });
  });
