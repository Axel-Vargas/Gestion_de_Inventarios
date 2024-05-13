import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BienestecnologicosService } from '../../services/bienestecnologicos.service';
import { bienes_Tecnologicos } from '../api/bienesTecnologicos';

@Component({
  selector: 'app-tecnologicos',
  templateUrl: './tecnologicos.component.html',
  styleUrl: './tecnologicos.component.css'
})
export class TecnologicosComponent implements OnInit {

  productDialog!: boolean;
  tecnologicos!: bienes_Tecnologicos[];
  tecnologico!: bienes_Tecnologicos;

  cities: SelectItem[] = [];
  selectedDrop: SelectItem = { value: '' };

  bloque: SelectItem[] = [];
  selectedDropb: SelectItem = { value: '' };

  loading = [false, false, false, false];
  constructor(private tecnologicosService: BienestecnologicosService) {
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
    //this.tecnologicosService.getProductsWithOrdersSmall().then(data => this.tecnologicos = data);
  }

  openNew() {
    this.tecnologico = {};

    this.productDialog = true;
  }
}

