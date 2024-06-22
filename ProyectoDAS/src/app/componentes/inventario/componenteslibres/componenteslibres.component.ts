import { Component, OnInit } from '@angular/core';
import { Componentes } from '../../api/componentes';
import { Marcas } from '../../api/Marcas';
import { Proveedor } from '../../api/Proveedores';
import { componentesService } from '../../../services/componentes.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MarcasService } from '../../../services/marcas.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProveedorService } from '../../../services/provedor.service';

@Component({
  selector: 'app-componenteslibres',
  templateUrl: './componenteslibres.component.html',
  styleUrl: './componenteslibres.component.css'
})
export class ComponenteslibresComponent implements OnInit {
  tooltipVisible: boolean = false;
  componentes: Componentes[] = [];
  displayModal: boolean = false;
  isEditing: boolean = false;
  bien_tecnologico: any[] = [];
  displayDialog: boolean = false; 
  componenteSeleccionado: Componentes | null = null;

  selectedComponente: Componentes = {
    id_componente: 0,
    nombre: '',
    marca: '',
    modelo: '',
    num_serie: '',
    estado: { label: '', value: '' }, 
    repotenciado: { label: '', value: '' }, 
    codigoUTA: '',
    id_bien_per: 0,
    id_proveedor_per: 0
  };
  marcas: Marcas[] = [];
  proveedores: Proveedor[] = [];

  estadoOptions = ['Funcional', 'No Funcional'];
  repotenciadoOptions = ['Sí', 'No'];

  constructor(private componenteService: componentesService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private marcasService: MarcasService, 
    public dialogService: DialogService,
    private provedorService: ProveedorService, 
  ) { }

  ngOnInit(): void {
     this.getComponentes();
    this.getMarcas();
    this.getProveedores();
    this.getTecnologicos()
  }

  getTecnologicos(): void {
    this.componenteService.getbienesAsignar().subscribe(data => {
      console.log(data);
      this.bien_tecnologico = data.map((item: any) => ({
        id_bien: item.id_bien,
        nombre: item.nombre,
        num_serie: item.num_serie,
        codigoUTA: item.codigoUTA,
        estado: item.estado,
        nombre_bloque: item.nombre_bloque,
        nombre_area: item.nombre_area,
      }));
    });
  }

  selectBien(bien: any) {
    if (this.componenteSeleccionado !== null && this.componenteSeleccionado !== undefined) {
      this.confirmationService.confirm({
        message: '¿Estás seguro de asignar el componente selecccionado a este bien tecnológico?',
        accept: () => {
          if (this.componenteSeleccionado?.id_componente !== undefined) {
            this.componenteService.asignarComponente(this.componenteSeleccionado.id_componente, bien.id_bien).subscribe(
              () => {
                this.getComponentes();
                this.messageService.add({
                  key: 'bc',
                  severity: 'success',
                  summary: 'Mensaje',
                  detail: 'Asignado con éxito',
                });
                this.displayDialog = false;
              },
              error => {
                console.error('Error al asignar el componente', error);
              }
            );
          } else {
            console.error('El id_componente del componente seleccionado es undefined.');
          }
        }
      });
    } else {
      console.error('No se ha seleccionado ningún componente.');
    }
  }
  
  

  show(componente: Componentes): void {
    this.componenteSeleccionado = componente; 
    this.displayDialog = true;
  }

  getComponentes(): void {
    this.componenteService.getComponentesLibres()
      .subscribe(componentes => this.componentes = componentes);
  }
  getMarcas(): void {
    this.marcasService.getMarcasTecnologicos()
      .subscribe(marcas => this.marcas = marcas);
  }

  getProveedores(): void {
    // Llamar al servicio para obtener los proveedores desde la base de datos
    this.provedorService.getProveedores()
      .subscribe(proveedores => this.proveedores = proveedores);
  }

  editComponente(componente: Componentes): void {
    this.selectedComponente = { ...componente };
    this.isEditing = true;
    this.displayModal = true;
  }

  deleteComponente(id: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este componente?',
      accept: () => {
        this.componenteService.eliminarComponente(id)
          .subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Componente eliminado correctamente' });
            this.getComponentes(); // Refrescar la lista después de eliminar
          }, () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el componente' });
          });
      }
    });
  }

  showDialogToAdd(): void {
    this.isEditing = false;
    this.selectedComponente = {
      id_componente: 0,
      nombre: '',
      marca: '',
      modelo: '',
      num_serie: '',
      estado: { label: '', value: '' }, 
      repotenciado: { label: '', value: '' }, 
      codigoUTA: '',
      id_bien_per: 0,
      id_proveedor_per: 0
    };
    this.displayModal = true;
  }

  saveComponente(): void {
    if (this.isEditing) {
      this.componenteService.agregarComponente(this.selectedComponente)
        .subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Componente actualizado correctamente' });
          this.displayModal = false;
          this.getComponentes(); // Refrescar la lista después de actualizar
        }, () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el componente' });
        });
    } else {
      this.componenteService.agregarComponente(this.selectedComponente)
        .subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Componente agregado correctamente' });
          this.displayModal = false;
          this.getComponentes(); // Refrescar la lista después de agregar
        }, () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar el componente' });
        });
    }
  }

  showTooltip() {
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

}
