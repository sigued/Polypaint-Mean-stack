import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { SVG_LINK } from '../constant';
import { Actions } from '../entity/action';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
import { tools } from '../entity/tool/toolList';
import { BucketToolService } from './bucket-tool.service';
import { EllipseService } from './ellipse.service';
import { EraserService } from './eraser.service';
import { EtampeService } from './etampe.service';
import { LineService } from './line.service';
import { PenService } from './pen.service';
import { PencilBrushService } from './pencilBrush.service';
import { PlumeService } from './plume.service';
import { PolygonService } from './polygon.service';
import { RectangleService } from './rectangle.service';
import { SelectService } from './select.service';
import { SprayService } from './spray.service';
import { SvgClickhandlerService } from './svgclickhandler.service';
import { TextService } from './text.service';

@Injectable({
  providedIn: 'root',
})

export class DrawpageService {
  primaryColor = 'black';
  secondColor = 'none';
  active: tools = tools.pencil;
  activeSubject = new Subject<number>();
  isEmpty = true;
  hasBeenSet = false;
  render: Renderer2;
  svg: ElementRef;
  workArea: ElementRef;
  currentElement: SvgElement;
  elementTab: SvgElement[] = [];
  nbElement = 0;
  actionModel: Actions;

  constructor(private rectangleService: RectangleService,
              private ellispeService: EllipseService, private lineService: LineService,
              private polygonService: PolygonService, private etampeService: EtampeService,
              private pencilBrushService: PencilBrushService, private selectService: SelectService,
              private plumeService: PlumeService,
              private eraserService: EraserService, private sprayService: SprayService,
              private penService: PenService,
              private svgClickHandler: SvgClickhandlerService,
              private textService: TextService, private bucketService: BucketToolService) {
                this.actionModel = Actions.getInstance();
              }

  setCurrentRenderAndSVG(render: Renderer2, svg: ElementRef, workArea: ElementRef) {
    this.render = render;
    this.svg = svg;
    this.workArea = workArea;

    this.svgClickHandler.setRender(render);
    this.svgClickHandler.setSvg(svg);
    this.svgClickHandler.setSvgElement(this.elementTab);
  }

  getCurrentSvgContent(): string {
    return this.workArea.nativeElement.innerHTML;
  }

  updateCurrentSvgContent(newContent: string): void {
    this.workArea.nativeElement.innerHTML = newContent;
  }

  updateCurrentSvgElements(svgElementTab: SvgElement[]): void {
    this.elementTab = svgElementTab;
    this.init();
  }

  cleanSVG(): void {
    for (const child of this.elementTab) {
      this.render.removeChild(this.svg, child.element);
    }
    this.elementTab = [];
    this.init();
  }

  addSvgElement(element: SvgElement): void {
    this.elementTab.push(element);
  }

  createElement(render: Renderer2, point: Point, event: MouseEvent) {
    let element ;
    this.textService.deleteTextBox();
    switch (this.active) {
      case tools.pencil:
      case tools.brush:
        element = this.pencilBrushService.createElement(render, point, this.active);
        break;
      case tools.rectangle:
        element = this.rectangleService.createElement(render, point);
        break;
      case tools.ellipse:
        element = this.ellispeService.createElement(render, point);
        break;
      case tools.polygon:
        element = this.polygonService.createElement(render, point);
        break;
      case tools.stamp:
        element = this.etampeService.createElement(render, point);
        break;
      case tools.select:
        element = this.selectService.createElement(render, point,  this.svg.nativeElement);
        break;
      case tools.pen:
        element = this.penService.createElement(render, point, this.svg.nativeElement);
        break;
      case tools.text:
        element = this.textService.createElement(render, point, this.svg.nativeElement);
        break;
      case tools.spray:
        element = this.sprayService.create(render, point, this.svg.nativeElement);
        break;
      case tools.feather:
        element = this.plumeService.createElement(render, point, this.svg.nativeElement);
        break;
      case tools.bucketTool:
        this.bucketService.createElement(render, point, this.svg.nativeElement);
        break;
      default:
        element = this.render.createElement('g', SVG_LINK);
        break;
    }

    if ( !(this.active === tools.select || this.active === tools.eraser || this.active === tools.bucketTool) ) {
      this.svgClickHandler.handleClick(element);
      this.currentElement = new SvgElement(this.nbElement++,  new Point(0, 0), new Point(0, 0), 0, 0, this.svg);
      if (this.active === tools.pen) {
        this.currentElement.element = element.parentNode;
        return element.parentNode;
      } else {
        this.currentElement.element = element;
      }
    }
    return element;
  }

