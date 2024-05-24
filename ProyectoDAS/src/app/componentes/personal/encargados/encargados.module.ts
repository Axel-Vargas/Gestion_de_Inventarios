import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncargadosRoutingModule } from './encargados-routing.module';
import { EncargadosComponent } from './encargados.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { Table, TableModule } from 'primeng/table';


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
    InputTextModule,
    DialogModule,
    DropdownModule,
    ToastModule,
    FormsModule,
    ConfirmDialogModule,
    TagModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class EncargadosModule { }
