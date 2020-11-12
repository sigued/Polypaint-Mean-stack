import { Injectable, Renderer2 } from '@angular/core';
import { Point } from '../entity/point';
import { ColorService } from './common/color.service';

@Injectable({
  providedIn: 'root',
})
export class PipetteService {
  private canvasImg: CanvasImageSource;
  private context: CanvasRenderingContext2D | null;
  private active: number;

  constructor(private colorService: ColorService) {
    this.active = 0;
  }

  handlePipette(render: Renderer2, point: Point, svg: HTMLElement, type: number): void {
      const canvas = render.createElement('canvas');
      canvas.width = svg.getBoundingClientRect().width;
      canvas.height = svg.getBoundingClientRect().height;
      this.context = canvas.getContext('2d');
      if (this.context) {
        this.canvasImg = new Image();
        this.canvasImg.height = svg.getBoundingClientRect().height;
        this.canvasImg.width = svg.getBoundingClientRect().width;

        const svgXml = new XMLSerializer().serializeToString(svg);
        const svg64 = btoa(svgXml);
        const header64 = 'data:image/svg+xml;base64,';
        this.canvasImg.src = header64 + svg64;
        this.canvasImg.decode().then(() => {
          if (this.context) {
            this.context.drawImage(this.canvasImg, 0, 0);
            const pixelData: Uint8ClampedArray = this.context.getImageData(point.x, point.y, 1, 1).data;
            const color = 'rgba(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] + ',' + pixelData[3] + ')';

            if (type === 0) {
              this.colorService.setPrimaryColor(color);
            } else if (type === 2) {
              this.colorService.setSecondColor(color);
            }
          }
        });
      }
  }

  setActive(active: number): void {
    this.active = active;
  }

  isUsingPipette(): boolean {
    return this.active === 7;
  }
}
