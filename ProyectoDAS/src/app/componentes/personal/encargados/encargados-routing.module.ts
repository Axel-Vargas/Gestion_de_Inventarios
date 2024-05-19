import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncargadosComponent } from './encargados.component';

const routes: Routes = [
  {
    path:'', component: EncargadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncargadosRoutingModule { }
