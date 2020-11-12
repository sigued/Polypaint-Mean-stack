import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSliderModule } from '@angular/material';
import { GridService } from 'src/app/services/grid.service';
import { MagnestismService } from 'src/app/services/magnetism.service';
import { PencilComponent } from './pencil.component';

describe('PencilComponent', () => {
  let component: PencilComponent;
  let fixture: ComponentFixture<PencilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PencilComponent, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      imports: [MatSliderModule, ],
      providers: [MagnestismService, GridService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PencilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when onTextureSelectionChange is called, value number is assigned to attribute active and pencilBrushService', () => {
    const expectedValue = 11;
    spyOn(component['pencilBrushService'], 'setTextureRef').and.callThrough();
    component.onTextureSelectionChange(expectedValue);
    expect(component.textureRef).toEqual(expectedValue);
    expect(component['pencilBrushService'].setTextureRef).toHaveBeenCalled();
  });

  it('when widthChanged is called it should called pencilBrushService setWidth', () => {
    spyOn(component['pencilBrushService'], 'setWidth').and.callThrough();
    component.widthChanged(20);
    expect(component['pencilBrushService'].setWidth).toHaveBeenCalled();
  });
});
