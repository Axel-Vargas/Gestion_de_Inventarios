import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BienestecnologicosService } from '../../../services/bienestecnologicos.service';
import { bienes_Tecnologicos } from '../../api/bienesTecnologicos';
import { componentesService } from '../../../services/componentes.service';
import { catchError, forkJoin } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { AreasService } from '../../../services/area.service';
import { BloquesService } from '../../../services/bloques.service';
import { Bloque } from '../../api/bloques';
import { Area } from '../../api/Areas';
import { ProveedorService } from '../../../services/provedor.service';
import { Proveedor } from '../../api/Proveedores';
import { Table } from 'primeng/table';
import { MarcasService} from '../../../services/marcas.service';
import { Marcas } from '../../api/Marcas';
import { TipoTecnologicoService } from '../../../services/tipotecnologico.service';
import { TipoTecnologico } from '../../api/tipoTecnologico';
import { EncargadosService } from '../../../services/encargados.service';
import { Encargados } from '../../api/Encargados';
import { ScannerService } from '../../../services/scanner.service';

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
  marca: { name: string; code: number }[] = [];
  repotenciado: { name: string; code: number }[] = [];
  estado: { name: string; code: number }[] = [];
  encargado: { name: string; code: number }[] = [];
  tipoTecnologico: { name: string; code: number; attributes:any }[] = [];

  //bloques!: Bloque[];
  //areas!: Area[];

  selectedBienTecnologico: any = null;
  isEditMode: boolean = false;
  componentForm!: FormGroup;

  selectedComponente: any = null;
  isEditModeComponentes: boolean = false;

  selectedBlockName!: string;
  selectedAreaName!: string;

  atributosTexto: string = '';
  mostrarDialogo: boolean = false;
  temporalClave: string = '';
  temporalValor: string = '';

  qrCodeImageUrl: string = '';
  qrCodeAltText: string = '';
  showQRCodeModal: boolean = false;

  // Aquí para detalles de bienes
  products: bienes_Tecnologicos[] = []; 
  selectedProduct: bienes_Tecnologicos | null = null;
  showDetailsModal: boolean = false;

  marcas!: any[];
  scannedCode: string = '';

  constructor(
    private tecnologicosService: BienestecnologicosService,
    private componente_service: componentesService,
    private areasService: AreasService,
    private bloquesService: BloquesService,
    private proveedorservice: ProveedorService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private marcasService: MarcasService,
    private confirmationService: ConfirmationService,
    private tipoTecnologicoService:TipoTecnologicoService,
    private encargadosService:EncargadosService,
    private scannerService: ScannerService
  ) {
    this.cargarBloques();
    this.cargarProveedores();

    this.estado = [
      { name: 'Funcional', code: 1 },
      { name: 'No Funcional', code: 2 },
    ];

    this.repotenciado = [
      { name: 'SI', code: 1 },
      { name: 'NO', code: 2 },
    ];
  }

  ngOnInit() {
    this.scannerService.scannedCode$.subscribe(code => {
      this.scannedCode = code;
      const scnnaerNumer = Number(this.scannedCode)
        if(!this.scannedCode){
          this.cargarBienesTecnologicos();
        }else{
          this.cargarBienesTecnologicosPorId(scnnaerNumer)
        }
    });

    this.obtenerMarcas();
    this.obtenerTipoTecnologico()
    this.obtenerEncargados()

    this.inventoryForm = new FormGroup({
      id_proveedor_per: new FormControl('', Validators.required),
      id_bloque_per: new FormControl(''),
      id_area_per: new FormControl('', Validators.required),
      fecha_adquisicion: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      num_serie: new FormControl(''),
      nombre_bien: new FormControl('', Validators.required),
      atributos: this.fb.control({}),
      modelo: new FormControl(''),
      codigoUTA: new FormControl(''),
      marca: new FormControl(''),
      encargado: new FormControl(''),
      localizacion: new FormControl(''),
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
            try {
              t.atributos = JSON.parse(t.atributos);
            } catch (error) {
              console.error('Error parsing JSON for product:', t);
            }
          }
          t.componentes = componentes.filter(
            (c) => c.id_bien_per === t.id_bien_tec
          );
        });
        this.tecnologicos = bienesTecnologicos;
      });
  }

  cargarBienesTecnologicosPorId(id: number): void {
    forkJoin({
      bienesTecnologicos: this.tecnologicosService.getBienTecnologico(id),
      componentes: this.componente_service.getComponentes(),
    }).pipe(
      catchError((error) => {
        console.error('Error al cargar datos', error);
        return [];
      })
    ).subscribe(({ bienesTecnologicos, componentes }) => {
      const arrayBienesTecnologicos = Array.isArray(bienesTecnologicos) ? bienesTecnologicos : [bienesTecnologicos];
      arrayBienesTecnologicos.forEach((t) => {
        if (t.atributos && typeof t.atributos === 'string') {
          try {
            t.atributos = JSON.parse(t.atributos);
          } catch (error) {
            console.error('Error parsing JSON for product:', t);
          }
        }
        t.componentes = componentes.filter(
          (c) => c.id_bien_per === t.id_bien_tec
        );
      });
      this.tecnologicos = arrayBienesTecnologicos;
    });
  }
  
  
  
  showQRCode(imageUrl: string, altText: string) {
    this.qrCodeImageUrl = imageUrl;
    this.qrCodeAltText = altText;
    this.showQRCodeModal = true;
  }

  showBienesDetails(product: bienes_Tecnologicos) {
    this.selectedProduct = product;
    this.showDetailsModal = true;
  }

  obtenerEncargados() {
    this.encargadosService.getEncargados().subscribe((data: Encargados | Encargados[]) => {
        if (Array.isArray(data)) {this.encargado = data.filter((encargados) =>
          encargados.nombre !== undefined && encargados.id_encargado !== undefined).map((encargados) => ({
              name: `${encargados.nombre} ${encargados.apellido}`,
              code: encargados.id_encargado!,
            }));
        } else if (data.nombre !== undefined && data.id_encargado !== undefined) {
          this.encargado = [{ name:  data.nombre, code: data.id_encargado! }];
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerMarcas() {
    this.marcasService.getMarcas().subscribe((data: Marcas | Marcas[]) => {
        console.log(data);
        if (Array.isArray(data)) {this.marca = data.filter((marcas) =>
                marcas.nom_marca !== undefined &&
                marcas.id !== undefined).map((marcas) => ({
                name: marcas.nom_marca!,
                code: marcas.id!,}));
        } else if (data.nom_marca !== undefined && data.id !== undefined) {
          this.marca = [{ name: data.nom_marca!, code: data.id! }];
        }
      },(error) => {
        console.error(error);
      }
    );
  }

  obtenerTipoTecnologico() {
    this.tipoTecnologicoService.getTiposTecnologicos().subscribe((data: TipoTecnologico | TipoTecnologico[]) => {
        if (Array.isArray(data)) {
            this.tipoTecnologico = data.map((tipoTecnologico) => ({
                name: tipoTecnologico.nom_tecnologico!,
                code: tipoTecnologico.id!,
                attributes: tipoTecnologico.atributos 
            }));
        } else if (data.nom_tecnologico !== undefined && data.id !== undefined) {
            this.tipoTecnologico = [{
                name: data.nom_tecnologico!,
                code: data.id!,
                attributes: data.atributos 
            }];
        }

    },
    (error) => {
        console.error(error);
    });
}

actualizarAtributos(valorSeleccionado: any) {
  if (valorSeleccionado && valorSeleccionado.attributes) {
    console.log('Atributos:', valorSeleccionado.attributes);
    this.inventoryForm.patchValue({
      atributos: valorSeleccionado.attributes,
    });
  } else {
    console.log('No hay atributos disponibles');
  }
}

onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

abrirDialogo(): void {
  this.mostrarDialogo = true;
}

cerrarDialogo(): void {
  this.mostrarDialogo = false;
  this.temporalClave = '';
  this.temporalValor = '';
}


agregarAtributo(): void {
  if (this.temporalClave && this.temporalValor) {
    const atributosControl = this.inventoryForm.get('atributos');
    if (atributosControl) {
      let atributosActuales = atributosControl.value ? JSON.parse(atributosControl.value) : {};
      atributosActuales[this.temporalClave] = this.temporalValor;
      // Eliminar el formateo "pretty-printed", guardando el JSON en una línea.
      atributosControl.setValue(JSON.stringify(atributosActuales));
    }
    this.cerrarDialogo();
  }
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
            try {
              t.atributos = JSON.parse(t.atributos);
            } catch (error) {
              console.error('Error parsing JSON for product:', t);
            }
            
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
    this.isEditMode = false;
  }

  
  guardarBienesTecnologicos(): void {
    const idProveedor = this.inventoryForm.value.id_proveedor_per.code;
    const idArea = this.inventoryForm.value.id_area_per.code;
    const estado = this.inventoryForm.value.estado.name.toUpperCase();
    const marca = this.inventoryForm.value.marca.name;
    const nombre = this.inventoryForm.value.nombre_bien.name;
    const encargado = this.inventoryForm.value.encargado.name;
    // Convertir atributos de string JSON a objeto, si no es un objeto ya.
    const atributosObj = typeof this.inventoryForm.value.atributos === 'string' ?
      JSON.parse(this.inventoryForm.value.atributos) : this.inventoryForm.value.atributos;
  
    const nuevoBienTecnologico = {
      marca: marca,
      modelo: this.inventoryForm.value.modelo.toUpperCase(),
      num_serie: this.inventoryForm.value.num_serie.toUpperCase(),
      fecha_adquisicion: this.inventoryForm.value.fecha_adquisicion,
      estado: estado,
      codigoUTA: this.inventoryForm.value.codigoUTA.toUpperCase(),
      localizacion: this.inventoryForm.value.localizacion.toUpperCase(),
      nombre_bien: nombre,
      encargado: encargado,
      atributos: atributosObj, // Asegurarse de que esto es un objeto
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
  

 

  editarBienTecnologico(bien: any): void {
    this.selectedBienTecnologico = bien;
    this.isEditMode = true;
    this.display = true;
    const fecha = new Date(bien.fecha_adquisicion);
    const proveedorSeleccionado = this.proveedor.find((p) => p.code === bien.id_proveedor_per);
    const tipoSeleccionado = this.tipoBien.find((t) => t.code === bien.id_tipo_per);
    const estadoSeleccionado = this.estado.find((e) => e.name.toLowerCase().trim() === bien.estado.toLowerCase().trim());
    const marcaSeleccionado = this.marca.find((m) => m.name.toLowerCase().trim() === bien.marca.toLowerCase().trim());
    const nombre = this.tipoTecnologico.find((tb) => tb.name.toLowerCase().trim() === bien.nombre_bien.toLowerCase().trim());
    const encargado = this.encargado.find((en) => en.name.toLowerCase().trim() === bien.encargado.toLowerCase().trim());
  
    this.cargarAreas(bien.id_area_per).then(() => {
      const areaSeleccionada = this.area.find((a) => a.code === bien.id_area_per);
      if (areaSeleccionada) {
        const bloqueAsociado = this.categories.find((bloque) => bloque.code === areaSeleccionada.code);
        if (bloqueAsociado) {
          this.inventoryForm.patchValue({
            id_proveedor_per: proveedorSeleccionado || null,
            id_area_per: areaSeleccionada || null,
            id_tipo_per: tipoSeleccionado || null,
            id_bloque_per: bloqueAsociado || null,
            fecha_adquisicion: fecha,
            estado: estadoSeleccionado || null,
            num_serie: bien.num_serie,
            nombre_bien: nombre,
            atributos: JSON.stringify(bien.atributos, null, 2),
            modelo: bien.modelo,
            codigoUTA: bien.codigoUTA,
            marca: marcaSeleccionado,
            encargado: encargado,
            localizacion: bien.localizacion,
          });
        } else {
          console.error('Bloque no encontrado para el área ID:', bien.id_area_per);
        }
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
      formData.marca = this.componentForm.value.marca.name;
     //const marca = this.inventoryForm.value.marca.name;
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
    const marcaSeleccionado = this.marca.find((m) => m.name.toLowerCase().trim() === componente.marca.toLowerCase().trim());

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
      marca: marcaSeleccionado,
    });
  }

  abrirModalComponente(bien: any) {
    this.componentes = true;
    this.selectedBienTecnologico = bien;
    this.isEditModeComponentes = false;
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
