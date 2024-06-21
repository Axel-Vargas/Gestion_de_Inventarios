import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';

import { LayoutService } from '../../panel/service/app.layout.service';
import { BienestecnologicosService } from '../../services/bienestecnologicos.service';
import { bienes_Tecnologicos } from '../api/bienesTecnologicos';
import { Router } from '@angular/router';
import { Historial } from '../api/Historial';
import { HistorialService } from '../../services/historial.service';
import { InicioService } from '../../services/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit, OnDestroy {


  historial: Historial[] = [];

  items!: MenuItem[];

  tecnologicos!: bienes_Tecnologicos[];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;

  tooltipVisible: boolean = false;
  displayQRScanner: boolean = false;
  totalBienes: number = 0;
  totalAreas: number = 0;
  totalProveedores: number = 0;
  totalUsuarios: number = 0;

  constructor(private inicioService: InicioService, private historialService: HistorialService, private productService: BienestecnologicosService, public layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$
    .pipe(debounceTime(25))
    .subscribe((config) => {
        this.initChart();
    });
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
  
      this.inicioService.obtenerComponentesLibres().subscribe(
          (data) => this.componentesLibres = data,
          (error) => console.error('Error al obtener total de usuarios', error)
      );
  
      this.inicioService.obtenerTotalBienesMobiliarios().subscribe(
          (data) => this.bienesMobiliarios = data,
          (error) => console.error('Error al obtener total de usuarios', error)
      );
  
      this.inicioService.obtenerTotalTecnologicosBodega().subscribe(
          (data) => this.tecnologicosBodega = data,
          (error) => console.error('Error al obtener total de usuarios', error)
      );
  
      this.inicioService.obtenerTotalRepotencias().subscribe(
          (data) => this.totalRepotencias = data,
          (error) => console.error('Error al obtener total de usuarios', error)
      );
  }

ngOnInit() {
    this.obtenerDatos();
  this.cargarHistorial();
    this.initChart();
    //this.productService.getProductsSmall().then(data => this.products = data);

    this.items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];
}

cargarHistorial(): void {
  this.historialService.getHistorial().subscribe(
      (data: Historial[]) => {
          this.historial = data;
      },
      error => {
          console.error('Error al cargar el historial:', error);
      }
  );
}


  initChart() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.chartData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'First Dataset',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                  borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                  tension: .4
              },
              {
                  label: 'Second Dataset',
                  data: [28, 48, 40, 19, 86, 27, 90],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--green-600'),
                  borderColor: documentStyle.getPropertyValue('--green-600'),
                  tension: .4
              }
          ]
      };

      this.chartOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
