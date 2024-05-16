import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BienestecnologicosService } from '../../../services/bienestecnologicos.service';
import { bienes_Tecnologicos } from '../../api/bienesTecnologicos';
import { componentesService } from '../../../services/componentes.service';
import { catchError, forkJoin } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Category {
  name: string;
  code: string;
}

@Component({
  selector: 'app-tecnologicos',
  templateUrl: './tecnologicos.component.html',
  styleUrl: './tecnologicos.component.css',
  providers: [DialogService]
})
export class TecnologicosComponent implements OnInit {
  tooltipVisible: boolean = false;
  visible: boolean = false;
  productDialog!: boolean;
  tecnologicos!: bienes_Tecnologicos[];
  //tecnologico!: bienes_Tecnologicos;

  

  loading = [false, false, false, false];

  display: boolean = false;
  inventoryForm!: FormGroup;
  categories: Category[];
  constructor(private tecnologicosService: BienestecnologicosService,
               private componente_service: componentesService,
               private fb: FormBuilder) {

                this.categories = [
                  { name: 'Computadoras', code: 'COMP' },
                  { name: 'Proyectores', code: 'PROJ' },
                  { name: 'Impresoras', code: 'PRNT' }
                ];
  }

  load(index: number) {
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 1000);
  }

  ngOnInit() {
    this.cargarBienesTecnologicos()
    this.inventoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, Validators.required],
      category: ['', Validators.required]
    });
  }

  guardarBienesTecnologicos(): void {
    if (this.inventoryForm.valid) {
      console.log(this.inventoryForm.value);
      // Aquí puedes manejar la lógica para enviar los datos al backend
      this.display = false;
    }
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

  showTooltip() {
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }
  
}

