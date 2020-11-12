import { BehaviorSubject } from 'rxjs';
import { ColorService } from './color.service';

describe('Service: Color', () => {
  let service: ColorService;

  beforeEach(() => {
    service = new ColorService();
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('setPrimaryColor', () => {
    const color = new BehaviorSubject<string>('white');
    const colorNext = 'white';
    service.setPrimaryColor(colorNext);
    expect(service.primaryColor).toEqual(color);
  });

  it('setSecondColor', () => {
    const color = new BehaviorSubject<string>('white');
    const colorNext = 'white';
    service.setSecondColor(colorNext);
    expect(service.secondColor).toEqual(color);
  });

  it('setColor', () => {
    const color = 'white';
    spyOn(service.primaryColor, 'next').and.callThrough();
    service.setColor(color);
    expect(service.primaryColor.next).toHaveBeenCalled();
  });

  it('setActive', () => {
    const active = 3;
    service.setActive(active);
    expect(service.active).toEqual(active);
  });

  it('when swapColor is called', () => {
    spyOn(service, 'swapColor').and.callThrough();
    spyOn(service.primaryColor, 'next').and.callThrough();
    spyOn(service.secondColor, 'next').and.callThrough();
    service.swapColor();

    expect(service.swapColor).toHaveBeenCalled();
    expect(service.primaryColor.next).toHaveBeenCalled();
    expect(service.secondColor.next).toHaveBeenCalled();
  });

  it('when updateActiveColor is called and active = 1', () => {
    const active = 1;
    const value = '12';
    const isFromLastSelectedColor = 1;
    spyOn(service.primaryColor, 'next').and.callThrough();
    service.updateActiveColor(active, value, isFromLastSelectedColor);

    expect(service.primaryColor.next).toHaveBeenCalled();
  });

  it('when updateActiveColor is called and active = 1 and value but not the third arg', () => {
    const active = 1;
    const value = '12';
    spyOn(service.primaryColor, 'next').and.callThrough();
    service.updateActiveColor(active, value);

    expect(service.primaryColor.next).toHaveBeenCalled();
  });

  it('when updateActiveColor is called and active != 1', () => {
    const active = 2;
    const value = '12';
    const isFromLastSelectedColor = 1;
    spyOn(service.secondColor, 'next').and.callThrough();
    service.updateActiveColor(active, value, isFromLastSelectedColor);
    expect(service.secondColor.next).toHaveBeenCalled();
  });

  it('when updateActiveColor is called and active !=1 and isFromLastSelectedColor =0 ', () => {
    const active = 2;
    const value = '12';
    const isFromLastSelectedColor = 0;
    spyOn(service.secondColor, 'next').and.callThrough();
    spyOn(service, 'updateLastSelectedColor').and.callThrough();
    service.updateActiveColor(active, value, isFromLastSelectedColor);
    expect(service.secondColor.next).toHaveBeenCalled();
    expect(service.updateLastSelectedColor).toHaveBeenCalled();
  });

  it('when updateActiveColor is called and active =1 and isFromLastSelectedColor =0 ', () => {
    const active = 1;
    const value = '12';
    const isFromLastSelectedColor = 0;
    spyOn(service.primaryColor, 'next').and.callThrough();
    spyOn(service, 'updateLastSelectedColor').and.callThrough();
    service.updateActiveColor(active, value, isFromLastSelectedColor);
    expect(service.primaryColor.next).toHaveBeenCalled();
    expect(service.updateLastSelectedColor).toHaveBeenCalled();
  });

  it('updateLastSelectedColor and nbcolor < 10', () => {
    const color = 'white';
    service.nbColor = 2;
    service.updateLastSelectedColor(color);
    expect(service.nbColor).toEqual(3);
  });

  it('updateLastSelectedColor and nbcolor = 11', () => {
    const color =  'white';
    service.nbColor = 11;
    service.updateLastSelectedColor(color);
    expect(service.nbColor).toEqual(1);
  });

  it('should fromRgbaToHexadecimal', () => {
    expect(service.fromRgbaToHexadecimal('rgba(0,0,0,1)')).toEqual('#000ff');
  });

  it('should trim', () => {
    expect(service.trim('rgba')).toEqual('rgba');
  });

});