  update(render: Renderer2, point: Point, element: any, shiftKeyPressed: boolean, altKeyPressed: boolean) {
    switch (this.active) {
      case tools.pencil:
      case tools.brush:
        this.pencilBrushService.update(render, point, element, shiftKeyPressed);
        break;
      case tools.rectangle:
        this.rectangleService.update(render, point, element, shiftKeyPressed);
        break;
      case tools.line:
        this.lineService.showPotentialLine(render, point);
        break;
      case tools.ellipse:
        this.ellispeService.update(render, point, element, shiftKeyPressed);
        break;
      case tools.polygon:
        this.polygonService.update(render, point, element);
        break;
      case tools.stamp:
        this.etampeService.update(render, point);
        break;
      case tools.select:
        this.selectService.update(render, point, element, this.svg.nativeElement, shiftKeyPressed, altKeyPressed);
        break;
      case tools.eraser:
        this.eraserService.update(render, point, true);
        break;
      case tools.pen:
        this.penService.update(render, point);
        break;
      case tools.spray:
        this.sprayService.update(render, point);
        break;
      case tools.feather:
        this.plumeService.update(render, point, element);
        break;
      default:
        break;
    }
  }

  movingMouse(render: Renderer2, point: Point) {
    if (this.active === tools.eraser) {
      this.eraserService.update(render, point, false);
    }
  }

  stop(render: Renderer2, element: any, point: Point, isDrawing: boolean) {
    switch (this.active) {
      case tools.pencil:
      case tools.brush:
        this.pencilBrushService.stop();
        break;
      case tools.line:
        this.lineService.mouseUp(render, point, isDrawing, this.svg.nativeElement);
        break;
      case tools.select:
        this.selectService.stop(render, element, this.elementTab, this.svg.nativeElement, point);
        break;
      case tools.eraser:
        this.eraserService.stop(render);
        break;
      case tools.pen:
        this.penService.stop();
        break;
      case tools.spray:
        this.sprayService.stop(render, point);
        break;
      case tools.feather:
        this.plumeService.stop();
        const g = render.createElement('g', SVG_LINK);
        this.svg.nativeElement.appendChild(g);
        g.appendChild(this.plumeService.element.parentNode);
        const svgElement = new SvgElement(this.nbElement++,  new Point(0, 0), new Point(0, 0), 0, 0, this.svg);
        svgElement.element = this.plumeService.element.parentNode as HTMLElement;
        this.elementTab.push(svgElement);
        this.actionModel.actions.push(svgElement);
        break;
      case tools.bucketTool:
        element = this.bucketService.stop();
        this.svg.nativeElement.appendChild(element);
        this.currentElement = new SvgElement(this.nbElement++,  new Point(0, 0), new Point(0, 0), 0, 0, this.svg);
        this.currentElement.element = element.childNodes[0];
        break;
      default:
        break;
    }

    if (this.active !== tools.select && this.active !== tools.line && this.active !== tools.feather) {
      this.actionModel.actions.push(this.currentElement);
      this.elementTab.push(this.currentElement);
    }
  }

  emitActive() {
    this.activeSubject.next(this.active);
  }

  setActive(active: number) {
    if (active !== tools.text) {
      this.textService.isEditing = false;
    }
    this.active = active;
    this.emitActive();
  }

  mouseWheel(wheelEvent: WheelEvent) {
    switch (this.active) {
      case tools.stamp:
        this.etampeService.mouseWheelRotation(wheelEvent, this.render);
        break;
      case tools.feather:
        this.plumeService.mouseWheelRotation(wheelEvent);
        break;
      default:
        break;
    }
  }

  doubleClick(render: Renderer2, point: Point, shiftKeyPressed: boolean) {
    switch (this.active) {
      case tools.line:
        this.lineService.stop(render, point, shiftKeyPressed);
        const svgElement = new SvgElement(this.nbElement++,  new Point(0, 0), new Point(0, 0), 0, 0, this.svg);
        const g = render.createElement('g', SVG_LINK);
        this.svg.nativeElement.appendChild(g);
        g.appendChild(this.lineService.element.parentNode);
        svgElement.element = this.lineService.element.parentNode as HTMLElement;
        this.elementTab.push(svgElement);
        this.actionModel.actions.push(svgElement);
        break;
      default:
        break;
    }
  }

  onEnter(render: Renderer2, point: Point) {
    switch (this.active) {
      case tools.eraser:
        this.eraserService.setSvg = this.svg;
        this.svg.nativeElement.appendChild(this.eraserService.createElement(render, point));
        break;
      default:
        break;
    }
  }

  onLeave(render: Renderer2, point: Point) {
    switch (this.active) {
      case tools.eraser:
        this.eraserService.deleteOldElement(render);
        break;
      default:
        break;
    }
  }

  deselectAll() {
    this.selectService.deselect(this.render, this.svg.nativeElement);
  }
  init(): void {
    this.deselectAll();
    this.actionModel.actions = [];
    this.actionModel.redoActions = [];
    this.nbElement = 0;
    this.currentElement = new SvgElement(0,  new Point(0, 0), new Point(0, 0), 0, 0, this.svg);
    this.isEmpty = false;
    this.setActive(tools.pencil);
  }
}
