import { Component, OnInit } from '@angular/core';
import { Marcas } from '../api/Marcas';
import { MarcasService } from '../../services/marcas.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css'
})
export class MarcasComponent implements OnInit {
  tooltipVisible: boolean = false;
  marcas!: Marcas[];
  marca!: Marcas;
  displayDialog: boolean = false;
  isEditMode: boolean = false;

  tiposMarcas: any[] = [
    { label: 'TECNOLOGICO', value: 'TECNOLOGICO' },
    { label: 'MOBILIARIO', value: 'MOBILIARIO' }
  ];

  rolUsuario: number | null = null;

  constructor(private authServices: AuthService, private marcaService: MarcasService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getMarcas();
  }

  obtenerRolUsuario(): void {
    this.rolUsuario = this.authServices.getUserRole();
  }

  getMarcas() {
    this.marcaService.getMarcas().subscribe(
      data => {
        this.marcas = data;
      },
      error => {
        console.error('Error al obtener marcas:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener marcas' });
      }
    );
  }

  editMarca(marca: Marcas) {
    this.marca = { ...marca }; 
    this.displayDialog = true;
    this.isEditMode = true;
  }

  guardarMarca() {
    if (this.marca.id) {
      this.marcaService.actualizarMarca(this.marca).subscribe(
        () => {
          this.messageService.add({
            key: 'bc',
            severity: 'success',
            summary: 'Completado',
            detail: 'Marca actualizada correctamente',
          });
          this.hideDialog();
          this.getMarcas(); 
        },
        error => {
          console.error('Error al actualizar marca:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar marca' });
        }
      );
    } else {
      this.marcaService.agregarMarca(this.marca).subscribe(
        () => {
          this.messageService.add({
            key: 'bc',
            severity: 'success',
            summary: 'Completado',
            detail: 'Marca agregada correctamente',
          });
          this.hideDialog();
          this.getMarcas(); 
        },
        error => {
          console.error('Error al agregar marca:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar marca' });
        }
      );
    }
  }

  eliminarMarca(id: number) {
    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar esta marca?',
      accept: () => {
        this.marcaService.eliminarMarca(id).subscribe(
          () => {
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Completado',
              detail: 'Marca eliminada correctamente',
            });
            this.getMarcas(); 
          },
          error => {
            console.error('Error al eliminar marca:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar marca' });
          }
        );
        
      }
  });
    
  }

  hideDialog() {
    this.displayDialog = false;
    this.marca = {}; 
  }

  showDialog() {
    this.displayDialog = true;
    this.isEditMode = false;
    this.marca = {}; 
  }

  showTooltip() {
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }
}
