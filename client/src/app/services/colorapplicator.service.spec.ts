/* tslint:disable:no-unused-variable */

import { CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { MouseEventStub } from '../stubs/mouseEvent.stub';
import { RenderStub } from '../stubs/render.stub';
import { ColorapplicatorService } from './colorapplicator.service';

describe('Service: Colorapplicator', () => {
  let colorApplicatorService: ColorapplicatorService;
  let render: Renderer2;
  let mouseEvent: MouseEvent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorapplicatorService,
        {provide: Renderer2, useClass: RenderStub},
        {provide: MouseEvent, useClass: MouseEventStub}],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    colorApplicatorService = TestBed.get(ColorapplicatorService);
    render = TestBed.get(Renderer2);
    mouseEvent = TestBed.get(MouseEvent);
  });

  it('should ...', inject([ColorapplicatorService], (service: ColorapplicatorService) => {
    expect(service).toBeTruthy();
  }));

  it('should be handleColor with left click and active = 1', () => {
    const clickType =  0;
    const active = 1;
    spyOn(render, 'setStyle');
    colorApplicatorService.handleColor(mouseEvent, render, clickType, active);
    expect(render.setStyle).toHaveBeenCalledWith(mouseEvent.target, 'stroke', 'rgba(0,0,0,1)');
  });

  it('should be handleColor with right click and active = 1', () => {
    const clickType =  2;
    const active = 1;
    spyOn(render, 'setStyle');
    colorApplicatorService.handleColor(mouseEvent, render, clickType, active);
    expect(render.setStyle).toHaveBeenCalledWith(mouseEvent.target, 'stroke', 'rgba(0,0,0,1)');
  });

  it('should be handleColor with left click and active = 4', () => {
    const clickType =  0;
    const active = 4;
    spyOn(render, 'setStyle');
    colorApplicatorService.handleColor(mouseEvent, render, clickType, active);
    expect(render.setStyle).toHaveBeenCalledWith(mouseEvent.target, 'fill', 'rgba(0,0,0,1)');
  });

  it('should be handleColor with right click and active = 4', () => {
    const clickType =  2;
    const active = 4;
    spyOn(render, 'setStyle');
    colorApplicatorService.handleColor(mouseEvent, render, clickType, active);
    expect(render.setStyle).toHaveBeenCalledWith(mouseEvent.target, 'stroke', 'rgba(0,0,0,1)');
  });
});
