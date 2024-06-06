import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';

import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { DialogModule } from 'primeng/dialog';
//import { NgxChartsModule } from '@swimlane/ngx-charts';

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
  ],
  exports: [
    InicioComponent
  ],
  providers: [
    
  ],
})
export class InicioModule { }
