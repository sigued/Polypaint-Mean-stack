import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RGBA_BLACK_COLOR } from 'src/app/constant';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
    primaryColor = new BehaviorSubject<string>(RGBA_BLACK_COLOR);
    secondColor = new BehaviorSubject<string>(RGBA_BLACK_COLOR);
    lastColorsTab: string[] = [];
    active  = 1;
    nbColor = 0;

      setPrimaryColor(color: string) {
        this.primaryColor.next(color);
      }

      setSecondColor(color: string) {
        this.secondColor.next(color);
      }

      setColor(color: string) {
        this.primaryColor.next(color);
      }

      setActive(active: number) {
        this.active = active;
      }

      updateActiveColor(active: number, value: string, isFromLastSelectedColor: number = 0 ) {
        if (active === 1) {
          this.primaryColor.next(value);
        } else {
          this.secondColor.next(value);
        }

        if (isFromLastSelectedColor === 0) {
            this.updateLastSelectedColor(value);
        }
      }

      swapColor() {
        const colorTemp = this.primaryColor.getValue();
        this.primaryColor.next(this.secondColor.getValue());
        this.secondColor.next(colorTemp);
      }

      updateLastSelectedColor(color: string) {
        if (this.nbColor >= 10) {
          this.nbColor = 0;
        }

        this.lastColorsTab[this.nbColor] = color;
        this.nbColor++;
      }

      fromRgbaToHexadecimal(rgba: string): string {
        // tslint:disable-next-line: one-variable-per-declaration
        const parts = rgba.substring(rgba.indexOf('(')).split(','),
        r = parseInt(this.trim(parts[0].substring(1)), 10),
        g = parseInt(this.trim(parts[1]), 10),
        b = parseInt(this.trim(parts[2]), 10);
        const a = parseFloat(this.trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2);
        return ('#' + r.toString(16) + g.toString(16) + b.toString(16) + (parseFloat(a) * 255).toString(16).substring(0, 2));
      }

      trim(str: string): string {
        return str.replace(/^\s+|\s+$/gm, '');
      }

}
