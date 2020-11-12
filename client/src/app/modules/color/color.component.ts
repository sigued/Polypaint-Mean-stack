import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawingZoneParametersService } from 'src/app/services/common/drawingZoneParameters.service';
import { ColorService } from '../../services/common/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent  implements OnInit {
  constructor(public colorService: ColorService, private drawingZoneParameterService: DrawingZoneParametersService) { }
  primaryColor: string;
  secondColor: string;
  active: number;
  paletteIsUsing: boolean;
  colorPrimarySubscription: Subscription;
  colorSecondSubscription: Subscription;

  onNotify(rgba: string) {
    if (this.active === 3) {
      this.drawingZoneParameterService.setBackgroundColor(rgba);
    } else {
      let color = this.getActiveColor();
      color = this.colorService.fromRgbaToHexadecimal(rgba);
      this.colorService.updateActiveColor(this.active, color);
    }
  }

  getActiveColor(): string {
    return (this.active === 1) ? this.primaryColor : this.secondColor;
  }

  primaryColorChange() {
    if (this.isValidHex(this.primaryColor)) {
      this.colorService.setPrimaryColor(this.primaryColor);
    } else {
      this.primaryColor = this.colorService.primaryColor.getValue();
      window.alert('Invalid Color');
    }

  }

  openPalette() {
    this.paletteIsUsing = true;
  }
  closePalette() {
    this.paletteIsUsing = false;
  }

  secondColorChange() {
    if (this.isValidHex(this.secondColor)) {
      this.colorService.setSecondColor(this.secondColor);
    } else {
      this.secondColor = this.colorService.secondColor.getValue();
      window.alert('Invalid Color');
    }
  }

  onActiveSelectionChange(value: number) {
    this.active = value;
    this.colorService.setActive(this.active);
  }

  setColorFromLastSelectedColor(color: string) {
    this.colorService.updateActiveColor(this.active, color, 1);
  }

  swapColor() {
    const temp = this.primaryColor;
    this.primaryColor = this.secondColor;
    this.secondColor = temp;
    this.colorService.swapColor();
  }

  ngOnInit() {
    this.primaryColor = this.colorService.primaryColor.getValue();
    this.secondColor = this.colorService.secondColor.getValue();
    this.active = this.colorService.active;

    this.colorPrimarySubscription = this.colorService.primaryColor.subscribe((color) => {
        this.primaryColor = color;
    });

    this.colorSecondSubscription = this.colorService.secondColor.subscribe((color) => {
      this.secondColor = color;
    });
  }

  isValidHex(color: string) {
    if (!color || typeof color !== 'string') { return false; }
    if (color.substring(0, 1) === '#') { color = color.substring(1); }

    switch (color.length) {
      case 3: return /^[0-9A-F]{3}$/i.test(color);
      case 6: return /^[0-9A-F]{6}$/i.test(color);
      case 8: return /^[0-9A-F]{8}$/i.test(color);
      default: return false;
    }
  }

}
