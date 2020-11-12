import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagnetismComponent } from './magnetism.component';

const routes: Routes = [
  { path: '', component: MagnetismComponent, },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagnetismRoutingModule { }
