import { CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Point } from '../entity/point';
import { RenderStub } from '../stubs/render.stub';
import { SprayService } from './spray.service';

declare var require: any;
// tslint:disable-next-line:no-require-imports no-var-requires
const { IntersectionQuery } = require('kld-intersections');
// tslint:disable-next-line:no-require-imports no-var-requires
const { Point2D } = require('kld-affine');

const SVG_LINK = 'http://www.w3.org/2000/svg';
const circleSVG = (): SVGElement => {
  return document.createElementNS(SVG_LINK, 'circle');
};
const waitOneDecisecond = async (): Promise <void> => {
  setTimeout( () => { console.log('waiting...'); }, 100 );
};

describe('SprayService', () => {
  let service: SprayService;
  let render: Renderer2;
  let svg: SVGElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [SprayService,
        {provide: Renderer2, useClass: RenderStub}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service =  TestBed.get(SprayService);
    render = TestBed.get(Renderer2);
    const svgRect = document.createElementNS(SVG_LINK, 'rect');
    svgRect.setAttribute('x', '0');
    svgRect.setAttribute('y', '0');
    svgRect.setAttribute('width', '100');
    svgRect.setAttribute('height', '100');
    svg = svgRect;
  });

  afterEach( async () => {
    clearInterval(service['previousTimer']);
    clearInterval();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set radius at 4', () => {
    service['setRadius'] = 4;
    expect(service['radius']).toEqual(4);
  });

  it('should set quantity at 4', () => {
    service['setQuantity'] = 4;
    expect(service['quantity']).toEqual(12);
  });

  it('should create 3 element inside the g element', () => {
    service.setQuantity = 1;
    const groupEl = document.createElementNS(SVG_LINK, 'g');
    service['gElement'] = groupEl;
    spyOn(render, 'createElement').and.returnValues(groupEl, circleSVG(), circleSVG(), circleSVG());
    const returnValue =  service.create(render, new Point(1, 1), svg);
    expect(returnValue.children.length).toEqual(3);
  });

  it('should create a point who can be inside a cricle', () => {
    const pointReturn = service['getCorrectCoord'](new Point(5, 5));
    const pointTest = new Point2D(pointReturn.x, pointReturn.y);
    const isInside = IntersectionQuery.pointInCircle(
      pointTest,
      new Point2D( 5, 5),
      7);
    expect(isInside).toEqual(true);
  });

  it('should create a little circle', () => {
    const setAtt = spyOn(render, 'setAttribute');
    const setSty = spyOn(render, 'setStyle');
    service['createPoint'](render, new Point(5, 5));
    expect(setAtt).toHaveBeenCalledTimes(3);
    expect(setSty).toHaveBeenCalled();
  });

  it('should create more points if the mouse is not mouve', async () => {
    const createdG = document.createElementNS(SVG_LINK, 'g');
    spyOn(render, 'createElement').and.returnValues(createdG, circleSVG(), circleSVG(),
      circleSVG(), circleSVG(), circleSVG(), circleSVG(), circleSVG(), circleSVG(), circleSVG());
    const elemG = service.create(render, new Point(1, 1), svg);
    const firstTimer: NodeJS.Timer = service['previousTimer'];
    expect(elemG.children.length).toEqual(3);
    waitOneDecisecond().then(() => {
      const secondTimer: NodeJS.Timer = service['previousTimer'];
      expect(firstTimer).toEqual(secondTimer);
    });
  });

  it('should stop the spray effect', () => {
    const createdG = document.createElementNS(SVG_LINK, 'g');
    spyOn(render, 'createElement').and.returnValues(createdG, circleSVG(), circleSVG(), circleSVG(), circleSVG(), circleSVG(), circleSVG());
    service.create(render, new Point(1, 1), svg);
    const firstTimer: NodeJS.Timer = service['previousTimer'];
    service.stop(render, new Point(1, 1));
    waitOneDecisecond().then( () => {
      const secondTimer: NodeJS.Timer = service['previousTimer'];
      expect(firstTimer).toEqual(secondTimer);
    });
  });

  it('should update the spray', () => {
    const createdG = document.createElementNS(SVG_LINK, 'g');
    spyOn(render, 'createElement').and.returnValue(createdG);
    const timerSpy = spyOn<any>(service, 'timerSpray');
    service.update(render, new Point(5, 5));
    expect(timerSpy).toHaveBeenCalled();
  });
});
