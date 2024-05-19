import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobiliariosComponent } from './mobiliarios.component';

const routes: Routes = [
  {
    path:'', component: MobiliariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobiliariosRoutingModule { }
