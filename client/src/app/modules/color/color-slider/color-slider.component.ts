import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, } from '@angular/core';
import { RGBA_BLUE_COLOR, RGBA_CYAN_COLOR, RGBA_LIME_COLOR, RGBA_MAGENTA_COLOR, RGBA_MAROON_COLOR, RGBA_RED_COLOR, RGBA_YELLOW_COLOR } from 'src/app/constant';

const RGBColorTable = new Map();
RGBColorTable.set('red', RGBA_RED_COLOR);
RGBColorTable.set('lime', RGBA_LIME_COLOR);
RGBColorTable.set('blue', RGBA_BLUE_COLOR);
RGBColorTable.set('yellow', RGBA_YELLOW_COLOR);
RGBColorTable.set('cyan', RGBA_CYAN_COLOR);
RGBColorTable.set('magenta', RGBA_MAGENTA_COLOR);
RGBColorTable.set('marron', RGBA_MAROON_COLOR);

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss'],
})
export class ColorSliderComponent implements AfterViewInit {
  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  @Output() color: EventEmitter<string> = new EventEmitter();

  private ctx: CanvasRenderingContext2D;
  private isDown = false;
  private selectedColor: number;

  ngAfterViewInit() {
    this.generateSlider();
  }

  generateSlider() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;

    this.ctx.clearRect(0, 0, width, height);
    const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
    let gradientPosition = 0; // goes from 0 to 1
    const gradientIncrement = 0.16;
    for (const colorCode of RGBColorTable.values()) {
      if (gradient != null) {
        gradient.addColorStop(gradientPosition, colorCode);
        gradientPosition += gradientIncrement;
      }
    }

    this.ctx.beginPath();
    this.ctx.rect(0, 0, width, height);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();

    if (this.selectedColor) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 2;
      const sliderHeight = 10;
      this.ctx.rect(0, this.selectedColor - 2, width, sliderHeight);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any) {
    this.isDown = false;
  }

  onMouseDown(event: any) {
    this.isDown = true;
    this.selectedColor = event.offsetY;
    this.generateSlider();
    this.emitColor(event.offsetX, event.offsetY);
  }

  onMouseMove(event: any) {
    if (this.isDown) {
      this.selectedColor = event.offsetY;
      this.generateSlider();
      this.emitColor(event.offsetX, event.offsetY);
    }
  }

  emitColor(x: number, y: number) {
    const rgbaCode = this.getRGBA(x, y);
    this.color.emit(rgbaCode);
  }

  getRGBA(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return (
      'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)'
    );
  }
}
