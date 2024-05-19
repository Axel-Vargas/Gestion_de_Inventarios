import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'componentes', loadChildren: () => import('./elementos/elementos.module').then(m => m.ElementosModule)},
  {path:'mobiliarios', loadChildren: () => import('./mobiliarios/mobiliarios.module').then(m => m.MobiliariosModule)},
  {path:'tecnologicos', loadChildren: () => import('./tecnologicos/tecnologicos.module').then(m => m.TecnologicosModule)},
  {path:'tiposequipos', loadChildren: () => import('./tiposequipos/tiposequipos.module').then(m => m.TiposequiposModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
