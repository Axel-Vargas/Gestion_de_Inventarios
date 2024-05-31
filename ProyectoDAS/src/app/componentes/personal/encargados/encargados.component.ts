import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { EncargadosService } from '../../../services/encargados.service';
import { Encargados } from '../../api/Encargados';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrl: './encargados.component.css'
})


export class EncargadosComponent {
  encargados: any = [];
  filterOptions: any = [];

  id: string = '';
  cedulaBuscada: string = '';
  cedula = '';
  nombre = '';
  apellido = '';
  telefono = '';
  direccion = '';
  mensajeValidacionCedula: string = '';

  tooltipVisible: boolean = false;
  visible: boolean = false;
  esEdicion: boolean = false;
  soloLetrasRegex = /^[a-zA-Z]*$/;
  soloNumerosRegex = /^[0-9]*$/;

  constructor(private confirmationService: ConfirmationService, private encargadosService: EncargadosService, private messageService: MessageService) { }

  matchModeOptions = [
    { label: 'Empieza con', value: 'startsWith' },
    { label: 'Termina con', value: 'endsWith' },
    { label: 'Contiene', value: 'contains' },
    { label: 'Es igual a', value: 'equals' },
    { label: 'No es igual a', value: 'notEquals' },
  ];

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

  validarCedula(cedula: string): boolean {
    if (cedula.length !== 10) {
      return false;
    }

    if (!/^\d+$/.test(cedula)) {
      return false;
    }

    const digitoVerificador = parseInt(cedula.charAt(9));
    const digitos = cedula.substr(0, 9).split('').map(digito => parseInt(digito));

    let suma = 0;
    for (let i = 0; i < digitos.length; i++) {
      let digito = digitos[i];
      if (i % 2 === 0) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }
      suma += digito;
    }

    const residuo = suma % 10;
    const digitoEsperado = residuo === 0 ? 0 : 10 - residuo;

    return digitoEsperado === digitoVerificador;
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

  handleInput(event: any) {
    const inputValue = event.target.value;
    if (!this.soloLetrasRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/[^a-zA-Z]/g, '');
    }
  }

  handleInputNumbers(event: any) {
    const inputValue = event.target.value;
    if (!this.soloNumerosRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/\D/g, '');
    }
  }

  handleInputCedula(event: any) {
    const inputValue = event.target.value;
    const cedula = event.target.value;

    if (!this.soloNumerosRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/\D/g, '');
    }

    if (cedula === '') {
      this.mensajeValidacionCedula = '';
    } else {
      const esCedulaValida = this.validarCedula(cedula);
      this.mensajeValidacionCedula = esCedulaValida ? '' : 'Cédula inválida';
    }

  }

  limpiarFormulario() {
    this.cedula = '';
    this.nombre = '';
    this.apellido = '';
    this.telefono = '';
    this.direccion = '';
  }
}
