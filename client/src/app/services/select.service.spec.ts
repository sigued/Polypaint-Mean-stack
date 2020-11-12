import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { SvgElement } from '../entity/svgElement';
import { MagnestismServiceStub } from '../stubs/magnetismService.stub';
import { NativeElementStub } from '../stubs/nativeelement.stub';
import { RenderStub } from '../stubs/render.stub';
import { MagnestismService } from './magnetism.service';
import { SelectService } from './select.service';

describe('Service: Select', () => {
  let selectService: SelectService;
  let magnestismService: MagnestismService;
  let render: Renderer2;

  let svgHTML: HTMLElement;
  let svg: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectService,
        { provide: Renderer2, useClass: RenderStub},
        { provide: MagnestismService, useClass: MagnestismServiceStub}],
    });
    selectService = TestBed.get(SelectService);
    magnestismService = TestBed.get(MagnestismService);
    render = TestBed.get(Renderer2);

    svgHTML = document.createElement('svg');
    svg = new ElementRef(svgHTML);
  });

  it('should be created', () => {
    magnestismService.corner = 'Top Left';
    expect(selectService).toBeDefined();
  });

  it('should have as height equal 0', () => {
    expect(selectService.height).toEqual(0);
  });

  it('should have as width equal 0', () => {
    expect(selectService.width).toEqual(0);
  });

  it('should have as originPoint Point(0, 0)', () => {
    expect(selectService.originPoint).toEqual(new Point(0, 0));
  });

  it('should have as firstPoint Point(0, 0)', () => {
    expect(selectService.firstPoint).toEqual(new Point(0, 0));
  });

  it('should have createElement call render.createElement ', () => {
    const point = new Point(0, 1);
    selectService.selectContainer = [];
    spyOn(selectService, 'setFirstPoint');
    selectService.createElement(render, point, svgHTML);
    expect(selectService.setFirstPoint).toHaveBeenCalledWith(point);
  });

  it('should have createElement call render.setAttribute', () => {
    spyOn(render, 'setAttribute');
    const point = new Point(0, 1);
    selectService.createElement(render, point, svgHTML);
    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should have createElement call setFirstPoint', () => {
    spyOn(selectService, 'setFirstPoint');
    const point = new Point(0, 1);
    selectService.createElement(render, point, svgHTML );
    expect(selectService.setFirstPoint).toHaveBeenCalledWith(point);
  });

  it('should have update call render.setAttribute 4 times', () => {
    spyOn(selectService, 'finaliseAttribute');
    spyOn(render, 'setAttribute');
    selectService.originPoint = new Point(1, 1);
    selectService.width = 10;
    selectService.height = 10;
    const point = new Point(0, 1);
    selectService.update(render, point, 1, svgHTML, true, true);
    expect(selectService.finaliseAttribute).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalledTimes(4);
  });

  it('should setFirstPoint', () => {
    const point = new Point(0, 1);
    selectService.setFirstPoint(point);
    expect(selectService.firstPoint).toEqual(point);
  });

  it('should have updateRectAttr call findUpperLeftCorner', () => {
    const point = new Point(0, 1);
    spyOn(selectService, 'findUpperLeftCorner');
    selectService.updateRectAttr(point);
    expect(selectService.findUpperLeftCorner).toHaveBeenCalledWith(point);
  });

  it('should have updateRectAttr call math.abs twice', () => {
    const point = new Point(0, 1);
    spyOn(Math, 'abs');
    selectService.updateRectAttr(point);
    expect(Math.abs).toHaveBeenCalledTimes(2);
  });

  it('should updateRectAttr ', () => {
    const point = new Point(0, 1);
    const expectedPoint = new Point(1, 0);
    spyOn(Math, 'abs').and.returnValue(5);
    spyOn(selectService, 'findUpperLeftCorner').and.returnValue(expectedPoint);
    selectService.updateRectAttr(point);
    expect(selectService.originPoint).toEqual(expectedPoint);
    expect(selectService.height).toEqual(5);
    expect(selectService.width).toEqual(5);
  });

  it('should findUpperLeftCorner with point.x > firstpoint.x', () => {
    const point = new Point(10, 0);
    selectService.firstPoint = new Point(0, 1);
    expect(selectService.findUpperLeftCorner(point).x).toEqual(selectService.firstPoint.x);
  });

  it('should findUpperLeftCorner with point.x < firstpoint.x', () => {
    const point = new Point(0, 1);
    selectService.firstPoint = new Point(1, 0);
    expect(selectService.findUpperLeftCorner(point).x).toEqual(point.x);
  });

  it('should findUpperLeftCorner with point.y > firstpoint.y', () => {
    const point = new Point(0, 10);
    selectService.firstPoint = new Point(1, 0);
    expect(selectService.findUpperLeftCorner(point).y).toEqual(selectService.firstPoint.y);
  });

  it('should findUpperLeftCorner with point.y < firstpoint.y', () => {
    const point = new Point(1, 0);
    selectService.firstPoint = new Point(0, 10);
    expect(selectService.findUpperLeftCorner(point).y).toEqual(point.y);
  });

  it('should findUpperLeftCorner with point = firstpoint ', () => {
    const point = new Point(1, 0);
    selectService.firstPoint = new Point(1, 0);
    expect(selectService.findUpperLeftCorner(point)).toEqual(point);
  });

  it('should finaliseAttribute', () => {
    const point = new Point(1, 0);
    spyOn(selectService, 'updateRectAttr');
    selectService.finaliseAttribute(point);
    expect(selectService.updateRectAttr).toHaveBeenCalledWith(point);
  });

  it('should stop updateRecSelect', () => {
    spyOn(selectService, 'updateSelectedElement').and.callFake((svgElements: SvgElement[]) => {
      const circle = document.createElement('circle');
      const svgElement = new SvgElement(1,  new Point(0, 0), new Point(0, 0), 0, 0, svg);
      svgElement.element = circle;
      selectService.selectedElement.push(svgElement);
    });
    spyOn(selectService, 'updateRecSelect');
    spyOn(selectService, 'drawContainer');
    // spyOn(selectService.selectedElement, 'length').and.returnValues(0, 1);
    selectService.originPoint = new Point(1, 1);
    selectService.width = 10;
    selectService.height = 10;
    const svgElements: SvgElement[] = [];

    const circle = document.createElement('circle');
    const svgElement = new SvgElement(1,  new Point(0, 0), new Point(0, 0), 0, 0, svg);
    svgElement.element = circle;
    svgElements.push(svgElement);
    const point = new Point(0, 1);
    selectService.stop(render, point, svgElements, svg.nativeElement, new Point(0, 0));
    
    expect(selectService.updateSelectedElement).toHaveBeenCalled();
    expect(selectService.updateRecSelect).toHaveBeenCalled();
    expect(selectService.drawContainer).toHaveBeenCalled();
  });

  it('should stop deselect', () => {
    spyOn(selectService, 'deselect');
    // spyOn(selectService.selectedElement, 'length').and.returnValues(0, 1);
    selectService.originPoint = new Point(1, 1);
    selectService.width = 10;
    selectService.height = 10;
    const svgElements: SvgElement[] = [];
    
    const circle = document.createElement('circle');
    const svgElement = new SvgElement(1,  new Point(0, 0), new Point(0, 0), 0, 0, svg);
    svgElement.element = circle;
    svgElements.push(svgElement);
    const point = new Point(0, 1);
    selectService.stop(render, point, svgElements, svg.nativeElement, new Point(0, 0));
    
    expect(selectService.deselect).toHaveBeenCalled();
  });


  it('should stop updateSelectedElement', () => {
    spyOn(selectService, 'updateSelectedElement');
    selectService.originPoint = new Point(1, 1);
    selectService.width = 10;
    selectService.height = 10;
    const svgElement: SvgElement[] = [];
    const point = new Point(0, 1);
    const nativeElement: NativeElementStub = new NativeElementStub();
    selectService.stop(render, point, svgElement, nativeElement, new Point(0, 0));
    expect(selectService.updateSelectedElement).toHaveBeenCalled();

  });

  
  it('should updateSelectedElement with no match', () => {
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    const item2 = new SvgElement(2, new Point(80, 80), new Point(80, 80), 20, 10, svg);
    item1.element = document.createElement('rect');
    item2.element = document.createElement('rect');
    const tab: SvgElement[] = [];
    tab.push();
    selectService.originPoint = new Point(0, 0);
    selectService.width = 100;
    selectService.height = 100;
    selectService.updateSelectedElement(tab);
    expect(selectService.selectedElement.length).toEqual(0);
  });

  it('should updateRecSelect with no item', () => {
    selectService.updateRecSelect();
    expect(selectService.height).toEqual(0);
    expect(selectService.width).toEqual(0);
  });

  it('should updateRecSelect with width only', () => {
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    const item2 = new SvgElement(2, new Point(80, 80), new Point(80, 80), 20, 10, svg);
    item1.element = document.createElement('rect');
    item2.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedElement.push(item2);
    selectService.originPoint = new Point(0, 0);
    selectService.width = 200;
    selectService.height = 200;
    spyOn(item1, 'getX').and.returnValue(100);
    selectService.updateRecSelect();
    expect(selectService.width).toEqual(100);
  });

  it('should updateRecSelect with height', () => {
    const item1 = new SvgElement(1, new Point(2, 2), new Point(1, 1), 10, 10, svg);
    const item2 = new SvgElement(2, new Point(220, 200), new Point(230, 230), 20, 10, svg);
    item1.element = document.createElement('rect');
    item2.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedElement.push(item2);
    selectService.originPoint = new Point(0, 0);
    selectService.width = 80;
    selectService.height = 80;
    spyOn(item1, 'getY').and.returnValue(100);
    spyOn(item1, 'getX').and.returnValue(100);
    selectService.updateRecSelect();
    expect(selectService.height).toEqual(100);
    expect(selectService.width).toEqual(100);
  });

  it('should deselect objects ', () => {
    const item1 = document.createElement('rec');
    const target = document.createElement('rec');
    target.setAttribute('id', 'grille');
    selectService.selectContainer.push(item1);
    const emptyTab: HTMLElement[] = [];
    spyOn(render, 'removeChild');
    
    selectService.deselect(render, svgHTML);
    expect(render.removeChild).toHaveBeenCalled();
    expect(selectService.selectContainer).toEqual(emptyTab);
  });

  it('should init ', () => {
    selectService.init();
    expect(selectService.originPoint).toEqual(new Point(0, 0));
    expect(selectService.firstPoint).toEqual(new Point(0, 0));
    expect(selectService.width).toEqual(0);
    expect(selectService.height).toEqual(0);
  });

  it('should deleteElement ', () => {
    const item1 = new SvgElement(1, new Point(2, 2), new Point(1, 1), 10, 10, svg);
    const tab: SvgElement[] = [];
    tab.push(item1);
    selectService.deleteElement(item1, tab);
    expect(tab.length).toEqual(0);
  });

  it('should select all ', () => {
    const item1 = new SvgElement(1, new Point(2, 2), new Point(1, 1), 10, 10, svg);
    const tab: SvgElement[] = [];
    tab.push(item1);

    selectService.selectedElement = [];
    spyOn(selectService, 'initSelectedElement');
    spyOn(selectService, 'deselect');
    spyOn(selectService, 'drawSelectItem');
    selectService.selectAll(render, svg, tab);
    expect(selectService.initSelectedElement).toHaveBeenCalled();
    expect(selectService.deselect).toHaveBeenCalled();
    expect(selectService.drawSelectItem).toHaveBeenCalled();
  });

  it('should initSelectedElement ', () => {
    const item1 = new SvgElement(1, new Point(2, 2), new Point(1, 1), 10, 10, svg);
    selectService.selectedElement.push(item1);
    selectService.initSelectedElement();
    expect(selectService.selectedElement.length).toEqual(0);
  });

  it('should return selectedElements ', () => {
    const item1 = new SvgElement(1, new Point(2, 2), new Point(1, 1), 10, 10, svg);
    const tab: SvgElement[] = [];
    tab.push(item1);
    selectService.selectedElement = tab;
    expect(selectService.getSelectedElement()).toEqual(tab);
  });

  it('should return Extremeun ', () => {
    const expectedValue = new Point(0, 0);
    selectService.extremumPoint = expectedValue;
    expect(selectService.getExtremum()).toEqual(expectedValue);
  });

  it('should find an object', () => {
    const item1 = new SvgElement(1, new Point(2, 2), new Point(1, 1), 10, 10, svg);
    item1.element = document.createElement('rect');
    const tab: SvgElement[] = [];
    tab.push(item1);
    expect(selectService.find(item1.element, tab)).toEqual(item1);
  });

  it('should not find any object', () => {
    const item1 = new SvgElement(1, new Point(2, 2), new Point(1, 1), 10, 10, svg);
    const item2 = new SvgElement(1, new Point(2, 2), new Point(1, 1), 10, 10, svg);
    item1.element = document.createElement('rect');
    item2.element = document.createElement('circle');
    const tab: SvgElement[] = [];
    tab.push(item2);
    expect(selectService.find(item1.element, tab)).toEqual(null);
  });

  it('should create circle', () => {
    selectService.selectContainer = [];
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    spyOn(render, 'createElement').and.returnValue(circle);
    spyOn(render, 'setAttribute');
    selectService.createCircle(render, 10, 10, 'allo');
    expect(render.createElement).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalledTimes(4);
  });

  it('should selectItem with left click', () => {
    spyOn(selectService.mouseDownPoint, 'isSamePoint').and.returnValue(true);
    const item1 = new SvgElement(1, new Point(2, 2), new Point(1, 1), 10, 10, svg);
    item1.element = document.createElement('rec');
    const tab: SvgElement[] = [];
    tab.push(item1);
    selectService.selectedElement = tab;
    spyOn(selectService, 'find');
    spyOn(selectService, 'drawSelectItem');
    selectService.selectItem(item1.element, render, svg, tab, 0, new Point(1, 1));
    expect(selectService.find).toHaveBeenCalled();
    expect(selectService.selectedElement.length).toEqual(1);
    expect(selectService.drawSelectItem).toHaveBeenCalled();
  });

  it('should deselect all objects and select one ', () => {
    const item1 = new SvgElement(1, new Point(2, 2), new Point(1, 1), 10, 10, svg);
    item1.element = document.createElement('rec');
    const tab: SvgElement[] = [];
    tab.push(item1);
    selectService.selectedElement = [];
    spyOn(selectService, 'find').and.returnValue(item1);
    spyOn(selectService, 'drawSelectItem');
    spyOn(selectService.mouseDownPoint, 'isSamePoint').and.returnValue(true);
    selectService.selectItem(item1.element, render, svg, tab, 0, new Point(1, 1));
    expect(selectService.find).toHaveBeenCalled();
    expect(selectService.drawSelectItem).toHaveBeenCalled();
    expect(selectService.selectedElement.length).toEqual(1);
  });

  it('should draw selected item ', () => {
    const rec = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    spyOn(render, 'createElement').and.returnValue(rec);
    spyOn(render, 'setAttribute');
    spyOn(selectService, 'updateRecSelect');
    spyOn(selectService, 'drawContainer');
    selectService.drawSelectItem(render, svg.nativeElement);
    expect(render.createElement).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalled();
    expect(selectService.updateRecSelect).toHaveBeenCalled();
    expect(selectService.drawContainer).toHaveBeenCalled();
  });

  it('should drawContainer for selected item ', () => {
    const rec = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    selectService.originPoint = new Point(5, 5);
    selectService.height = 10;
    selectService.width = 10;
    spyOn(render, 'setAttribute');
    spyOn(selectService, 'createCircle').and.returnValue(circle);
    selectService.drawContainer(rec, render, svg.nativeElement);
    expect(render.setAttribute).toHaveBeenCalledTimes(4);
    expect(selectService.createCircle).toHaveBeenCalledTimes(8);
  });

  it('should stop resizeSelectedItem topLeft altKey = true shiftKey = true', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromTopLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromBottomRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 1;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = true;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.getMinCoord).toHaveBeenCalled();
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromTopLeft).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromBottomRight).toHaveBeenCalled();

  });

  it('should stop resizeSelectedItem topLeft altKey = false shiftKey = true', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromTopLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromBottomRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 1;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = true;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.getMinCoord).toHaveBeenCalled();
    expect(selectService.applyScale).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromTopLeft).toHaveBeenCalled();
  });

  it('should stop resizeSelectedItem topLeft altKey = true shiftKey = false', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromTopLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromBottomRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 1;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromTopLeft).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromBottomRight).toHaveBeenCalled();

  });

  it('should stop resizeSelectedItem topLeft altKey = false shiftKey = false', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromTopLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromBottomRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 1;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(1);
    expect(selectService['resizeService'].resizeFromTopLeft).toHaveBeenCalled();

  });

  it('should stop resizeSelectedItem topCenter altKey = true shiftKey = false', () => {
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromTopCenter').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromBottomCenter').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 2;
    const currentPoint = new Point(1, 1);
    selectService.firstScalePoint = new Point(10, 10);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromTopCenter).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromBottomCenter).toHaveBeenCalled();
  });

  it('should stop resizeSelectedItem topCenter altKey = false shiftKey = false', () => {
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromTopCenter').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromBottomCenter').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 2;
    const currentPoint = new Point(1, 1);
    selectService.firstScalePoint = new Point(10, 10);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromTopCenter).toHaveBeenCalled();
  });

  
  it('should stop resizeSelectedItem topRight altKey = true shiftKey = true', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 3;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = true;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.getMinCoord).toHaveBeenCalled();
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromBottomLeft).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromTopRight).toHaveBeenCalled();

  });

  it('should stop resizeSelectedItem topRight altKey = false shiftKey = true', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 3;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = true;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.getMinCoord).toHaveBeenCalled();
    expect(selectService.applyScale).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromTopRight).toHaveBeenCalled();
  });

  it('should stop resizeSelectedItem topRight altKey = true shiftKey = false', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 3;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromBottomLeft).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromTopRight).toHaveBeenCalled();

  });

  it('should stop resizeSelectedItem topRight altKey = false shiftKey = false', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 3;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(1);
    expect(selectService['resizeService'].resizeFromTopRight).toHaveBeenCalled();

  });


