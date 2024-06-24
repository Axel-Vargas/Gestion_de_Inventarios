import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultadesRoutingModule } from './facultades-routing.module';
import { FacultadesComponent } from './facultades.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';


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
    InputTextModule,
    ToastModule,
    FormsModule,
    ConfirmDialogModule,
    TagModule,
    DialogModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class FacultadesModule { }