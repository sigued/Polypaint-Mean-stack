import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { SVG_LINK } from '../constant';
import { Actions } from '../entity/action';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
import { ClipboardService } from './clipboard.service';
import { SelectService } from './select.service';

enum SelectionOption { COPY = 0, CUT = 1, PASTE = 2, DUPLICATE = 3, DELETE = 4, NONE= 5 }

@Injectable({
  providedIn: 'root',
})
export class HandlerselectionService {
  private render: Renderer2;
  private svg: ElementRef;
  private svgElements: SvgElement[];
  private lastGroupElements: SvgElement[];
  private decalage = 5;
  private action: SelectionOption;
  private actionModel: Actions;
  isCutting: boolean;
  wheelRotation: number;

  constructor(private selectService: SelectService, private clipboardService: ClipboardService) {
    this.lastGroupElements = [];
    this.isCutting = false;
    this.wheelRotation = 0;
    this.actionModel = Actions.getInstance();
  }

  handleSelection(option: SelectionOption): void {
    switch (option) {
      case SelectionOption.COPY:
        this.copy();
        break;
      case SelectionOption.CUT:
        this.cut();
        break;
      case SelectionOption.PASTE:
        this.paste();
        break;
      case SelectionOption.DUPLICATE:
        this.duplicate();
        break;
      case SelectionOption.DELETE:
        this.remove();
        break;
    }
  }

  remove(): void {
    for (const child of this.selectService.getSelectedElement()) {
      this.render.removeChild(this.svg.nativeElement, child.element);
      this.removeElement(child);
      this.actionModel.actions.push(this.selectService.selectedElement[this.selectService.selectedElement.length - 1]);
    }
    this.selectService.deselect(this.render, this.svg.nativeElement);
    this.selectService.initSelectedElement();
  }

  copy(): void {
    this.decalage = 5;
    this.action = SelectionOption.COPY;
    this.clipboardService.copy(this.selectService.selectedElement, this.svg);
    this.clipboardService.setExtremum(this.selectService.getExtremum());
    this.actionModel.actions.push(this.selectService.selectedElement[this.selectService.selectedElement.length - 1]);
  }

  cut(): void {
    this.decalage = 5;
    this.isCutting = true;
    this.action = SelectionOption.CUT;
    this.clipboardService.copy(this.selectService.selectedElement, this.svg);
    this.clipboardService.setExtremum(this.selectService.getExtremum());
    this.remove();
  }

  duplicate(): void {
    this.decalage = 5;
    this.action = SelectionOption.DUPLICATE;
    this.clipboardService.copy(this.selectService.selectedElement, this.svg);
    this.paste();
  }

  paste(): void {
    this.lastGroupElements = [];
    let extremum = new Point(0, 0);
    if (this.action === SelectionOption.COPY) {
      this.lastGroupElements = this.clipboardService.getElement();
      extremum = this.clipboardService.getExtremun();
    } else if (this.action === SelectionOption.CUT) {
      this.lastGroupElements = this.clipboardService.getElement();
      extremum = this.clipboardService.getExtremun();
      this.isCutting = false;
    }

    if (this.action === SelectionOption.DUPLICATE) {
      this.lastGroupElements = this.clipboardService.getElement();
      extremum = this.selectService.getExtremum();
    }

    if (this.lastGroupElements.length > 0) {
      this.translateSelectedGroup(extremum);
      this.selectService.deselect(this.render, this.svg.nativeElement);
      this.selectService.selectedElement = this.lastGroupElements;
      this.selectService.drawSelectItem(this.render, this.svg.nativeElement);

      this.clipboardService.copy(this.lastGroupElements, this.svg);
      this.clipboardService.setExtremum(this.selectService.getExtremum());
    }
    this.actionModel.actions.push(this.selectService.selectedElement[this.selectService.selectedElement.length - 1]);
    this.selectService.init();
  }

  translateSelectedGroup(extremun: Point): void {
    for (const child of this.lastGroupElements) {
      const g = this.render.createElement('g', SVG_LINK);
      g.appendChild(child.element);
      this.svg.nativeElement.appendChild(g);
      if ((extremun.x + 5) > this.svg.nativeElement.getBoundingClientRect().width ||
      (extremun.y + 5) > this.svg.nativeElement.getBoundingClientRect().height) {
        child.translatePoint = new Point(0, 0);
        this.decalage = 0;
      }

      const translatePoint = new Point(this.decalage + child.translatePoint.x, this.decalage + child.translatePoint.y);
      const newTransform =  'translate(' + this.decalage + ',' + this.decalage + ') ' +  child.transform;
      this.render.setAttribute(g, 'transform', newTransform);
      child.updateTranslate(translatePoint);
      child.setTransform(newTransform);
      this.svgElements.push(child);
    }
  }

  rotateSelectedGroup(wheelEvent: WheelEvent): void {
    this.lastGroupElements = this.selectService.selectedElement;
    for (const child of this.lastGroupElements) {
      let x = this.selectService.originPoint.x + this.selectService.width / 2;
      let y = this.selectService.originPoint.y + this.selectService.height / 2;

      if (wheelEvent.shiftKey) {
       x = Math.floor(child.getCenterX());
       y = Math.floor(child.getCenterY());
      }
      this.wheelRotation = 0;
      if (wheelEvent.deltaY > 0) {
        (wheelEvent.altKey) ? this.wheelRotation++ : this.wheelRotation += 15;
      } else {
        (wheelEvent.altKey) ? this.wheelRotation-- : this.wheelRotation -= 15;
      }
      const newTransform =  'rotate(' + this.wheelRotation + ' ' + x + ' ' + y + ')' +  child.transform;
      this.render.setAttribute(child.element.parentNode, 'transform',
      newTransform);
      child.setTransform(newTransform);
    }

    this.selectService.deselect(this.render, this.svg.nativeElement);
    this.selectService.selectedElement = this.lastGroupElements;
    this.selectService.drawSelectItem(this.render, this.svg.nativeElement);
  }

  selectAll() {
    this.selectService.init();
    this.selectService.selectAll(this.render, this.svg.nativeElement, this.svgElements);
  }

  createGroupContainer(): SVGElement {
    const g = this.render.createElement('g', SVG_LINK);
    this.render.appendChild(this.svg.nativeElement, g);
    return g;
  }

  init(render: Renderer2, svg: ElementRef, svgElements: SvgElement[]): void {
    this.render = render;
    this.svg = svg;
    this.svgElements = svgElements;
  }

  removeElement(element: SvgElement) {
    const index: number = this.svgElements.indexOf(element);
    if (index !== -1) {
        this.svgElements.splice(index, 1);
    }
    this.actionModel.redoActions.push(this.selectService.selectedElement[this.selectService.selectedElement.length - 1]);
  }
}
