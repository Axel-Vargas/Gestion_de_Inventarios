import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  usuario: any;
  isAdmin: boolean = false;
  items!: MenuItem[];

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

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(private route: Router,public layoutService: LayoutService, public authService: AuthService) { }

  cerrarSesion(){
    this.authService.removeUser();
    this.route.navigate(['']);
  }
}
