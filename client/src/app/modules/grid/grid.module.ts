import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { PageDetailModule } from '../page-detail/page-detail.module';
import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';

@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    GridRoutingModule,
    MaterialModule,
    PageDetailModule,
  ],
  exports: [
    GridComponent,
    MaterialModule,
  ],
})
export class GridModule { }
