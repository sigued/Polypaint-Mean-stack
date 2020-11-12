import { Injectable, Renderer2 } from '@angular/core';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';
import { ColorService } from './common/color.service';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  width = '50';
  textureRef = 0;
  styleAttribute: string;
  initialStyleAttribute = 'stroke-linecap:round;stroke-linejoin:round;';
  path = '';

  constructor(private colorService: ColorService) {/** */ }

  createElement(render: Renderer2, point: Point, stroke: string, active: number) {
    const element = render.createElement('polyline', SVG_LINK);
    render.setAttribute(element, 'style', this.getAttribute(stroke, 'none'));
    render.setAttribute(element, 'points', this.getCurrentPath(point));

    if (active === 1) {
      if (this.textureRef > 0 && this.textureRef < 6) {
        render.setAttribute(element, 'filter', 'url(#texture' + this.textureRef + ')');
      }
    }
    render.listen(element, 'click', ($event) => {
      render.setStyle($event.target, 'stroke', this.colorService.primaryColor.getValue());
    });

    render.listen(element, 'contextmenu', ($event) => {
      render.setStyle($event.target, 'stroke', this.colorService.secondColor.getValue());
      return false;
    });

    return element;
  }

  update(render: Renderer2, point: Point, element: any, shiftKeyPressed: boolean) {
    render.setAttribute(element, 'points', this.getCurrentPath(point));
  }

  stop() {
    this.path = '';
  }

  getAttribute(primaryColor: string, secondColor: string): string {
    this.styleAttribute = this.initialStyleAttribute
     + 'stroke-width:' + this.width
     + ';stroke:' + primaryColor
     + ';fill:' + secondColor
     + ';';
    return this.styleAttribute;
  }

  getCurrentPath(point: Point): string {
    this.path += point.x + ',' + point.y + ' ';
    return this.path;
  }

  setWidth(width: string) {
    this.width = width;
  }

  setTextureRef(num: number) {
    this.textureRef = num;
  }
}
