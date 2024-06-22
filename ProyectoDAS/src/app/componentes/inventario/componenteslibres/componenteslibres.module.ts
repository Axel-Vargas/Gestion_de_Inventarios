import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponenteslibresRoutingModule } from './componenteslibres-routing.module';
import { ComponenteslibresComponent } from './componenteslibres.component';


@NgModule({
  declarations: [
    ComponenteslibresComponent
  ],
  imports: [
    CommonModule,
    ComponenteslibresRoutingModule
  ],
  exports: [
    ComponenteslibresComponent
  ]
})
export class ComponenteslibresModule { }
