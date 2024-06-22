import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipostecnologicosRoutingModule } from './tipostecnologicos-routing.module';
import { TipostecnologicosComponent } from './tipostecnologicos.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    TipostecnologicosComponent
  ],
  imports: [
    CommonModule,
    TipostecnologicosRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    TipostecnologicosComponent
  ],
  providers: [
    DialogService, // Agrega DialogService aquí
    ConfirmationService
  ]
})
export class TipostecnologicosModule { }
