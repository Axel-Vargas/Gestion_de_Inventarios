import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BienestecnologicosService } from '../../../services/bienestecnologicos.service';
import { bienes_Tecnologicos } from '../../api/bienesTecnologicos';
import { componentesService } from '../../../services/componentes.service';
import { catchError, forkJoin } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AreasService } from '../../../services/area.service';
import { BloquesService } from '../../../services/bloques.service';
import { Bloque } from '../../api/bloques';
import { Area } from '../../api/Areas';
import { TipoTecnologicoService } from '../../../services/tipotecnologico.service';
import { TipoTecnologico } from '../../api/tipoTecnologico';
import { ProveedorService } from '../../../services/provedor.service';
import { Proveedor } from '../../api/Proveedores';

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
  date2!: Date;
  isDropdownDisabled: boolean = true;
  isFiltrarDisabled: boolean = true;
  loading = [false, false, false, false];
  display: boolean = false;
  inventoryForm!: FormGroup;
  categories: { name: string; code: number }[] = [];
  area: { name: string; code: number }[] = [];
  tipoBien: { name: string; code: number }[] = [];
  proveedor: { name: string; code: number }[] = [];
  repotenciado: { name: string; code: number }[] = [];
  estado: { name: string; code: number }[] = [];
  bloques!: Bloque[];
  areas!: Area[];
  fecha_adquisicion = '';
  constructor(
    private tecnologicosService: BienestecnologicosService,
    private componente_service: componentesService,
    private areasService: AreasService,
    private bloquesService: BloquesService,
    private tipoTecnologiaService: TipoTecnologicoService,
    private proveedorservice: ProveedorService,
    private fb: FormBuilder
  ) {
    this.cargarBloques()
    this.cargarTipoTecnologico()
    this.cargarProveedores()
    this.estado = [
      { name: 'Operativo', code: 1 },
      { name: 'No Funcional', code: 2 }
    ];
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

  cargarTipoTecnologico() {
    this.tipoTecnologiaService.getTiposTecnologicos().subscribe(
      (data: TipoTecnologico | TipoTecnologico[]) => { 
        if (Array.isArray(data)) {
          this.tipoBien = data
            .filter(bien => bien.nombre !== undefined && bien.id_tipo !== undefined)
            .map(bien => ({ name: bien.nombre!, code: bien.id_tipo! }));
            
        } else if (data.nombre !== undefined && data.id_tipo !== undefined) {
          this.tipoBien = [{ name: data.nombre!, code: data.id_tipo! }];
          
        }
      },
      (error) => {
        
      }
    );
  }
  
  cargarProveedores() {
    this.proveedorservice.getProveedores().subscribe(
      (data: Proveedor | Proveedor[]) => { 
        console.log(data);
        if (Array.isArray(data)) {
          this.proveedor = data
            .filter(provedor => provedor.nombre !== undefined && provedor.id_proveedor !== undefined)
            .map(provedor => ({ name: provedor.nombre!, code: provedor.id_proveedor! }));
            
        } else if (data.nombre !== undefined && data.id_proveedor !== undefined) {
          this.proveedor = [{ name: data.nombre!, code: data.id_proveedor! }];
          
        }
      },
      (error) => {
        console.error(error)
      }
    );
  }

  onSelectBloque(event: any) {
    const selectedBlockId = event.value.code; // Obtén el ID de la opción seleccionada
    this.isDropdownDisabled = false;
    this.cargarAreas(selectedBlockId)
  }

  onSelectArea(event: any) {
    const selectedAreaId = event.value.code; // Obtén el ID de la opción seleccionada
    this.isFiltrarDisabled = false;
  }

  load(index: number) {
    this.loading[index] = true;
    setTimeout(() => (this.loading[index] = false), 1000);
  }

  ngOnInit() {
    this.cargarBienesTecnologicos()
    this.inventoryForm = new FormGroup({
      id_proveedor_per: new FormControl('', Validators.required),
      id_area_per: new FormControl('', Validators.required),
      id_tipo_per: new FormControl('', Validators.required),
      fecha_adquisicion: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      num_serie: new FormControl(''),
      codigo_adicional: new FormControl(''),
      modelo: new FormControl(''),
      codigoUTA: new FormControl(''),
      marca: new FormControl(''),
      localizacion: new FormControl(''),
      ip_tecnologico: new FormControl('')
    });
  }

   // Método para abrir el diálogo de agregar/editar
   openDialog(item?: any) {
    
  }

  guardarBienesTecnologicos(): void {
    const idProveedor = this.inventoryForm.value.id_proveedor_per.code;
    const idArea = this.inventoryForm.value.id_area_per.code;
    const idTipo = this.inventoryForm.value.id_tipo_per.code;
    const estado = this.inventoryForm.value.estado.name;
      // Crear un objeto con solo los campos específicos que deseas enviar
      const nuevoBienTecnologico = {
        marca: this.inventoryForm.value.marca,
        modelo: this.inventoryForm.value.modelo,
        num_serie: this.inventoryForm.value.num_serie,
        fecha_adquisicion: this.inventoryForm.value.fecha_adquisicion,
        estado: estado,
        codigoUTA: this.inventoryForm.value.codigoUTA,
        localizacion: this.inventoryForm.value.localizacion,
        ip_tecnologico: this.inventoryForm.value.ip_tecnologico,
        codigo_adicional: this.inventoryForm.value.codigo_adicional,
        id_tipo_per:idTipo,
        id_area_per: idArea,
        id_proveedor_per: idProveedor
      };
      // Enviar el objeto al servicio
      this.tecnologicosService.agregarBienTecnologico(nuevoBienTecnologico)
        .subscribe((response) => {
          this.cargarBienesTecnologicos(); // Recargar la lista después de agregar
        }, (error) => {
          console.error('Error al guardar el bien tecnológico:', error);
        });
   
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
