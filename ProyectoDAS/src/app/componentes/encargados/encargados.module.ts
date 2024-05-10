import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncargadosRoutingModule } from './encargados-routing.module';
import { EncargadosComponent } from './encargados.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    EncargadosComponent
  ],
  imports: [
    CommonModule,
    EncargadosRoutingModule,
    MenuModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ]
})
export class EncargadosModule { }
