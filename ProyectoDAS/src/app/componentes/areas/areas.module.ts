import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { AreasComponent } from './areas.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    AreasComponent
  ],
  imports: [
    CommonModule,
    AreasRoutingModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ]
})
export class AreasModule { }
