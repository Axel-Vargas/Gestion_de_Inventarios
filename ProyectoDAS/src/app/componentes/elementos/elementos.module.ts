import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementosRoutingModule } from './elementos-routing.module';
import { ElementosComponent } from './elementos.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    ElementosComponent
  ],
  imports: [
    CommonModule,
    ElementosRoutingModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ]
})
export class ElementosModule { }
