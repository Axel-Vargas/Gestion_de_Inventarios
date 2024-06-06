import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  usuario: any;
  isAdmin: boolean = false;
  items!: MenuItem[];

  calendarMenuItems!: MenuItem[];
  profileMenuItems!: MenuItem[];


  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;
  sidebarVisible: boolean = false;
  profileMenuModel: MenuItem[];

  
  constructor(private route: Router, public layoutService: LayoutService, public authService: AuthService) { 
    this.profileMenuModel = [
      { label: 'Mi Perfil', icon: 'pi pi-user', routerLink: '/mi-perfil' },
      { label: 'Configuración', icon: 'pi pi-cog', routerLink: '/configuracion' },
      { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', routerLink: '/cerrar-sesion' }
  ];
  }
  
  ngOnInit() {
    this.usuario = this.authService.getUser();
    this.isAdmin = this.authService.isUserAdmin();

    this.items = [
      {
        label: this.usuario.usuario.toUpperCase(), icon: 'pi pi-user',
        items: [
          { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.cerrarSesion() }
        ]
      },
    ];
  }

  cerrarSesion() {
    this.authService.removeUser();
    this.route.navigate(['']);
  }
}
