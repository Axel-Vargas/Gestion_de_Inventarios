import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';

import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';
import { InicioService } from '../../services/inicio.service';


@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MenuModule,
    TableModule,
    ButtonModule,
    ZXingScannerModule,
    DialogModule,
    HttpClientModule,
    FormsModule,
    DropdownModule,
    ChartModule
  ],
  exports: [
    InicioComponent
  ],
  providers: [
    
  ],
})
export class InicioModule { }
