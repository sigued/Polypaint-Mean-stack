import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingFileOpenerComponent } from './drawing-file-opener/drawing-file-opener.component';
import { DrawingFileSaverComponent } from './drawing-file-saver/drawing-file-saver.component';
import { ExportFileComponent } from './export-file/export-file.component';

const routes: Routes = [
  { path: '', component: DrawingFileOpenerComponent, },
  { path: '', component: DrawingFileSaverComponent, },
  { path: '', component: ExportFileComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrawingFileRoutingModule { }
