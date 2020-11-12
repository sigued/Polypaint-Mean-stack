import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorRoutingModule } from './color-routing.module';
import { ColorSliderComponent } from './color-slider/color-slider.component';
import { ColorComponent } from './color.component';

@NgModule({
  declarations: [ColorComponent, ColorPickerComponent, ColorPaletteComponent, ColorSliderComponent],
  imports: [
    CommonModule,
    ColorRoutingModule,
    MaterialModule,
  ],
  exports: [
    ColorComponent,
    MaterialModule,
    ColorPickerComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
})

export class ColorModule { }
