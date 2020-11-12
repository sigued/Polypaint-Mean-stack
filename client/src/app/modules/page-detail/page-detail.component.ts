import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RGBA_WHITE_COLOR, SVG_GROUP, SVG_LINK } from 'src/app/constant';
import { DrawingZoneParametersService } from 'src/app/services/common/drawingZoneParameters.service';
import { DrawpageService } from 'src/app/services/drawpage.service';
import { ExportFileService } from 'src/app/services/export-file.service';
import { GridService } from 'src/app/services/grid.service';
import { HandlerselectionService } from 'src/app/services/handlerselection.service';
import { Point } from '../../entity/point';
import { DrawingZoneParameters } from '../../model/drawingZoneParameters.model';

enum MouseState { mouseDown = 1, mouseMove = 2, mouseUp = 3, mouseWheel = 4, doubleClick = 5, rightClik = 6, onEnter = 7, onLeave = 8 }

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss'],
})
export class PageDetailComponent implements OnInit {
  @ViewChild('svg', { static: true }) svg: ElementRef;
  @ViewChild('workArea', { static: true }) workArea: ElementRef;
  @Input() heightZone: number;
  @Input() widthZone: number;
  @Input() colorZone: string;
  @Input() zoneTravailH: number;
  @Input() zoneTravailW: number;
  @Output() keyPressed = new EventEmitter();
  mouseState: MouseState;
  path: string;
  styleAttribute = '';
  rotationAngle: number;
  drawingZoneParametersSubscription: Subscription;
  drawingZoneParameters: DrawingZoneParameters;
  activeShape: any;
  isDrawing: any;
  backgroundcolorSubscription: Subscription;

  constructor(private render: Renderer2,
              private drawpageService: DrawpageService,
              private drawingZoneParametersService: DrawingZoneParametersService,
              public gridService: GridService,
              private exportFileService: ExportFileService, private handlerSelectionService: HandlerselectionService) {
    this.mouseState = 0;
    this.heightZone = window.innerHeight;
    this.widthZone = window.innerWidth;
    this.colorZone = RGBA_WHITE_COLOR;
    this.isDrawing = false;
  }

  ngOnInit() {
    this.drawpageService.setCurrentRenderAndSVG(this.render, this.svg, this.workArea);
    this.handlerSelectionService.init(this.render, this.svg, this.drawpageService.elementTab);
    this.mouseState = 0;
    this.path = '';
    this.drawingZoneParametersSubscription = this.drawingZoneParametersService.userSubject.subscribe(
      (parameters: DrawingZoneParameters) => {
        this.drawingZoneParameters = parameters;
        this.heightZone = parameters.height;
        this.widthZone = parameters.width;
        this.colorZone = parameters.backgroundColor;
        this.drawpageService.isEmpty = true;
        this.zoneTravailH = this.heightZone > window.innerHeight ? this.heightZone : window.innerHeight;
        this.zoneTravailW = this.widthZone > window.innerWidth ? this.widthZone : window.innerWidth;
      },
    );
    this.drawingZoneParametersService.emitParameters();
    this.drawingZoneParametersService.emitParameters();
    this.backgroundcolorSubscription = this.drawingZoneParametersService.backgroundcolorSubject.subscribe(
      (backgroundColor: string) => {
        this.colorZone = backgroundColor;
      },
    );
    this.drawingZoneParametersService.emitBackgroundColor();
  }

  startDrawing(point: Point, event: MouseEvent): void {
    this.isDrawing = true;
    this.activeShape = this.drawpageService.createElement(this.render, point, event);
    if (this.activeShape != null) {
      if (this.activeShape !== 'select') {
        const g = this.render.createElement(SVG_GROUP, SVG_LINK);
        g.appendChild(this.activeShape);
        this.svg.nativeElement.appendChild(g);
      }
    } else {
      this.isDrawing = false;
    }
  }

  updateDrawing(point: Point, shiftKeyPressed: boolean, altKey: boolean) {
    this.drawpageService.update(this.render, point, this.activeShape, shiftKeyPressed, altKey);
  }

  stopDrawing(point: Point, isDrawing: boolean): void {
    this.drawpageService.stop(this.render, this.activeShape, point, isDrawing);
    if (this.drawpageService.active === 3) {
      this.isDrawing = true;
    } else {
      this.isDrawing = false;
      this.drawpageService.isEmpty = false;
      this.exportFileService.setCurrentRenderAndSVG(this.render, this.svg.nativeElement, this.workArea.nativeElement);
    }
  }

  mouseEvent(event: MouseEvent, state: MouseState): void {
    const point = new Point(
      event.clientX - this.svg.nativeElement.getBoundingClientRect().x,
      event.clientY - this.svg.nativeElement.getBoundingClientRect().y);
    switch (state) {
      case MouseState.mouseDown:
        if (!(this.drawpageService.active === 3)) {
          this.startDrawing(point, event);
        }
        break;
      case MouseState.mouseMove:
        if (this.isDrawing) {
          this.updateDrawing(point, event.shiftKey, event.altKey);
        } else {
          this.drawpageService.movingMouse(this.render, point);
        }
        break;
      case MouseState.mouseUp:
        this.stopDrawing(point, this.isDrawing);
        break;
      case MouseState.doubleClick:
        this.drawpageService.doubleClick(this.render, point, event.shiftKey);
        if (this.drawpageService.active === 3) {
          this.isDrawing = false;
        }
        break;
      case MouseState.onEnter:
          this.drawpageService.onEnter(this.render, point);
          break;
      case MouseState.onLeave:
        this.drawpageService.onLeave(this.render, point);
        break;
    }
  }

  wheelEvent(event: WheelEvent, state: MouseState): void {
    switch (state) {
      case MouseState.mouseWheel:
          this.drawpageService.mouseWheel(event);
          this.handlerSelectionService.rotateSelectedGroup(event);
          break;
    }
  }
  onResize(): void {
    if ((!this.drawpageService.hasBeenSet) && this.drawpageService.isEmpty) {
      this.heightZone = (this.zoneTravailH < window.innerHeight || this.heightZone > window.innerHeight) ?
        window.innerHeight : this.heightZone;
      this.widthZone = (this.zoneTravailW < window.innerWidth || this.widthZone > window.innerWidth) ? window.innerWidth : this.widthZone;
      this.zoneTravailH = window.innerHeight;
      this.zoneTravailW = window.innerWidth;
    } else {
      this.zoneTravailH = this.heightZone > window.innerHeight ? this.heightZone : window.innerHeight;
      this.zoneTravailW = this.widthZone > window.innerWidth ? this.widthZone : window.innerWidth;
    }
  }
}
