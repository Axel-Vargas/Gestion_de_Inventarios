import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnologicosRoutingModule } from './tecnologicos-routing.module';
import { TecnologicosComponent } from './tecnologicos.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    TecnologicosComponent
  ],
  imports: [
    CommonModule,
    TecnologicosRoutingModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    DropdownModule
  ]
})
export class TecnologicosModule { }
