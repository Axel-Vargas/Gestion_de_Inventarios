import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloquesRoutingModule } from './bloques-routing.module';
import { BloquesComponent } from './bloques.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    BloquesComponent
  ],
  imports: [
    CommonModule,
    BloquesRoutingModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    DropdownModule
  ]
})
export class BloquesModule { }
