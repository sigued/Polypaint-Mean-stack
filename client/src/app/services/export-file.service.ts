import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExportFileService {

  render: Renderer2;
  svg: SVGElement;
  image: HTMLImageElement;
  canvasElement: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  workArea: HTMLDivElement;
  format: string;

  constructor() {/** */ }

  svgToBase64(): string {
    return 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(this.svg as Node));
  }

  encodImage() {
    this.image = new Image();
    this.image.width = this.svg.getBoundingClientRect().width;
    this.image.height = this.svg.getBoundingClientRect().height;
    this.image.src = this.svgToBase64();
  }

  drawImageOnCanvas() {
    this.canvasElement = this.render.createElement('canvas');
    this.canvasElement.width = this.svg.getBoundingClientRect().width;
    this.canvasElement.height = this.svg.getBoundingClientRect().height;

    this.ctx = this.canvasElement.getContext('2d');

    if (this.ctx) {
      this.encodImage();
      this.image.decode().then(() => {
        if (this.ctx) {
          this.ctx.drawImage(this.image, 0, 0);
          this.downloadImage();
        }
      })
        .catch((error) => {
          throw error;
        });
    }
  }

  loadImage(format: string) {
    this.format = format;
    this.drawImageOnCanvas();
  }

  downloadImage() {
    const anchorElement = this.render.createElement('a');
    this.render.appendChild(this.workArea, anchorElement);
    anchorElement.href = (this.format === 'svg' ? this.svgToBase64() : this.canvasElement.toDataURL(this.format));
    anchorElement.download = 'image.' + this.format;
    anchorElement.click();
    this.render.removeChild(this.workArea, anchorElement);
  }

  setCurrentRenderAndSVG(render: Renderer2, svg: SVGElement, workArea: HTMLDivElement) {
    this.render = render;
    this.svg = svg;
    this.workArea = workArea;
  }
}
