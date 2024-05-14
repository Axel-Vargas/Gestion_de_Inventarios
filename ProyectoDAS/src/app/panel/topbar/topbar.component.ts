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
  displayQRScanner: boolean = false;

  

  showQRScanner(): void {
    this.displayQRScanner = true;
  }

  getDialogStyle() {
    if (window.matchMedia("(max-width: 768px)").matches) { 
      return { 'width': '90%' };
    } else { // Pantallas grandes
      return { 'width': '40%' };
    }
  }


onCodeResult(result: string): void {
      this.displayQRScanner = false;
      console.log('QR Code Result:', result);
      // Asegúrate de que el resultado es una URL válida antes de intentar redirigir
      if (this.isValidUrl(result)) {
        // Extraer el path de la URL y navegar
        let url = new URL(result);
        this.route.navigateByUrl(url.pathname + url.search); // Incluye la búsqueda para mantener parámetros de query si existen
      } else {
        console.error('El resultado escaneado no es una URL válida:', result);
      }
    }
  
  4

  5


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
