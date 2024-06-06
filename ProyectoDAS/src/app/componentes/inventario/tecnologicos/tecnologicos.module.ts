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
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
@NgModule({
  declarations: [
    TecnologicosComponent,
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
    DropdownModule,
    ToastModule,
    RatingModule,
    ToolbarModule,
    TooltipModule,
    DialogModule,
    InputNumberModule,
    ReactiveFormsModule,
    CalendarModule,
    ConfirmDialogModule,
    FieldsetModule

  ],
  exports: [
  ],
  providers: [ConfirmationService],
})
export class TecnologicosModule { }
