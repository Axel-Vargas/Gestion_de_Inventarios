import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './core/principal/principal.component';
import { LayoutComponent } from './panel/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'', component: PrincipalComponent
  },
  {
    path:'panel', component: LayoutComponent,
    children:[
      {path: '', loadChildren: () => import('./componentes/inicio/inicio.module').then(m => m.InicioModule), canActivate: [AuthGuard] }, 
      {path: 'personal', loadChildren: () => import('./componentes/personal/personal.module').then(m => m.PersonalModule), canActivate: [AuthGuard]},
      {path: 'inventarios', loadChildren: () => import('./componentes/inventario/inventario.module').then(m => m.InventarioModule), canActivate: [AuthGuard]},
      {path: 'infraestructura', loadChildren: () => import('./componentes/infraestructura/infraestructura.module').then(m => m.InfraestructuraModule), canActivate: [AuthGuard]},
      { path: 'programas', loadChildren: () => import('./componentes/programas/programas.module').then(m => m.ProgramasModule), canActivate: [AuthGuard] },
      { path: 'proveedores', loadChildren: () => import('./componentes/proveedores/proveedores.module').then(m => m.ProveedoresModule), canActivate: [AuthGuard] },
      { path: 'reportes', loadChildren: () => import('./componentes/reportes/reportes.module').then(m => m.ReportesModule), canActivate: [AuthGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
