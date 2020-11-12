import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule} from 'src/app/material.module';
import { ColorModule } from '../color/color.module';
import { NewDrawingRoutingModule } from './new-drawing-routing.module';
import { NewDrawingComponent } from './new-drawing.component';
@NgModule({
  declarations: [NewDrawingComponent],
  imports: [
    CommonModule,
    NewDrawingRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    ColorModule,
    BrowserModule,
  ],
  exports: [
    NewDrawingComponent,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [NewDrawingComponent],
})
export class NewDrawingModule { }
