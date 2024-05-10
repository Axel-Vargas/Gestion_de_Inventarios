import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './core/principal/principal.component';
import { LayoutComponent } from './panel/layout/layout.component';

const routes: Routes = [
  {
    path:'', component: PrincipalComponent
  },
  {
    path:'panel', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/inicio/inicio.module').then(m => m.InicioModule) 

      },
    ]
  },
  {
    path:'usuarios', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/usuarios/usuarios.module').then(m => m.UsuariosModule) 

      },
    ]
  },
  {
    path:'encargados', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/encargados/encargados.module').then(m => m.EncargadosModule)

      },
    ]
  },
  {
    path:'tiposequipos', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/tiposequipos/tiposequipos.module').then(m => m.TiposequiposModule)

      },
    ]
  },
  {
    path:'tecnologicos', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/tecnologicos/tecnologicos.module').then(m => m.TecnologicosModule)

      },
    ]
  },
  {
    path:'mobiliarios', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/mobiliarios/mobiliarios.module').then(m => m.MobiliariosModule)

      },
    ]
  },
  {
    path:'elementos', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/elementos/elementos.module').then(m => m.ElementosModule)

      },
    ]
  },
  {
    path:'facultades', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/facultades/facultades.module').then(m => m.FacultadesModule)

      },
    ]
  },
  {
    path:'bloques', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/bloques/bloques.module').then(m => m.BloquesModule)

      },
    ]
  },
  {
    path:'areas', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/areas/areas.module').then(m => m.AreasModule)

      },
    ]
  },
  {
    path:'programas', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/programas/programas.module').then(m => m.ProgramasModule)

      },
    ]
  },
  {
    path:'proveedores', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/proveedores/proveedores.module').then(m => m.ProveedoresModule)

      },
    ]
  },
  {
    path:'historial', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/historial/historial.module').then(m => m.HistorialModule)

      },
    ]
  },
  {
    path:'reportes', component: LayoutComponent,
    children:[
      { 
        path: '', loadChildren: () => import('./componentes/reportes/reportes.module').then(m => m.ReportesModule)

      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
