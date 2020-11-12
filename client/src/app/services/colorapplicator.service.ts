import { Injectable, Renderer2 } from '@angular/core';
import { Actions } from '../entity/action';
import { tools } from '../entity/tool/toolList';
import { ColorService } from './common/color.service';

@Injectable({
  providedIn: 'root',
})
export class ColorapplicatorService {
  private actionModel: Actions;

constructor(private colorService: ColorService) {
  this.actionModel = Actions.getInstance();
}

handleColor($event: MouseEvent, render: Renderer2, clickType: number, active: number) {
  if (active === tools.pen || active === tools.brush || active === tools.line) {
    if (clickType === 0) {
      render.setStyle($event.target, 'stroke', this.colorService.primaryColor.getValue());
    } else {
      render.setStyle($event.target, 'stroke', this.colorService.secondColor.getValue());
    }
  } else {
    if (clickType === 0) {
      render.setStyle($event.target, 'fill', this.colorService.primaryColor.getValue());
    } else {
      render.setStyle($event.target, 'stroke', this.colorService.secondColor.getValue());
    }
  }
  this.actionModel.actions.push();
}

}
