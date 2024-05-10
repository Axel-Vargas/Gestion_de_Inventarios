import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';

import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../core/service/product.service';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MenuModule,
    TableModule,
    ButtonModule
  ],
  exports: [
    InicioComponent
  ],
  providers: [
    ProductService
  ],
})
export class InicioModule { }
