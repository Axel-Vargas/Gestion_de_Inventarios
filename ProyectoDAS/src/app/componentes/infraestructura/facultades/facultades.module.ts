import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultadesRoutingModule } from './facultades-routing.module';
import { FacultadesComponent } from './facultades.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    FacultadesComponent
  ],
  imports: [
    CommonModule,
    FacultadesRoutingModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ]
})
export class FacultadesModule { }
