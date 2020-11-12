import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextService } from 'src/app/services/text.service';
import { TextServiceStub } from 'src/app/stubs/textService.stub';
import { TextComponent } from './text.component';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let service: TextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      providers: [{provide: TextService, useClass: TextServiceStub}, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TextService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngOnInit is called', () => {
    component.ngOnInit();
    expect(component.fontFamily).toEqual('Sans-Serif');
    expect(component.fontSize).toEqual(50);
    expect(component.fontWeight).toEqual('');
    expect(component.fontStyle).toEqual('');
    expect(component.checked).toBeFalsy();
  });

  it('when changeFontFamily is called', () => {
    spyOn(service, 'setFontFamily').and.callThrough();
    component.changeFontFamily = 1;
    expect(service.setFontFamily).toHaveBeenCalled();
  });

  it('when changeFontSize is called', () => {
    spyOn(service, 'setFontSize').and.callThrough();
    component.changeFontSize();
    expect(service.setFontSize).toHaveBeenCalled();
  });

  it('when changeFontSize is called', () => {
    spyOn(service, 'setFontSize').and.callThrough();
    component.changeFontSize();
    expect(service.setFontSize).toHaveBeenCalled();
  });

  it('when onCheckBold is true', () => {
    spyOn(service, 'setFontWeight').and.callThrough();
    const event: any = {
       target: {
         checked: true,
       },
     };
    component.onCheckBold(event);
    expect(service.setFontWeight).toHaveBeenCalled();
   });

  it('when onCheckBold is false', () => {
    spyOn(service, 'setFontWeight').and.callThrough();
    const event: any = {
       target: {
         checked: false,
       },
     };
    component.onCheckBold(event);
    expect(service.setFontWeight).toHaveBeenCalled();
   });

  it('when onCheckItalic is true', () => {
    spyOn(service, 'setFontStyle').and.callThrough();
    const event: any = {
       target: {
         checked: true,
       },
     };
    component.onCheckItalic(event);
    expect(service.setFontStyle).toHaveBeenCalled();
   });

  it('when onCheckItalic is false', () => {
    spyOn(service, 'setFontStyle').and.callThrough();
    const event: any = {
       target: {
         checked: false,
       },
     };
    component.onCheckItalic(event);
    expect(service.setFontStyle).toHaveBeenCalled();
   });

  it('when onCheckLeft is true', () => {
    spyOn(service, 'setTextAlign').and.callThrough();
    const event: any = {
       target: {
         checked: true,
       },
     };
    component.onCheckLeft(event);
    expect(service.setTextAlign).toHaveBeenCalled();
   });

  it('when onCheckLeft is false', () => {
    spyOn(service, 'setTextAlign').and.callThrough();
    const event: any = {
       target: {
         checked: false,
       },
     };
    component.onCheckLeft(event);
    expect(service.setTextAlign).toHaveBeenCalled();
   });

  it('when onCheckCenter is true', () => {
    spyOn(service, 'setTextAlign').and.callThrough();
    const event: any = {
       target: {
         checked: true,
       },
     };
    component.onCheckCenter(event);
    expect(service.setTextAlign).toHaveBeenCalled();
   });

  it('when onCheckCenter is false', () => {
    spyOn(service, 'setTextAlign').and.callThrough();
    const event: any = {
       target: {
         checked: false,
       },
     };
    component.onCheckCenter(event);
    expect(service.setTextAlign).toHaveBeenCalled();
   });

  it('when onCheckRight is true', () => {
    spyOn(service, 'setTextAlign').and.callThrough();
    const event: any = {
       target: {
         checked: true,
       },
     };
    component.onCheckRight(event);
    expect(service.setTextAlign).toHaveBeenCalled();
   });

  it('when onCheckRight is false', () => {
    spyOn(service, 'setTextAlign').and.callThrough();
    const event: any = {
       target: {
         checked: false,
       },
     };
    component.onCheckRight(event);
    expect(service.setTextAlign).toHaveBeenCalled();
   });
});
