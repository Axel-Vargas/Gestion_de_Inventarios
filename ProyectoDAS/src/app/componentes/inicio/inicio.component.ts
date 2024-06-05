import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from '../../panel/service/app.layout.service';
import { BienestecnologicosService } from '../../services/bienestecnologicos.service';
import { bienes_Tecnologicos } from '../api/bienesTecnologicos';
import { Router } from '@angular/router';
import { InicioService } from '../../services/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  totalBienes: number = 0;
  totalAreas: number = 0;
  totalProveedores: number = 0;
  totalUsuarios: number = 0;

  tooltipVisible: boolean = false;
  displayQRScanner: boolean = false;

  constructor(
    private route: Router, 
    public layoutService: LayoutService,
    private inicioService: InicioService
  ) {}

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.inicioService.obtenerTotalBienes().subscribe(
      (data) => this.totalBienes = data,
      (error) => console.error('Error al obtener total de bienes', error)
    );

    this.inicioService.obtenerTotalAreas().subscribe(
      (data) => this.totalAreas = data,
      (error) => console.error('Error al obtener total de áreas', error)
    );

    this.inicioService.obtenerTotalProveedores().subscribe(
      (data) => this.totalProveedores = data,
      (error) => console.error('Error al obtener total de proveedores', error)
    );

    this.inicioService.obtenerTotalUsuarios().subscribe(
      (data) => this.totalUsuarios = data,
      (error) => console.error('Error al obtener total de usuarios', error)
    );
  }

  

  showQRScanner2(): void {
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
}
