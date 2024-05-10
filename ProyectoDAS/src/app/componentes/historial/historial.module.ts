import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialComponent } from './historial.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    HistorialComponent
  ],
  imports: [
    CommonModule,
    HistorialRoutingModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ]
})
export class HistorialModule { }
