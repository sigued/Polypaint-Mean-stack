import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
import { tools } from '../entity/tool/toolList';
import { ColorapplicatorService } from './colorapplicator.service';
import { PipetteService } from './pipette.service';
import { SelectService } from './select.service';

export enum ClickType { Left = 0, Right = 2}

@Injectable({
  providedIn: 'root',
})
export class SvgClickhandlerService {
  private active: number;
  private render: Renderer2;
  private svg: ElementRef;
  private svgElement: SvgElement[];

constructor(private pipetteService: PipetteService, private selectService: SelectService,
            private colorApplicator: ColorapplicatorService) {
  this.active = 0;
}

setRender(render: Renderer2): void {
  this.render = render;
}

setSvg(svg: ElementRef): void {
  this.svg = svg;
}

setSvgElement(elements: SvgElement[]): void {
  this.svgElement = elements;
}

setActive(active: number): void {
  this.active = active;
}

handleClick(element: HTMLElement): void {
  this.render.listen(element, 'click', ($event) => {
    this.applyClickAction($event, ClickType.Left);
  });

  this.render.listen(element, 'contextmenu', ($event) => {
    this.applyClickAction($event, ClickType.Right);
    return false;
  });

  this.render.listen(element, 'mouseup', ($event) => {
    this.applyClickAction($event, ClickType.Left, true);
  });

}

applyClickAction(event: MouseEvent, clickType: ClickType, mouseUp: boolean = false): void {
  const point = new Point(
    event.clientX - this.svg.nativeElement.getBoundingClientRect().x,
    event.clientY - this.svg.nativeElement.getBoundingClientRect().y );
  if (this.active === tools.pipette) {
    this.pipetteService.handlePipette(this.render, point, this.svg.nativeElement, clickType);
  } else if (this.active === tools.select) {
    if (mouseUp) {
      this.selectService.selectItem(event.target, this.render, this.svg.nativeElement, this.svgElement, clickType, point);
    }
  } else if (this.active === tools.colorApplicator) {
    this.colorApplicator.handleColor(event, this.render, clickType, this.active);
  }
}
}
