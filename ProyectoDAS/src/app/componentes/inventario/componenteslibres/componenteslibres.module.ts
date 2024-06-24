import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponenteslibresRoutingModule } from './componenteslibres-routing.module';
import { ComponenteslibresComponent } from './componenteslibres.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import {MultiSelectModule} from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    ComponenteslibresComponent
  ],
  imports: [
    CommonModule,
    ComponenteslibresRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    MultiSelectModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
  exports: [
    //ComponenteslibresComponent
  ],
  providers: [
    DialogService, 
    ConfirmationService
  ]
})
export class ComponenteslibresModule { }
