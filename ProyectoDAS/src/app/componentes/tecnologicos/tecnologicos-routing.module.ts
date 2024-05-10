import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TecnologicosComponent } from './tecnologicos.component';

const routes: Routes = [
  {
    path:'', component: TecnologicosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnologicosRoutingModule { }
