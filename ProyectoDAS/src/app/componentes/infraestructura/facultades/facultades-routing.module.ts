import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultadesComponent } from './facultades.component';

const routes: Routes = [
  {
    path:'', component: FacultadesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultadesRoutingModule { }
