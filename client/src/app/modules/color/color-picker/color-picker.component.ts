import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  @Output() notify = new EventEmitter();
  gradient: string;
  color: string;
  opacity: number;

  opacityChanged() {
      const op = this.opacity / 100;
      const colorTemp = this.color.split(',');
      this.color = colorTemp[0] + ','  + colorTemp[1] + ',' + colorTemp[2] + ',' + op + ')';
  }

}
