import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponenteslibresComponent } from './componenteslibres.component';

const routes: Routes = [
  {path: '', component: ComponenteslibresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponenteslibresRoutingModule { }
