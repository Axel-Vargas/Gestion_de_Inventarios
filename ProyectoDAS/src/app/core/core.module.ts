import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { SharedprimeModule } from '../sharedprime/sharedprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedprimeModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  exports: [
    PrincipalComponent,
    FooterComponent
  ],
  providers:[
    MessageService
  ]
})
export class CoreModule { }
