import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { PageDetailModule } from '../page-detail/page-detail.module';
import { EraserRoutingModule } from './eraser-routing.module';
import { EraserComponent } from './eraser.component';

@NgModule({
  declarations: [EraserComponent],
  imports: [
    CommonModule,
    EraserRoutingModule,
    MaterialModule,
    PageDetailModule,
  ],
  exports: [
    EraserComponent,
    MaterialModule,
  ],
})
export class EraserModule { }
