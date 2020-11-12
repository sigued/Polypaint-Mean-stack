import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Point } from 'src/app/entity/point';
import { ColorPaletteComponent } from './color-palette.component';

describe('ColorPaletteComponent', () => {
  let component: ColorPaletteComponent;
  let fixture: ComponentFixture<ColorPaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPaletteComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngAfterViewInit is called it should generate a canvas with a black gradient', () => {
    component.ngAfterViewInit();
    const width = 250;
    const height = 250;
    const blackGradient = 'rgba(0,0,0,1)';
    expect(component.getRGBA(width, height)).toEqual(blackGradient);
  });

  it('when generatePalette is called it should generate a canvas with a black gradient', () => {
    component.generatePalette();
    const width = 250;
    const height = 250;
    const blackGradient = 'rgba(0,0,0,1)';

    expect(component.getRGBA(width, height)).toEqual(blackGradient);

  });

  it('when generatePalette is called it should generate a canvas with a black gradient', () => {
    component.selectedGradient = 'test';
    component.generatePalette();
    const width = 250;
    const height = 250;
    const blackGradient = 'rgba(0,0,0,1)';

    expect(component.getRGBA(width, height)).toEqual(blackGradient);

  });

  it('onMouseUp the value of isDown property should be false', () => {
    const initialMouseEvent = false;
    component.onMouseUp('mouseup');
    const newMouseEvent = component['isDown'];

    expect(newMouseEvent).toEqual(initialMouseEvent);
  });

  it('onMouseDown the value of rbga should emit an rgba color', () => {
    spyOn(component.ctx, 'getImageData').and.callFake((x: number, y: number, w: number, h: number) => {
      const array = new Uint8ClampedArray(4);
      array[0] = 128;
      array[1] = 0;
      return new ImageData(array, 1, 1);
    });
    spyOn(component.color, 'emit').and.callFake((value: string) => {
      value = 'rgba(128,0,0,1)';
    });
    component.onMouseDown('mousedown');
    expect(component.color.emit).toHaveBeenCalledWith('rgba(128,0,0,1)');
  });

  it('onMouseMove the value of rbga should emit an rgba color', () => {
    component['isDown'] =  true;
    spyOn(component.ctx, 'getImageData').and.callFake((x: number, y: number, w: number, h: number) => {
      const array = new Uint8ClampedArray(4);
      array[0] = 128;
      array[1] = 0;
      return new ImageData(array, 1, 1);
    });
    spyOn(component.color, 'emit').and.callFake((value: string) => {
      value = 'rgba(128,0,0,1)';
    });
    component.onMouseMove('mousemove');
    expect(component.color.emit).toHaveBeenCalledWith('rgba(128,0,0,1)');
  });

  it('onMouseMove the value of rbga should emit an rgba color', () => {
    component['isDown'] =  true;
    spyOn(component.ctx, 'getImageData').and.callFake((x: number, y: number, w: number, h: number) => {
      const array = new Uint8ClampedArray(4);
      array[0] = 128;
      array[1] = 0;
      return new ImageData(array, 1, 1);
    });
    spyOn(component.color, 'emit');
    component.onMouseMove('mousemove');
    expect(component.color.emit).toHaveBeenCalledWith('rgba(128,0,0,1)');
  });

  it('emitColor should emit an rgba color', () => {

    spyOn(component, 'getRGBA').and.callFake((x: number, y: number) => {
      return 'rgba(128,0,0,1)';
    });

    spyOn(component.color, 'emit');
    component.emitColor(250, 250);
    expect(component.color.emit).toHaveBeenCalledWith('rgba(128,0,0,1)');
  });

  it('getRGBA should should an rgba color', () => {

    spyOn(component.ctx, 'getImageData').and.callFake((x: number, y: number, w: number, h: number) => {
      const array = new Uint8ClampedArray(4);
      array[0] = 128;
      array[1] = 0;
      return new ImageData(array, 1, 1);
    });

    const rgbaColor = component.getRGBA(250, 250);

    expect(rgbaColor).toEqual('rgba(128,0,0,1)');
  });

  it('when ngOnchange is called it should generate a canvas with a black gradient', () => {
    spyOn(component, 'generatePalette');
    spyOn(component.color, 'emit');
    component.selectedGradient = 'rgba(128, 0, 0, 1)';
    component.ngOnChanges({selectedGradient: new SimpleChange(null, component.selectedGradient, true)});
    expect(component.generatePalette).toHaveBeenCalled();
    expect(component.color.emit).toHaveBeenCalledTimes(0);
  });

  it('when ngOnchange is called it should generate a canvas with a black gradient', () => {
    spyOn(component, 'generatePalette');
    spyOn(component.color, 'emit');
    component.selectedGradient = 'rgba(128, 0, 0, 1)';
    component.selectedColor = new Point(1, 1);
    component.ngOnChanges({selectedGradient: new SimpleChange(null, component.selectedGradient, true)});
    expect(component.generatePalette).toHaveBeenCalled();
    expect(component.color.emit).toHaveBeenCalled();
  });

  it('when ngOnchange is called with other simple change it not should generate a canvas with a black gradient', () => {
    spyOn(component, 'generatePalette');
    spyOn(component.color, 'emit');
    component.selectedColor = new Point(1, 1);
    component.ngOnChanges({test: new SimpleChange(null, null, true)});
    expect(component.generatePalette).toHaveBeenCalledTimes(0);
    expect(component.color.emit).toHaveBeenCalledTimes(0);
  });

  it('it should selectedGradient', () => {
    component.setSelectedChanges('test');
    expect(component.selectedGradient).toEqual('test');
  });

  it('it should selectedGradient', () => {
    spyOn(component, 'generatePalette');
    component.isDown = false;
    component.onMouseMove('test');
    expect(component.generatePalette).toHaveBeenCalledTimes(0);
  });
});
