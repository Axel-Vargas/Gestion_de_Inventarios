import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasRoutingModule } from './marcas-routing.module';
import { MarcasComponent } from './marcas.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import { DialogService } from 'primeng/dynamicdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MarcasComponent
  ],
  imports: [
    CommonModule,
    MarcasRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    DropdownModule,
    MessagesModule,
    ConfirmDialogModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
 
  providers: [
    DialogService,
    ConfirmationService,
    MessagesModule
  ]
})
export class MarcasModule { }
