import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MagnetismRoutingModule } from './magnetism/magnetism-routing.module';
import { MagnetismComponent } from './magnetism/magnetism.component';

@NgModule({
  declarations: [MagnetismComponent],
  imports: [
    CommonModule,
    FormsModule,
    MagnetismRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    MagnetismComponent,
    ReactiveFormsModule,
  ],
})
export class MagnetismModule { }
