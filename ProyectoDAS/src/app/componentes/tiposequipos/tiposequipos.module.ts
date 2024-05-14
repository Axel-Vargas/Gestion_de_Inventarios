import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiposequiposRoutingModule } from './tiposequipos-routing.module';
import { TiposequiposComponent } from './tiposequipos.component';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    TiposequiposComponent
  ],
  imports: [
    CommonModule,
    TiposequiposRoutingModule,
    MenuModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DialogModule,
    ZXingScannerModule
  ]
})
export class TiposequiposModule { }
