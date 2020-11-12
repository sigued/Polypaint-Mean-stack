import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';

export class SelectStub {
  height: number;
  width: number;
  originPoint: Point;
  firstPoint: Point;
  extremumPoint: Point;
  selectedElement: SvgElement[] = [];
  selectContainer: HTMLElement[] = [];
  selectItem() {/** */}
  getExtremum() {/**/}
  initSelectedElement() {/**/}
  deselect() {/**/}
  init() { /**/ }
  selectAll() {/** */}
  drawSelectItem() {/**/}
  getSelectedElement() {/**/}
  createElement() {/**/}
  update() {/**/}
  stop() {/** */}
}
