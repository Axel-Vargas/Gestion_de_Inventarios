import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipostecnologicosComponent } from './tipostecnologicos.component';

const routes: Routes = [
  {path: '', component: TipostecnologicosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipostecnologicosRoutingModule { }
