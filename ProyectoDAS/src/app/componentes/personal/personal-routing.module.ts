import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},
  {path:'encargados', loadChildren: () => import('./encargados/encargados.module').then(m => m.EncargadosModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
