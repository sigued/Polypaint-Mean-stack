import { TestBed } from '@angular/core/testing';

import { ElementRef, Renderer2 } from '@angular/core';
import { RenderStub } from '../stubs/render.stub';
import { ExportFileService } from './export-file.service';

describe('ExportFileService', () => {
  let exportService: ExportFileService;
  let render: Renderer2;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [ExportFileService, {provide: Renderer2, useClass: RenderStub}],
    });
    exportService = TestBed.get(ExportFileService);
    render = TestBed.get(Renderer2);
  });

  it('should be created', () => {
    expect(exportService).toBeTruthy();
  });

  it('should have attributes undefined', () => {
    expect(exportService.render).toBeUndefined();
    expect(exportService.svg).toBeUndefined();
    expect(exportService.image).toBeUndefined();
    expect(exportService.canvasElement).toBeUndefined();
    expect(exportService.ctx).toBeUndefined();
    expect(exportService.workArea).toBeUndefined();
    expect(exportService.format).toBeUndefined();
  });

  it('should have svgToBase64', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    exportService.svg = svg;
    const expectedValue = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svg as Node));
    expect(exportService.svgToBase64()).toEqual(expectedValue);
  });

  it('should have encodImage', () => {
    const image = document.createElement('img');
    const imageRef = new ElementRef(image);
    exportService.image = imageRef.nativeElement;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    exportService.svg = svg;
    spyOn(svg, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    spyOn(exportService, 'svgToBase64');
    exportService.encodImage();
    expect(svg.getBoundingClientRect).toHaveBeenCalledTimes(2);
  });

  it('should have loadImage', () => {
    spyOn(exportService, 'drawImageOnCanvas');
    const ExpectedFormat = 'jpeg';
    exportService.loadImage(ExpectedFormat);
    expect(exportService.format).toEqual(ExpectedFormat);
    expect(exportService.drawImageOnCanvas).toHaveBeenCalled();
  });

  it('should have downloadImage', () => {
    exportService.render = render;
    spyOn(render, 'appendChild');
    spyOn(render, 'removeChild');
    spyOn(exportService, 'svgToBase64');
    const format = 'svg';
    exportService.format = format;
    const download = 'image.' + format;
    const anchorElement = document.createElement('a');
    spyOn(render, 'createElement').and.returnValue(anchorElement);
    spyOn(anchorElement, 'click');
    exportService.downloadImage();
    expect(render.createElement).toHaveBeenCalled();
    expect(render.appendChild).toHaveBeenCalled();
    expect(exportService.svgToBase64).toHaveBeenCalled();
    expect(anchorElement.download).toEqual(download);
    expect(anchorElement.click).toHaveBeenCalled();
    expect(render.removeChild).toHaveBeenCalled();
  });

  it('should have setCurrentRenderAndSVG', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const workArea = document.createElement('div');
    exportService.setCurrentRenderAndSVG(render, svg, workArea);
    expect(exportService.render).toEqual(render);
    expect(exportService.svg).toEqual(svg);
    expect(exportService.workArea).toEqual(workArea);
  });

  it('should have drawImageOnCanvas', () => {
    exportService.image = new Image();
    exportService.image.width = 10;
    exportService.image.height = 10;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    exportService.svg = svg;
    const src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svg as Node));
    exportService.image.src = src;
    exportService.render = render;
    spyOn(exportService, 'encodImage');
    spyOn(exportService, 'downloadImage');
    const canvas = document.createElement('canvas');
    spyOn(render, 'createElement').and.returnValue(canvas);
    spyOn(svg, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    const ctx  = canvas.getContext('2d');
    spyOn(canvas, 'getContext').and.returnValue(ctx);

    exportService.drawImageOnCanvas();
    expect(render.createElement).toHaveBeenCalled();
    expect(svg.getBoundingClientRect).toHaveBeenCalledTimes(2);
    expect(canvas.getContext).toHaveBeenCalled();
    expect(exportService.encodImage).toHaveBeenCalled();
  });

  it('should have drawImageOnCanvas ctx undefined', () => {
    exportService.image = new Image();
    exportService.image.width = 10;
    exportService.image.height = 10;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    exportService.svg = svg;
    const src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svg as Node));
    exportService.image.src = src;
    exportService.render = render;
    // spyOn(exportService, 'encodImage');
    spyOn(exportService, 'downloadImage');
    const canvas = document.createElement('canvas');
    spyOn(render, 'createElement').and.returnValue(canvas);
    spyOn(svg, 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    // const ctx  = canvas.getContext('2d');
    spyOn(canvas, 'getContext').and.returnValue(null);

    exportService.drawImageOnCanvas();
    expect(render.createElement).toHaveBeenCalled();
    expect(svg.getBoundingClientRect).toHaveBeenCalledTimes(2);
    expect(canvas.getContext).toHaveBeenCalled();
    // expect(exportService.encodImage).toHaveBeenCalled();
  });

});
