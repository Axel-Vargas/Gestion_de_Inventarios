import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipostecnologicosRoutingModule } from './tipostecnologicos-routing.module';
import { TipostecnologicosComponent } from './tipostecnologicos.component';


@NgModule({
  declarations: [
    TipostecnologicosComponent
  ],
  imports: [
    CommonModule,
    TipostecnologicosRoutingModule
  ],
  exports: [
    TipostecnologicosComponent
  ]
})
export class TipostecnologicosModule { }
