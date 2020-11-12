import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatPaginator, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material.module';
import { DrawingFileOpenerComponent } from './drawing-file-opener/drawing-file-opener.component';
import { DrawingFileRoutingModule } from './drawing-file-routing.module';
import { DrawingFileSaverComponent } from './drawing-file-saver/drawing-file-saver.component';
import { ExportFileComponent } from './export-file/export-file.component';
import { SafeHtmlPipe } from './safeHtml.pipe';

@NgModule({
  declarations: [DrawingFileOpenerComponent, DrawingFileSaverComponent, SafeHtmlPipe, ExportFileComponent],
  imports: [
    CommonModule,
    DrawingFileRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialModule,
  ],
  exports: [
    DrawingFileOpenerComponent,
    DrawingFileSaverComponent,
    ExportFileComponent,
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginator,
    SafeHtmlPipe,
  ],
})
export class DrawingFileModule { }
