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
      {path: '', loadChildren: () => import('./componentes/inicio/inicio.module').then(m => m.InicioModule)},
      {path: 'personal', loadChildren: () => import('./componentes/personal/personal.module').then(m => m.PersonalModule)},
      {path: 'inventarios', loadChildren: () => import('./componentes/inventario/inventario.module').then(m => m.InventarioModule)},
      {path: 'infraestructura', loadChildren: () => import('./componentes/infraestructura/infraestructura.module').then(m => m.InfraestructuraModule)},
      { path: 'programas', loadChildren: () => import('./componentes/programas/programas.module').then(m => m.ProgramasModule) },
      { path: 'proveedores', loadChildren: () => import('./componentes/proveedores/proveedores.module').then(m => m.ProveedoresModule) },
      { path: 'historial', loadChildren: () => import('./componentes/historial/historial.module').then(m => m.HistorialModule)},
      { path: 'reportes', loadChildren: () => import('./componentes/reportes/reportes.module').then(m => m.ReportesModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