it('should stop resizeSelectedItem CENTERLEFT altKey = true shiftKey = false', () => {
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromCenterLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromCenterRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 4;
    const currentPoint = new Point(1, 1);
    selectService.firstScalePoint = new Point(10, 10);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromCenterLeft).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromCenterRight).toHaveBeenCalled();
  });

  it('should stop resizeSelectedItem CENTERLEFT altKey = false shiftKey = false', () => {
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromCenterLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromCenterRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 4;
    const currentPoint = new Point(1, 1);
    selectService.firstScalePoint = new Point(10, 10);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromCenterLeft).toHaveBeenCalled();
  });

  it('should stop resizeSelectedItem CENTERRIGHT altKey = true shiftKey = false', () => {
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromCenterRight').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromCenterLeft').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 5;
    const currentPoint = new Point(1, 1);
    selectService.firstScalePoint = new Point(10, 10);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromCenterRight).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromCenterLeft).toHaveBeenCalled();
  });

  it('should stop resizeSelectedItem CENTERRIGHT altKey = false shiftKey = false', () => {
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromCenterRight').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromCenterLeft').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 5;
    const currentPoint = new Point(1, 1);
    selectService.firstScalePoint = new Point(10, 10);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromCenterRight).toHaveBeenCalled();
  });


  it('should stop resizeSelectedItem BOTTOMLEFT altKey = true shiftKey = true', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 6;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = true;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.getMinCoord).toHaveBeenCalled();
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromBottomLeft).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromTopRight).toHaveBeenCalled();

  });

  it('should stop resizeSelectedItem BOTTOMLEFT altKey = false shiftKey = true', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 6;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = true;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.getMinCoord).toHaveBeenCalled();
    expect(selectService.applyScale).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromBottomLeft).toHaveBeenCalled();
  });

  it('should stop resizeSelectedItem BOTTOMLEFT altKey = true shiftKey = false', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 6;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromBottomLeft).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromTopRight).toHaveBeenCalled();

  });

  it('should stop resizeSelectedItem BOTTOMLEFT altKey = false shiftKey = false', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomLeft').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopRight').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 6;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(1);
    expect(selectService['resizeService'].resizeFromBottomLeft).toHaveBeenCalled();

  });

  it('should stop resizeSelectedItem BOTTOMCENTER altKey = true shiftKey = false', () => {
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomCenter').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopCenter').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 7;
    const currentPoint = new Point(1, 1);
    selectService.firstScalePoint = new Point(10, 10);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromBottomCenter).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromTopCenter).toHaveBeenCalled();
  });

  it('should stop resizeSelectedItem BOTTOMCENTER altKey = false shiftKey = false', () => {
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomCenter').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopCenter').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 7;
    const currentPoint = new Point(1, 1);
    selectService.firstScalePoint = new Point(10, 10);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromBottomCenter).toHaveBeenCalled();
  });

  it('should stop resizeSelectedItem BOTTOMRIGHT altKey = true shiftKey = true', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomRight').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopLeft').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 8;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = true;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.getMinCoord).toHaveBeenCalled();
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromBottomRight).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromTopLeft).toHaveBeenCalled();

  });

  it('should stop resizeSelectedItem BOTTOMRIGHT altKey = false shiftKey = true', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomRight').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopLeft').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 8;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = true;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.getMinCoord).toHaveBeenCalled();
    expect(selectService.applyScale).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromBottomRight).toHaveBeenCalled();
  });

  it('should stop resizeSelectedItem BOTTOMRIGHT altKey = true shiftKey = false', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomRight').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopLeft').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 8;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = true;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(2);
    expect(selectService['resizeService'].resizeFromBottomRight).toHaveBeenCalled();
    expect(selectService['resizeService'].resizeFromTopLeft).toHaveBeenCalled();

  });

  it('should stop resizeSelectedItem BOTTOMRIGHT altKey = false shiftKey = false', () => {
    spyOn(selectService, 'getMinCoord');
    spyOn(selectService, 'applyScale');
    spyOn(selectService['resizeService'], 'resizeFromBottomRight').and.returnValue('test');
    spyOn(selectService['resizeService'], 'resizeFromTopLeft').and.returnValue('test');
    
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    item1.element = document.createElement('rect');
    selectService.selectedElement.push(item1);
    selectService.selectedControlPoint = 8;
    const currentPoint = new Point(1, 1);
    const HTMLSVGElement = svg.nativeElement;
    const shiftKey = false;
    const altKey = false;

    selectService.resizeSelectedItem(currentPoint, render, HTMLSVGElement, shiftKey, altKey);
    expect(selectService.applyScale).toHaveBeenCalledTimes(1);
    expect(selectService['resizeService'].resizeFromBottomRight).toHaveBeenCalled();

  });

  it('should getMinCoord', () => {
    spyOn(Math, 'min');
    const point = new Point(1, 2);
    selectService.getMinCoord(point);
    expect(Math.min).toHaveBeenCalled();
  });

  it('should applyScale', () => {
    spyOn(render, 'setAttribute');
    
    const circle = document.createElement('circle');
    const svgElement = new SvgElement(1,  new Point(0, 0), new Point(0, 0), 0, 0, svg);
    svgElement.element = circle;
    selectService.applyScale(render, svgElement, 'test');

    expect(render.setAttribute).toHaveBeenCalled();
  });

  it('should isIncontactWithControlPoint', () => {
    spyOn(render, 'setAttribute');
    const svg = document.createElement('svg');
    const selectContainer: HTMLElement[] = []
    selectContainer.push(svg);
    selectContainer.push(svgHTML);
    // spyOnProperty(selectService, 'selectContainer').and.returnValue(selectContainer);
    selectService.selectContainer = selectContainer
    spyOn(selectService.selectContainer[0], 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    spyOn(selectService.selectContainer[1], 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0});
    selectService.point = new Point(0, 0);
    selectService.isIncontactWithControlPoint(svg);
    expect(svg.getBoundingClientRect).toHaveBeenCalledTimes(6);
  
  });

  it('should isIncontactWithControlPoint', () => {
    spyOn(render, 'setAttribute');
    const svg = document.createElement('svg');
    const selectContainer: HTMLElement[] = []
    selectContainer.push(svg);
    selectContainer.push(svgHTML);
    // spyOnProperty(selectService, 'selectContainer').and.returnValue(selectContainer);
    selectService.selectContainer = selectContainer
    spyOn(selectService.selectContainer[0], 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 1000, right: 0, top: 1000});
    spyOn(selectService.selectContainer[1], 'getBoundingClientRect').and.returnValue({width: 0, height: 0, bottom: 0, left: 1000, right: 0, top: 1000});
    selectService.point = new Point(-10000, -10000);
    const returned = selectService.isIncontactWithControlPoint(svg);
    expect(svg.getBoundingClientRect).toHaveBeenCalledTimes(2);
    expect(returned).toEqual(0);
  
  });

  it('should moveSelectedItem', () => {
    spyOn(render, 'setAttribute');
    const circle = document.createElement('circle');
    const svgElement = new SvgElement(1,  new Point(0, 0), new Point(0, 0), 0, 0, svg);
    svgElement.element = circle;
    const selectedElement: SvgElement[] = [];
    selectedElement.push(svgElement);
    selectService.selectedElement = selectedElement;
    spyOn(selectService.selectedElement[0], 'updateTranslate');
    spyOn(selectService.selectedElement[0], 'setTransform');

    selectService.moveSelectedItem(render, new Point(0, 0));
    expect(svgElement.updateTranslate).toHaveBeenCalled();
    expect(svgElement.setTransform).toHaveBeenCalled();
    expect(render.setAttribute).toHaveBeenCalled(); 
  });

  it('should updateSelectedElement ', () => {
    const item1 = new SvgElement(1, new Point(100, 200), new Point(100, 200), 10, 10, svg);
    const item2 = new SvgElement(2, new Point(80, 80), new Point(80, 80), 20, 10, svg);
    item1.element = document.createElement('rect');
    item2.element = document.createElement('rect');
    const tab: SvgElement[] = [];
    tab.push(item1);
    tab.push(item2);
    selectService.originPoint = new Point(0, 0);
    selectService.width = 100;
    selectService.height = 100;
    spyOn(item1, 'isInRange').and.returnValue(true);
    spyOn(item2, 'isInRange').and.returnValue(true);
    spyOn(selectService.selectedElement, 'push');


    selectService.updateSelectedElement(tab);
    expect(selectService.selectedElement.push).toHaveBeenCalledTimes(2);
  });


});
