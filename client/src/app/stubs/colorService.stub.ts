import { BehaviorSubject } from 'rxjs';

export class ColorServiceStub {
    primaryColor = new BehaviorSubject<string>('rgb(155,150,155)');
    secondColor = new  BehaviorSubject<string>('rgb(155,150,155)');
    active = 1;
    lastColorTab: string[];
    updateActiveColor() {/** */}
    getActiveColor() {/** */}
    setPrimaryColor() {/** */}
    setSecondColor() {/** */}
    setActive() {/** */}
    swapColor() {/** */}
    setColor() {/** */}
    updateLastSelectedColor() {/** */}
    fromRgbaToHexadecimal() {/** */}
  }
