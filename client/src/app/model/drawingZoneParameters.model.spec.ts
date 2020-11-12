import { DrawingZoneParameters } from './drawingZoneParameters.model';

const drawingZoneParametersMock: DrawingZoneParameters = {
  height: 10,
  width: 10,
  backgroundColor: 'white',
};
describe('DrawingZoneParameters Model', () => {
    let drawingZoneParameters: DrawingZoneParameters;
    beforeEach(() => { drawingZoneParameters = drawingZoneParametersMock; });

    it('should return height 10', () => {
      expect(drawingZoneParameters.height).toEqual(10);
    });

    it('should return width 15', () => {
      expect(drawingZoneParameters.width).toEqual(10);
    });

    it('should return backgroundColor white', () => {
      expect(drawingZoneParameters.backgroundColor).toEqual('white');
    });

  });
