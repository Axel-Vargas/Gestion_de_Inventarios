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

    data: any;
    options: any;
    basicData: any;
    basicOptions: any;

  
    tooltipVisible: boolean = false;
    displayQRScanner: boolean = false;
    totalBienes: number = 0;
    totalAreas: number = 0;
    totalProveedores: number = 0;
    totalUsuarios: number = 0;
    componentesLibres:number = 0;
    bienesMobiliarios:number = 0
    tecnologicosBodega: number = 0
    totalRepotencias:number = 0



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
  this.initChartPastel();
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

  this.inicioService.obtenerBienesPorArea().subscribe((data: any[]) => {
    const labels = data.map(item => item.NOMBRE);
    const datasetData = data.map(item => item.total_bienes);

    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Total Bienes',
          data: datasetData,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(255, 99, 132)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
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
  });
}



initChartPastel() {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');

  this.inicioService.obtenerRepotenciadoPorArea().subscribe((data: any[]) => {
    const labels = data.map(item => item.NOMBRE);
    const datasetData = data.map(item => item.total_bienes);

    this.data = {
      labels: labels,
      datasets: [
        {
          data: datasetData,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--purple-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--red-400'),
            documentStyle.getPropertyValue('--purple-400')
          ]
        }
      ]
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  });
}

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
