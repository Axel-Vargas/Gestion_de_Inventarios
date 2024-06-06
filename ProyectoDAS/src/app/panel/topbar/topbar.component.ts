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
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia("(max-width: 768px)").matches) {
        return { 'width': '90%' };
      } else {
        return { 'width': '40%' };
      }
    } else {
      return { 'width': '50%' };
    }
  }


  onCodeResult(result: string): void {
    this.displayQRScanner = false;
    console.log('QR Code Result:', result);
    if (this.isValidUrl(result)) {
      let url = new URL(result);
      this.route.navigateByUrl(url.pathname + url.search);
    } else {
      console.error('El resultado escaneado no es una URL válida:', result);
    }
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  camerasFoundHandler(devices: MediaDeviceInfo[]): void {
    console.log(devices);
  }
  onModalHide(): void {
    this.displayQRScanner = false;
  }


  ngOnInit() {
    this.usuario = this.authService.getUser();
    this.isAdmin = this.authService.isUserAdmin();
  }

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(private route: Router, public layoutService: LayoutService, public authService: AuthService) { }

}
