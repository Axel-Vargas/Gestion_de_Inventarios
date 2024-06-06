import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    ReportesComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    QRCodeModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    DropdownModule,
    FormsModule,
    DialogModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class ReportesModule { }
