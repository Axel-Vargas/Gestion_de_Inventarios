import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BienestecnologicosService } from '../../../services/bienestecnologicos.service';
import { bienes_Tecnologicos } from '../../api/bienesTecnologicos';
import { componentesService } from '../../../services/componentes.service';
import { catchError, forkJoin } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreasService } from '../../../services/area.service';
import { BloquesService } from '../../../services/bloques.service';
import { Bloque } from '../../api/bloques';
import { Area } from '../../api/Areas';

interface Category {
  name: string;
  code: string;
}

@Component({
  selector: 'app-tecnologicos',
  templateUrl: './tecnologicos.component.html',
  styleUrl: './tecnologicos.component.css',
  providers: [DialogService],
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
  categories: { name: string; code: number }[] = [];
  area: { name: string; code: number }[] = [];
  bloques!: Bloque[];
  areas!: Area[];

  constructor(
    private tecnologicosService: BienestecnologicosService,
    private componente_service: componentesService,
    private areasService: AreasService,
    private bloquesService: BloquesService,
    private fb: FormBuilder
  ) {
    this.cargarBloques()
    
  }
  // Métodos para operaciones CRUD de áreas
  cargarAreas(id:number):void {
    this.areasService.getAreaFiltro(id).subscribe(
       (data: Area | Area[]) => { // Puede devolver un solo bloque o un array de bloques
        if (Array.isArray(data)) {
          this.area = data
            .filter(area => area.nombre !== undefined && area.id_area !== undefined)
            .map(area => ({ name: area.nombre!, code: area.id_area! }));
        } else if (data.nombre !== undefined && data.id_area !== undefined) {
          this.area = [{ name: data.nombre!, code: data.id_area! }];
          
        }
      },
      (error) => {
        // Maneja los errores
      }
    );
  }

  cargarBloques() {
    this.bloquesService.getBloqueFiltro(1).subscribe(
      (data: Bloque | Bloque[]) => { 
        if (Array.isArray(data)) {
          this.categories = data
            .filter(bloque => bloque.nombre !== undefined && bloque.id_bloque !== undefined)
            .map(bloque => ({ name: bloque.nombre!, code: bloque.id_bloque! }));
        } else if (data.nombre !== undefined && data.id_bloque !== undefined) {
          this.categories = [{ name: data.nombre!, code: data.id_bloque! }];
          
        }
      },
      (error) => {
        
      }
    );
  }

  onSelectBloque(event: any) {
    const selectedBlockId = event.value.code; // Obtén el ID de la opción seleccionada
    console.log('ID del bloque seleccionado:', selectedBlockId);
    this.cargarAreas(selectedBlockId)
  }

  load(index: number) {
    this.loading[index] = true;
    setTimeout(() => (this.loading[index] = false), 1000);
  }

  ngOnInit() {
    this.cargarBienesTecnologicos();
    this.inventoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, Validators.required],
      category: ['', Validators.required],
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
      componentes: this.componente_service.getComponentes(),
    })
      .pipe(
        catchError((error) => {
          console.error('Error al cargar datos', error);
          return []; // o manejo de error adecuado
        })
      )
      .subscribe(({ bienesTecnologicos, componentes }) => {
        bienesTecnologicos.forEach((t) => {
          t.componentes = componentes.filter(
            (c) => c.id_bien_per === t.id_bien_tec
          );
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
