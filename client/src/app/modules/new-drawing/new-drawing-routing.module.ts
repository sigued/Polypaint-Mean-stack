import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDrawingComponent } from './new-drawing.component';

const routes: Routes = [
  { path: '', component: NewDrawingComponent, },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDrawingRoutingModule { }
