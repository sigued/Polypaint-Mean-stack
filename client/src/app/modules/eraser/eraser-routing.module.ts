import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EraserComponent } from './eraser.component';

const routes: Routes = [
  {path: '', component:  EraserComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EraserRoutingModule { }
