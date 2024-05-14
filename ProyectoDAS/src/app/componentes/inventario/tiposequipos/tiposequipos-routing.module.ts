import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiposequiposComponent } from './tiposequipos.component';

const routes: Routes = [
  {
    path:'', component: TiposequiposComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposequiposRoutingModule { }
