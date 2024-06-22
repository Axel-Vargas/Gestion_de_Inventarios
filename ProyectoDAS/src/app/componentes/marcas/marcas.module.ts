import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasRoutingModule } from './marcas-routing.module';
import { MarcasComponent } from './marcas.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

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
    ConfirmDialogModule
  ],
  exports: [
    MarcasComponent
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessagesModule
  ]
})
export class MarcasModule { }
