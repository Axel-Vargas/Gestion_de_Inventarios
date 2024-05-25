import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { BienestecnologicosService } from '../../../services/bienestecnologicos.service';
import { bienes_Tecnologicos } from '../../api/bienesTecnologicos';
import { componentesService } from '../../../services/componentes.service';
import { catchError, forkJoin } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AreasService } from '../../../services/area.service';
import { BloquesService } from '../../../services/bloques.service';
import { Bloque } from '../../api/bloques';
import { Area } from '../../api/Areas';
import { TipoTecnologicoService } from '../../../services/tipotecnologico.service';
import { TipoTecnologico } from '../../api/tipoTecnologico';
import { ProveedorService } from '../../../services/provedor.service';
import { Proveedor } from '../../api/Proveedores';
import { Table } from 'primeng/table';



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
  isDropdownDisabled: boolean = true;
  isFiltrarDisabled: boolean = true;
  loading = [false, false, false, false];
  display: boolean = false;
  componentes: boolean = false;
  inventoryForm!: FormGroup;
  categories: { name: string; code: number }[] = [];
  area: { name: string; code: number }[] = [];
  tipoBien: { name: string; code: number }[] = [];
  proveedor: { name: string; code: number }[] = [];
  repotenciado: { name: string; code: number }[] = [];
  estado: { name: string; code: number }[] = [];
  bloques!: Bloque[];
  areas!: Area[];

  selectedBienTecnologico: any = null;
  isEditMode: boolean = false;
  componentForm!: FormGroup;

  selectedComponente: any = null;
  isEditModeComponentes: boolean = false;

  selectedBlockName!: string;
  selectedAreaName!: string;
  constructor(
    private tecnologicosService: BienestecnologicosService,
    private componente_service: componentesService,
    private areasService: AreasService,
    private bloquesService: BloquesService,
    private tipoTecnologiaService: TipoTecnologicoService,
    private proveedorservice: ProveedorService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.cargarBloques();
    this.cargarTipoTecnologico();
    this.cargarProveedores();

    this.estado = [
      { name: 'Operativo', code: 1 },
      { name: 'No Funcional', code: 2 },
    ];

    this.repotenciado = [
      { name: 'SI', code: 1 },
      { name: 'NO', code: 2 },
    ];
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

  cargarAreas(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.areasService.getAreaFiltro(id).subscribe(
        (data: Area | Area[]) => {
          if (Array.isArray(data)) {
            this.area = data.map((area) => ({
              name: area.nombre !== undefined ? area.nombre : '',
              code: area.id_area !== undefined ? area.id_area : 0,
            }));
          } else {
            this.area = [
              {
                name: data.nombre !== undefined ? data.nombre : '',
                code: data.id_area !== undefined ? data.id_area : 0,
              },
            ];
          }
          resolve();
        },
        (error) => {
          console.error('Error al cargar áreas:', error);
          reject(error);
        }
      );
    });
  }

  cargarBloques() {
    this.bloquesService.getBloqueFiltro(1).subscribe(
      (data: Bloque | Bloque[]) => {
        if (Array.isArray(data)) {
          this.categories = data
            .filter(
              (bloque) =>
                bloque.nombre !== undefined && bloque.id_bloque !== undefined
            )
            .map((bloque) => ({
              name: bloque.nombre!,
              code: bloque.id_bloque!,
            }));
        } else if (data.nombre !== undefined && data.id_bloque !== undefined) {
          this.categories = [{ name: data.nombre!, code: data.id_bloque! }];
        }
      },
      (error) => {}
    );
  }

  cargarTipoTecnologico() {
    this.tipoTecnologiaService.getTiposTecnologicos().subscribe(
      (data: TipoTecnologico | TipoTecnologico[]) => {
        if (Array.isArray(data)) {
          this.tipoBien = data
            .filter(
              (bien) => bien.nombre !== undefined && bien.id_tipo !== undefined
            )
            .map((bien) => ({ name: bien.nombre!, code: bien.id_tipo! }));
        } else if (data.nombre !== undefined && data.id_tipo !== undefined) {
          this.tipoBien = [{ name: data.nombre!, code: data.id_tipo! }];
        }
      },
      (error) => {}
    );
  }

  cargarProveedores() {
    this.proveedorservice.getProveedores().subscribe(
      (data: Proveedor | Proveedor[]) => {
        console.log(data);
        if (Array.isArray(data)) {
          this.proveedor = data
            .filter(
              (provedor) =>
                provedor.nombre !== undefined &&
                provedor.id_proveedor !== undefined
            )
            .map((provedor) => ({
              name: provedor.nombre!,
              code: provedor.id_proveedor!,
            }));
        } else if (
          data.nombre !== undefined &&
          data.id_proveedor !== undefined
        ) {
          this.proveedor = [{ name: data.nombre!, code: data.id_proveedor! }];
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  onSelectBloque(event: any) {
    const selectedBlockId = event.value.code;
    this.selectedBlockName = event.value.name;
    this.isDropdownDisabled = false;
    this.cargarAreas(selectedBlockId);
  }
  
  onSelectArea(event: any) {
     this.selectedAreaName = event.value.name;
    this.isFiltrarDisabled = false;
  }

  load(index: number) {
    this.loading[index] = true;
    forkJoin({
      bienesTecnologicos: this.tecnologicosService.getPorBloqueYArea(this.selectedBlockName,this.selectedAreaName),
      componentes: this.componente_service.getComponentes(),
    })
      .pipe(
        catchError((error) => {
          console.error('Error al cargar datos', error);
          return [];
        })
      )
      .subscribe(({ bienesTecnologicos, componentes }) => {
        bienesTecnologicos.forEach((t) => {
          if (t.atributos && typeof t.atributos === 'string') {
            t.atributos = JSON.parse(t.atributos);
          }
          t.componentes = componentes.filter(
            (c) => c.id_bien_per === t.id_bien_tec
          );
        });
        this.tecnologicos = bienesTecnologicos;
        console.log(this.tecnologicos);
      });
    setTimeout(() => (this.loading[index] = false), 1000);
  }

  abrirModalTecnologico(){
    this.inventoryForm.reset();
    this.display =  true
  }

  ngOnInit() {
    this.cargarBienesTecnologicos();
    this.inventoryForm = new FormGroup({
      id_proveedor_per: new FormControl('', Validators.required),
      id_bloque_per: new FormControl(''),
      id_area_per: new FormControl('', Validators.required),
      fecha_adquisicion: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      num_serie: new FormControl(''),
      nombre_bien: new FormControl('', Validators.required),
      atributos: new FormControl(''),
      modelo: new FormControl(''),
      codigoUTA: new FormControl(''),
      marca: new FormControl(''),
      localizacion: new FormControl(''),
      ip_tecnologico: new FormControl(''),
    });

    this.componentForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', ],
      modelo: ['',],
      num_serie: ['', ],
      codigoUTA: ['', Validators.required],
      estado: ['', Validators.required],
      repotenciado: ['', Validators.required],
      
      id_proveedor_per: new FormControl('', Validators.required),
    });
  }

  guardarBienesTecnologicos(): void {
    const idProveedor = this.inventoryForm.value.id_proveedor_per.code;
    const idArea = this.inventoryForm.value.id_area_per.code;
    const estado = this.inventoryForm.value.estado.name.toUpperCase();

    const nuevoBienTecnologico = {
      marca: this.inventoryForm.value.marca.toUpperCase(),
      modelo: this.inventoryForm.value.modelo.toUpperCase(),
      num_serie: this.inventoryForm.value.num_serie.toUpperCase(),
      fecha_adquisicion: this.inventoryForm.value.fecha_adquisicion,
      estado: estado,
      codigoUTA: this.inventoryForm.value.codigoUTA.toUpperCase(),
      localizacion: this.inventoryForm.value.localizacion.toUpperCase(),
      ip_tecnologico: this.inventoryForm.value.ip_tecnologico.toUpperCase(),
      nombre_bien: this.inventoryForm.value.nombre_bien.toUpperCase(),
      atributos: this.inventoryForm.value.atributos,
      id_area_per: idArea,
      id_proveedor_per: idProveedor,
    };

    if (this.isEditMode) {
      this.tecnologicosService
        .actualizarBienTecnologico(
          this.selectedBienTecnologico.id_bien_tec,
          nuevoBienTecnologico
        )
        .subscribe(
          (response) => {
            this.cargarBienesTecnologicos();
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Actualizado',
              detail: 'Actualizado con éxito',
            });
            this.display = false;
          },
          (error) => {
            console.error('Error al actualizar el bien tecnológico:', error);
          }
        );
    } else {
      this.tecnologicosService
        .agregarBienTecnologico(nuevoBienTecnologico)
        .subscribe(
          (response) => {
            this.cargarBienesTecnologicos();
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Completado',
              detail: 'Ingresado con éxito',
            });
            this.display = false;
          },
          (error) => {
            console.error('Error al guardar el bien tecnológico:', error);
          }
        );
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
          return [];
        })
      )
      .subscribe(({ bienesTecnologicos, componentes }) => {
        bienesTecnologicos.forEach((t) => {
          if (t.atributos && typeof t.atributos === 'string') {
            t.atributos = JSON.parse(t.atributos);
          }
          t.componentes = componentes.filter(
            (c) => c.id_bien_per === t.id_bien_tec
          );
        });
        this.tecnologicos = bienesTecnologicos;
        
        console.log(this.tecnologicos);
      });
  }

  editarBienTecnologico(bien: any): void {
    this.selectedBienTecnologico = bien;
    this.isEditMode = true;
    this.display = true;
    
    const fecha = new Date(bien.fecha_adquisicion);
    const proveedorSeleccionado = this.proveedor.find(
      (p) => p.code === bien.id_proveedor_per
    );
    const tipoSeleccionado = this.tipoBien.find(
      (t) => t.code === bien.id_tipo_per
    );
    const estadoSeleccionado = this.estado.find(
      (e) => e.name.toLowerCase().trim() === bien.estado.toLowerCase().trim()
    );
    this.cargarAreas(bien.id_area_per)
      .then(() => {
        const areaSeleccionada = this.area.find(
          (a) => a.code === bien.id_area_per
        );
        if (areaSeleccionada) {
          this.inventoryForm.patchValue({
            id_proveedor_per: proveedorSeleccionado || null,
            id_area_per: areaSeleccionada || null,
            id_tipo_per: tipoSeleccionado || null,
            fecha_adquisicion: fecha,
            estado: estadoSeleccionado || null,
            num_serie: bien.num_serie,
            nombre_bien: bien.nombre_bien,
            atributos: bien.atributos,
            modelo: bien.modelo,
            codigoUTA: bien.codigoUTA,
            marca: bien.marca,
            localizacion: bien.localizacion,
            ip_tecnologico: bien.ip_tecnologico,
          });
        } else {
          console.error('Área no encontrada para el ID:', bien.id_area_per);
        }
      })
      .catch((error) => {
        console.error('Error al cargar y seleccionar el área:', error);
      });
  }

  eliminar(id: number): void {
    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar este bien tecnológico?',
      accept: () => {
        this.tecnologicosService
        .eliminarBienTecnologico(id)
        .subscribe(
          (response) => {
            this.cargarBienesTecnologicos();
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Eliminado',
              detail: 'Eliminado con éxito',
            });
            this.display = false;
          },
          (error) => {
            console.error('Error al actualizar el bien tecnológico:', error);
          }
        );
      }
  });
    
  }

  // **************** COMPONENTES ****************


  guardarComponentes() {
    if (this.componentForm.valid) {
      const formData = this.componentForm.value;
      if(!this.isEditModeComponentes){
        formData.id_bien_per = this.selectedBienTecnologico.id_bien_tec;
      }else{
        formData.id_bien_per = this.selectedComponente.id_bien_per;
      }

      formData.id_proveedor_per = this.componentForm.value.id_proveedor_per.code;
      formData.estado = this.componentForm.value.estado.name;
      formData.repotenciado = this.componentForm.value.repotenciado.name;
      console.log(this.componentForm.value);
      if (this.isEditModeComponentes) {
        this.componente_service.actualizarComponente(this.selectedComponente.id_componente,formData).subscribe({
          next: (response) => {
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Completado',
              detail: 'Editado con éxito',
            });
            this.componentes = false;
            this.cargarBienesTecnologicos();
          },
          error: (error) => {
            console.error('Error al guardar el componente:', error);
          },
        });
      } else {
        this.componente_service.agregarComponente(formData).subscribe({
          next: (response) => {
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Completado',
              detail: 'Agregado con éxito',
            });
            this.componentes = false;
            this.cargarBienesTecnologicos();
          },
          error: (error) => {
            console.error('Error al guardar el componente:', error);
          },
        });
      }

    } else {
      console.error('Formulario no válido');
    }
  }

  cargarComponentes() {
    this.componente_service.getComponentes().subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Error al guardar el componente:', error);
      },
    });
  }

  openEditComponentModal(componente: any) {
    this.selectedComponente = componente;
    console.log(this.selectedComponente)
    this.isEditModeComponentes = true;
    this.componentes = true;

    const proveedorSeleccionado = this.proveedor.find((p) => p.code === componente.id_proveedor_per);
    const tipoSeleccionado = this.tipoBien.find((t) => t.code === componente.id_tipo_per);
    const estadoSeleccionado = this.estado.find((e) =>e.name.toLowerCase().trim() === componente.estado.toLowerCase().trim());
    const repotenciado = this.repotenciado.find((r) => r.name.toLowerCase().trim() ===componente.repotenciado.toLowerCase().trim());
    this.componentForm.patchValue({
      id_proveedor_per: proveedorSeleccionado || null,
      id_bien_per: tipoSeleccionado || null,
      estado: estadoSeleccionado || null,
      num_serie: componente.num_serie,
      repotenciado: repotenciado || null,
      nombre: componente.nombre,
      modelo: componente.modelo,
      codigoUTA: componente.codigoUTA,
      marca: componente.marca,
    });
  }

  abrirModalComponente(bien: any) {
    this.componentes = true;
    this.selectedBienTecnologico = bien;
    this.componentForm.reset();
  }

  eliminarComponente(id: number){
    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar este componente?',
      accept: () => {
        this.componente_service.eliminarComponente(id).subscribe({
          next: (response) => {
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Eliminado',
              detail: 'Eliminado con éxito',
            });
            this.componentes = false;
            this.cargarBienesTecnologicos();
          },
          error: (error) => {
            console.error('Error al guardar el componente:', error);
          },
        });
      }
  });
   
  }

  showTooltip() {
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }
}
