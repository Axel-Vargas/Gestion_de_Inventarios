import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiposequiposRoutingModule } from './tiposequipos-routing.module';
import { TiposequiposComponent } from './tiposequipos.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    TiposequiposComponent
  ],
  imports: [
    CommonModule,
    TiposequiposRoutingModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ]
})
export class TiposequiposModule { }
