import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloquesComponent } from './bloques.component';

const routes: Routes = [
  {
    path:'', component: BloquesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloquesRoutingModule { }
