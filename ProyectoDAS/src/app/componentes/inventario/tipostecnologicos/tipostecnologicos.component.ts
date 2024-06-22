import { Component, OnInit } from '@angular/core';
import { TipoTecnologico } from '../../api/tipoTecnologico';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TipoTecnologicoService } from '../../../services/tipotecnologico.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-tipostecnologicos',
  templateUrl: './tipostecnologicos.component.html',
  styleUrl: './tipostecnologicos.component.css'
})
export class TipostecnologicosComponent implements OnInit {

  tooltipVisible: boolean = false;
  tiposTecnologicos: TipoTecnologico[] = [];
  selectedTipoTecnologico: TipoTecnologico = { id: 0, nom_tecnologico: '', atributos: {} };
  displayModal: boolean = false;
  isEditing: boolean = false;
  nuevoAtributo: string = '';
  displayModalAtributos: boolean = false;

  constructor(private confirmationService: ConfirmationService, private tipoTecnologicoService: TipoTecnologicoService, private dialogService: DialogService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadTiposTecnologicos();
  }

  loadTiposTecnologicos() {
    this.tipoTecnologicoService.getTiposTecnologicos().subscribe(
      (data: TipoTecnologico[]) => {
        this.tiposTecnologicos = data;
      },
      error => {
        console.error('Error al cargar los datos', error);
      }
    );
  }

  openNew() {
    this.selectedTipoTecnologico = { id: 0, nom_tecnologico: '', atributos: {} };
    this.displayModal = true;
    this.isEditing = false;
  }

  editTipoTecnologico(tipoTecnologico: TipoTecnologico) {
    this.selectedTipoTecnologico = { ...tipoTecnologico, atributos: JSON.parse(tipoTecnologico.atributos) };
    this.displayModal = true;
    this.isEditing = true;
  }

  saveTipoTecnologico() {
    if (this.selectedTipoTecnologico) {
      const tipoTecnologicoToSave: TipoTecnologico = {
        ...this.selectedTipoTecnologico,
        atributos: this.selectedTipoTecnologico.atributos // Mantenerlo como objeto
      };

      if (this.isEditing) {
        this.tipoTecnologicoService.actualizarTipoTecnologico(tipoTecnologicoToSave).subscribe(
          () => {
            this.loadTiposTecnologicos();
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Completado',
              detail: 'Insertado con éxito',
            });
            this.displayModal = false;
          },
          error => {
            console.error('Error al actualizar los datos', error);
          }
        );
      } else {
        this.tipoTecnologicoService.agregarTipoTecnologico(tipoTecnologicoToSave).subscribe(
          () => {
            this.loadTiposTecnologicos();
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Actualizado',
              detail: 'Actualizado con éxito',
            });
            this.displayModal = false;
          },
          error => {
            console.error('Error al crear los datos', error);
          }
        );
      }
    }
  }

  deleteTipoTecnologico(id: number) {
    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar este tipo tecnológico?',
      accept: () => {
        this.tipoTecnologicoService.eliminarTipoTecnologico(id).subscribe(
          () => {
            this.loadTiposTecnologicos();
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Eliminado',
              detail: 'Eliminado con éxito',
            });
            this.displayModal = false;
          },
          error => {
            console.error('Error al eliminar los datos', error);
          }
        );
      }
  });

    
  }

  openModal() {
    this.displayModalAtributos = true;
  }

  agregarAtributo() {
    if (this.nuevoAtributo.trim() !== '') {
      // Actualizar los atributos del tipo tecnológico
      const atributos = { ...this.selectedTipoTecnologico.atributos };
      atributos[this.nuevoAtributo] = '';
      this.selectedTipoTecnologico.atributos = atributos;
      this.nuevoAtributo = ''; 
      this.displayModalAtributos = false;
    }
  }

  removeAtributo(atributo: string) {
    // Eliminar un atributo del tipo tecnológico
    const atributos = { ...this.selectedTipoTecnologico.atributos };
    delete atributos[atributo];
    this.selectedTipoTecnologico.atributos = atributos;
  }

  cancelarModal() {
    this.displayModal = false;
    this.nuevoAtributo = ''; // Limpiar el campo si se cancela
  }

  parseAtributos(atributos: any): string[] {
    // Convertir los atributos a una lista de claves
    return Object.keys(atributos);
  }

  getAtributosKeys(atributos: any): string[] {
    return atributos ? Object.keys(JSON.parse(atributos)) : [];
  }

  showTooltip() {
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }
}
