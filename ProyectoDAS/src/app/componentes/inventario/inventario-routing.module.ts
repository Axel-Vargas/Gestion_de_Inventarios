import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'mobiliarios', loadChildren: () => import('./mobiliarios/mobiliarios.module').then(m => m.MobiliariosModule)},
  {path:'tecnologicos', loadChildren: () => import('./tecnologicos/tecnologicos.module').then(m => m.TecnologicosModule)},
  {path: 'typeTechnological', loadChildren: () => import('./tipostecnologicos/tipostecnologicos.module').then(m => m.TipostecnologicosModule)},
  {path: 'componentes', loadChildren: () => import('./componenteslibres/componenteslibres.module').then(m => m.ComponenteslibresModule)}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
