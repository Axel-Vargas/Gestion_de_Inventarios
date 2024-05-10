import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramasRoutingModule } from './programas-routing.module';
import { ProgramasComponent } from './programas.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    ProgramasComponent
  ],
  imports: [
    CommonModule,
    ProgramasRoutingModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ]
})
export class ProgramasModule { }
