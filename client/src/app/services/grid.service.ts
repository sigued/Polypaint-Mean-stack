
export class GridService {
  width: number;
  height: number;
  opacity: number;
  checked = false;

  constructor() {
    this.width = 10;
    this.height = 10;
    this.opacity = 5;
  }

  setOpacity(opacity: number): void {
    this.opacity = opacity / 100;
  }

  setHeight(height: number): void {
    this.height = height;
  }
  setWidth(width: number): void {
    this.width = width;
  }

  setAttributes(): void {
    if (!this.checked) {
      this.setHeight(10);
      this.setWidth(10);
      this.setOpacity(5);
      this.checked = true;
    } else {
      this.setHeight(0);
      this.setWidth(0);
      this.setOpacity(0);
      this.checked = false;
    }
  }

  returnWidth() {
    return this.checked ? this.width : 0;
  }

  returnHeight() {
    return this.checked ? this.height : 0;
  }
  decreaseWidthAndHeight(): void {
    this.height -= 5;
    this.width -= 5;
  }
  increaseWidthAndHeight(): void {
    this.height += 5;
    this.width += 5;
  }
}
