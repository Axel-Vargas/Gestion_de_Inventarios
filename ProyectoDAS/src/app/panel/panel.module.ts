import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { SharedprimeModule } from '../sharedprime/sharedprime.module';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './menu/menu.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { CoreModule } from '../core/core.module';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    LayoutComponent, MenuComponent, TopbarComponent, AppMenuitemComponent, SidebarComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    SharedprimeModule,
    CoreModule,
    MenubarModule,
    DialogModule, 
    ButtonModule,
    ZXingScannerModule 
  ],
  exports: [
    LayoutComponent,
    MenuComponent,
    TopbarComponent,
    SidebarComponent
  ]
})
export class PanelModule { }
