import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'areas', loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule)},
  {path:'bloques', loadChildren: () => import('./bloques/bloques.module').then(m => m.BloquesModule)},
  {path:'facultades', loadChildren: () => import('./facultades/facultades.module').then(m => m.FacultadesModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfraestructuraRoutingModule { }
