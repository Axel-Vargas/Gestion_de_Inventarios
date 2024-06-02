import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FacultadesService } from '../../../services/facultades.service';

@Component({
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrl: './facultades.component.css'
})
export class FacultadesComponent {
  tooltipVisible: boolean = false;
  facultades: any = [];
  filterOptions: any = [];

  id: string = '';
  nombre = '';
  siglas = '';

  visible: boolean = false;
  esEdicion: boolean = false;
  soloLetrasRegex = /^[a-zA-Z]*$/;
  soloNumerosRegex = /^[0-9]*$/;

  constructor(private confirmationService: ConfirmationService, private facultadesService: FacultadesService, private messageService: MessageService) { }

  matchModeOptions = [
    { label: 'Empieza con', value: 'startsWith' },
    { label: 'Termina con', value: 'endsWith' },
    { label: 'Contiene', value: 'contains' },
    { label: 'Es igual a', value: 'equals' },
    { label: 'No es igual a', value: 'notEquals' },
  ];

  ngOnInit(): void {
    this.listarFacultades();
  }

  listarFacultades(): void {
    this.facultadesService.obtenerFacultades().subscribe(
      (response: any) => {
        if (response && response.facultades) {
          this.facultades = response.facultades;
        } else {
          this.facultades = [];
        }
      },
      (error) => {
        console.error('Error al obtener facultades:', error);
      }
    );
  }

  registrarFacultad() {
    if (this.nombre == '') {
      this.mostrarMensaje("Inserte el nombre de la Facultad", false);
    } else {
      this.facultadesService.insertarFacultad(this.nombre, this.siglas).subscribe(
        (response) => {
          this.mostrarMensaje("Facultad registrado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarFacultades();
        },
        (error) => {
          this.mostrarMensaje("Error en el servidor", false);
        }
      )
    };
  }

  editarFacultad() {
    if (this.nombre == '') {
      this.mostrarMensaje("Inserte el nombre de la Facultad", false);
    } else {
      this.facultadesService.actualizarFacultad(this.id, this.nombre, this.siglas).subscribe(
        (response) => {
          this.mostrarMensaje("Facultad actualizada con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarFacultades();
        },
        (error) => {
          this.mostrarMensaje("Hubo un problema", false);
        }
      )
    };
  }

  showTooltip() {
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

  showDialogAgregar() {
    this.esEdicion = false;
    this.visible = true;
    this.limpiarFormulario();
  }

  showDialogEditar(facultad: any) {
    this.esEdicion = true;
    this.nombre = facultad.nombre;
    this.siglas = facultad.siglas;
    this.id = facultad.id_facultad;
    this.visible = true;
  }

  async mostrarMensaje(mensaje: string, exito: boolean) {
    this.messageService.add(
      {
        severity: exito ? 'success' : 'error',
        summary: exito ? 'Éxito' : 'Error', detail: mensaje
      });
  }

  handleInput(event: any) {
    const inputValue = event.target.value;
    if (!this.soloLetrasRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/[^a-zA-Z\s]/g, '');
    }
  }

  handleInputNumbers(event: any) {
    const inputValue = event.target.value;
    if (!this.soloNumerosRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/\D/g, '');
    }
  }

  limpiarFormulario() {
    this.nombre = '';
    this.siglas = '';
  }
}