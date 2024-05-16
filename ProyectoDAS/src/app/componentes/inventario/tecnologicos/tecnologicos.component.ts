import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BienestecnologicosService } from '../../../services/bienestecnologicos.service';
import { bienes_Tecnologicos } from '../../api/bienesTecnologicos';
import { componentesService } from '../../../services/componentes.service';
import { catchError, forkJoin } from 'rxjs';

@Component({
  selector: 'app-tecnologicos',
  templateUrl: './tecnologicos.component.html',
  styleUrl: './tecnologicos.component.css'
})
export class TecnologicosComponent implements OnInit {
  tooltipVisible: boolean = false;
  visible: boolean = false;
  productDialog!: boolean;
  tecnologicos!: bienes_Tecnologicos[];
  //tecnologico!: bienes_Tecnologicos;

  cities: SelectItem[] = [];
  selectedDrop: SelectItem = { value: '' };

  bloque: SelectItem[] = [];
  selectedDropb: SelectItem = { value: '' };

  loading = [false, false, false, false];

  constructor(private tecnologicosService: BienestecnologicosService, private componente_service: componentesService) {

    this.cities = [
      { label: 'Decanato', value: { id: 1, name: 'Decanato', code: 'NY' } },
      { label: 'Laboratorio CTT', value: { id: 2, name: 'Laboratorio CTT', code: 'RM' } },
      { label: 'Laboratorio 8', value: { id: 3, name: 'Laboratorio 8', code: 'LDN' } },

    ];
    this.bloque = [
      { label: 'BLOQUE 1', value: { id: 1, name: 'BLOQUE 1', code: 'NY' } },
      { label: 'BLOQUE 2', value: { id: 2, name: 'BLOQUE 2', code: 'RM' } },
      { label: 'CIENCIAS APLICADAS', value: { id: 3, name: 'CIENCIAS APLICADAS', code: 'LDN' } },

    ];
  }

  load(index: number) {
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 1000);
  }

  ngOnInit() {
    this.cargarBienesTecnologicos()
  }

  cargarBienesTecnologicos(): void {
    forkJoin({
      bienesTecnologicos: this.tecnologicosService.getBienesTecnologicos(),
      componentes: this.componente_service.getComponentes()
    }).pipe(
      catchError(error => {
        console.error('Error al cargar datos', error);
        return []; // o manejo de error adecuado
      })
    ).subscribe(({ bienesTecnologicos, componentes }) => {
      bienesTecnologicos.forEach(t => {
        t.componentes = componentes.filter(c => c.id_bien_per === t.id_bien_tec);
      });
      this.tecnologicos = bienesTecnologicos;
      console.log(this.tecnologicos);
    });
  }
  openNew() {
    //this.tecnologico = {};
    this.productDialog = true;
  }

  showTooltip() {
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

  showDialogAgregar() {
    this.visible = true;
    //this.listarRoles();
  }

}

