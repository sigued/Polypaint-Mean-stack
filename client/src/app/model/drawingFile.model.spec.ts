import { DrawingFile } from './drawingFile.model';

const drawingFileMock = new DrawingFile('1', 'dessin1', 'white', [], []);

describe('DrawingZoneParameters Model', () => {
    let drawingFile: DrawingFile;
    beforeEach(() => { drawingFile = drawingFileMock; });

    it('should return id 1', () => {
      expect(drawingFile.id).toEqual('1');
    });

    it('should return name dessin1', () => {
      expect(drawingFile.name).toEqual('dessin1');
    });

    it('should return outerHtml white', () => {
      expect(drawingFile.outerHtml).toEqual('white');
    });

    it('should return tags undefined', () => {
      expect(drawingFile.tags).toEqual([]);
    });

    it('should return elementTab undefined', () => {
      expect(drawingFile.elementTab).toEqual([]);
    });

  });
