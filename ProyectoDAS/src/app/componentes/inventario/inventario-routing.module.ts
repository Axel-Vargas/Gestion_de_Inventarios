import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'mobiliarios', loadChildren: () => import('./mobiliarios/mobiliarios.module').then(m => m.MobiliariosModule)},
  {path:'tecnologicos', loadChildren: () => import('./tecnologicos/tecnologicos.module').then(m => m.TecnologicosModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
