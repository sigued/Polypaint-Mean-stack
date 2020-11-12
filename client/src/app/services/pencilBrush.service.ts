import { Injectable, Renderer2 } from '@angular/core';
import { SVG_LINK } from '../constant';
import { Point } from '../entity/point';
import { ColorService } from './common/color.service';

@Injectable({
  providedIn: 'root',
})
export class PencilBrushService {
/** Property */
width = '1';
TextureRef = 0;
styleAttribute: string;
initialStyleAttribute = 'stroke-linecap:round;stroke-linejoin:round;';
path = '';

  createElement(render: Renderer2, point: Point, active: number) {
    const element = render.createElement('polyline', SVG_LINK);
    render.setAttribute(element, 'style', this.getAttribute(this.colorService.primaryColor.getValue(), 'none'));
    this.path += point.x + ',' + point.y + ' ';
    render.setAttribute(element, 'points', this.getCurrentPath(point));
    if (active === 1) {
      if (this.TextureRef > 0 && this.TextureRef < 6) {
        render.setAttribute(element, 'filter', 'url(#texture' + this.TextureRef + ')');
      }
    }
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
    this.TextureRef = num;
  }

constructor(private colorService: ColorService) { }

}
