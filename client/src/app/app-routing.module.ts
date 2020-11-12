import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'newdrawingPage', loadChildren: './modules/new-drawing/new-drawing.module#NewDrawingModule'},
  { path: 'drawingFilePage', loadChildren: './modules/drawing-file/drawing-file.module#DrawingFileModule'},
  { path: 'magnetismPage', loadChildren: './modules/magnetism/magnetism.module#MagnetismModule'},
  { path: 'toolsPage', loadChildren: './modules/tools/tools.module#ToolsModule'},
  { path: 'colorPage', loadChildren: './modules/color/color.module#ColorModule'},
  { path: 'gridPage', loadChildren: './modules/grid/grid.module#GridModule'},
  { path: 'eraserPage', loadChildren: './modules/eraser/eraser.module#EraserModule'},
  { path: 'pageDetail', loadChildren: './modules/page-detail/page-detail.module#PageDetailModule'},
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
