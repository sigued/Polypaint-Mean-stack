import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input,
  OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { RGBA_BLACK_COLOR, RGBA_BLACK_COLOR_0, RGBA_WHITE_COLOR, RGBA_WHITE_COLOR_0 } from 'src/app/constant';
import { Point } from '../../../entity/point';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {
  @Input()
  selectedGradient: string;

  @Output() color: EventEmitter<string> = new EventEmitter(true);

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D;

  isDown = false;

  selectedColor: Point;

  ngAfterViewInit() {
    this.generatePalette();
  }

  generatePalette() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;

    if (this.selectedGradient) {
      this.ctx.fillStyle = this.selectedGradient;
    }
    this.ctx.fillRect(0, 0, width, height);

    const lightGradient = this.ctx.createLinearGradient(0, 0, width, 0);
    lightGradient.addColorStop(0, RGBA_WHITE_COLOR);
    lightGradient.addColorStop(1, RGBA_WHITE_COLOR_0);

    this.ctx.fillStyle = lightGradient;
    this.ctx.fillRect(0, 0, width, height);
    const darkGrad = this.ctx.createLinearGradient(0, 0, 0, height);
    darkGrad.addColorStop(0, RGBA_BLACK_COLOR_0);
    darkGrad.addColorStop(1, RGBA_BLACK_COLOR);

    this.ctx.fillStyle = darkGrad;
    this.ctx.fillRect(0, 0, width, height);

    if (this.selectedColor) {
      this.ctx.strokeStyle = 'black';
      this.ctx.fillStyle = 'black';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(this.selectedColor.x, this.selectedColor.y, 10, 0, 2 * Math.PI);
      this.ctx.stroke();
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedGradient) {
      this.generatePalette();
      const sliderPosition = this.selectedColor;
      if (sliderPosition) {
        this.color.emit(this.getRGBA(sliderPosition.x, sliderPosition.y));
      }
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any) {
    this.isDown = false;
  }

  onMouseDown(event: any) {
    this.isDown = true;
    this.selectedColor = new Point(event.offsetX, event.offsetY);
    this.generatePalette();
    this.color.emit(this.getRGBA(event.offsetX, event.offsetY));
  }

  onMouseMove(event: any) {
    if (this.isDown) {
      this.selectedColor = new Point(event.offsetX, event.offsetY);
      this.generatePalette();
      this.emitColor(event.offsetX, event.offsetY);
    }
  }

  emitColor(x: number, y: number) {
    const rgbaCode = this.getRGBA(x, y);
    this.color.emit(rgbaCode);
  }

  getRGBA(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  }

  setSelectedChanges(changes: string) {
    this.selectedGradient = changes;
  }
}
