import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
import { ClipboardService } from './clipboard.service';

describe('Service: Clipborad', () => {
  let clipboardService: ClipboardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipboardService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    clipboardService = TestBed.get(ClipboardService);
  });

  it('should ...', inject([ClipboardService], (service: ClipboardService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', () => {
    expect(clipboardService['elementCopied']).toBeDefined();
  });

  it('should set extremum to (5,5)', () => {
    const point = new Point(5, 5);
    clipboardService.setExtremum(point);
    expect(clipboardService['extremum']).toEqual(point);
  });

  it('should return elements', () => {
    const elementCopied: SvgElement[] = [];
    const element = document.createElement('svg');
    const svg: ElementRef = new ElementRef(element);
    elementCopied.push(new SvgElement(0, new Point(0, 0), new Point(0, 0), 0, 0, svg));
    clipboardService['elementCopied'] = elementCopied;
    expect(clipboardService.getElement()).toEqual(elementCopied);
  });

  it('should get extremum', () => {
    const point = new Point(5, 5);
    clipboardService['extremum'] = point;
    expect(clipboardService.getExtremun()).toEqual(point);
    });

  it('should copy elements', () => {
      const elementCopied: SvgElement[] = [];
      const element = document.createElement('svg');
      const svg: ElementRef = new ElementRef(element);
      elementCopied.push(new SvgElement(0, new Point(0, 0), new Point(0, 0), 0, 0, svg));
      const child = document.createElement('rec');
      clipboardService['elementCopied'] = elementCopied;
      elementCopied[0].element = child;
      clipboardService.copy(elementCopied, svg);
      expect(clipboardService['elementCopied']).toEqual(elementCopied);
    });
});
