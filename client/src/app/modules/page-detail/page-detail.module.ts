import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { PageDetailRoutingModule } from './page-detail-routing.module';
import { PageDetailComponent } from './page-detail.component';

@NgModule({
  declarations: [PageDetailComponent],
  imports: [
    CommonModule,
    PageDetailRoutingModule,
  ],
  exports: [
    PageDetailComponent,
    MaterialModule,
  ],
})
export class PageDetailModule { }
