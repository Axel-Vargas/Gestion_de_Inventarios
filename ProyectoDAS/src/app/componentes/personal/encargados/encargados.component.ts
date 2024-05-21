import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EncargadosService } from '../../../services/encargados.service';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrl: './encargados.component.css'
})
export class EncargadosComponent {

  encargados: any = [];

  id: string = '';
  cedulaBuscada: string = '';
  cedula = '';
  nombre = '';
  apellido = '';
  telefono = '';
  direccion = '';

  tooltipVisible: boolean = false;
  visible: boolean = false;
  esEdicion: boolean = false;

  constructor(private confirmationService: ConfirmationService, private encargadosService: EncargadosService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.listarEncargados();
  }

  listarEncargados(): void {
    this.encargadosService.obtenerEncargados().subscribe(
      (response: any) => {
        if (response && response.encargados) {
          this.encargados = response.encargados;
        } else {
          this.encargados = [];
        }
      },
      (error) => {
        console.error('Error al obtener encargados:', error);
      }
    );
  }

  cargarEncargado(cedula: string): void {
    if (this.cedulaBuscada.trim() === '') {
      this.listarEncargados(); 
    } else {
      this.encargadosService.obtenerEncargadoPorCedula(this.cedulaBuscada).subscribe(
        (data: any) => {
          this.encargados = data.encargados;
        },
        (error) => {
          console.error('Error buscando encargado por cédula', error);
          this.encargados = [];
        }
      );
    }
  }

  buscarEncargado() {
    this.cargarEncargado(this.cedulaBuscada);
  }

  registrarEncargado() {
    if (this.cedula == '' || this.nombre == '' || this.apellido == '' || this.telefono == '' || this.direccion == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.encargadosService.insertarEncargado(this.cedula, this.nombre, this.apellido, this.telefono, this.direccion).subscribe(
        (response) => {
          this.mostrarMensaje("Encargado registrado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarEncargados();
        },
        (error) => {
          this.mostrarMensaje("Error en el servidor", false);
        }
      )
    };
  }

  eliminarEncargado(id: string) {
    this.encargadosService.eliminarEncargado(id).subscribe(
      (response) => {
        this.mostrarMensaje("Encargado eliminado con éxito", true);
        this.listarEncargados();
      },
      (error) => {
        this.mostrarMensaje("Error al eliminar el encargado", false);
      }
    );
  }

  editarEncargado() {
    if (this.cedula == '' || this.nombre == '' || this.apellido == '' || this.telefono == '' || this.direccion == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.encargadosService.actualizarEncargado(this.id, this.cedula, this.nombre, this.apellido, this.telefono, this.direccion).subscribe(
        (response) => {
          this.mostrarMensaje("Encargado actualizado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarEncargados();
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

  showDialogEditar(encargado: any) {
    this.esEdicion = true;
    this.cedula = encargado.cedula;
    this.nombre = encargado.nombre;
    this.apellido = encargado.apellido;
    this.telefono = encargado.telefono;
    this.direccion = encargado.direccion;
    this.id = encargado.id_encargado;
    this.visible = true;
  }

  async mostrarMensaje(mensaje: string, exito: boolean) {
    this.messageService.add(
      {
        severity: exito ? 'success' : 'error',
        summary: exito ? 'Éxito' : 'Error', detail: mensaje
      });
  }

  confirm(id: string) {
    this.confirmationService.confirm({
      message: 'El encargado también será eliminado de todos<br>los bienes a los que haya sido asignado',
      header: '¿Está seguro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarEncargado(id);
        this.listarEncargados();
      },
      reject: () => {
        console.log("rechazado");
      }
    });
  }

  limpiarFormulario() {
    this.cedula = '';
    this.nombre = '';
    this.apellido = '';
    this.telefono = '';
    this.direccion = '';
  }
}
