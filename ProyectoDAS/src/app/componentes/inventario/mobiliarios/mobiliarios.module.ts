import { CalendarModule } from 'primeng/calendar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobiliariosRoutingModule } from './mobiliarios-routing.module';
import { MobiliariosComponent } from './mobiliarios.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    MobiliariosComponent,
    
  ],
  imports: [
    CommonModule,
    MobiliariosRoutingModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    DialogModule,
    ConfirmDialogModule,
    MenuModule,
    ToastModule,
    CalendarModule,
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class MobiliariosModule { }
