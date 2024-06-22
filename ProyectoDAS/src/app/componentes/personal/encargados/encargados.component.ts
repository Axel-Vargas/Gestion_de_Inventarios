import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { EncargadosService } from '../../../services/encargados.service';
import { catchError, forkJoin } from 'rxjs';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrl: './encargados.component.css'
})


export class EncargadosComponent {
  encargados: any = [];
  selectedEncargado: any;
  filterOptions: any = [];
  bienesMobiliarios: any[] = [];
  bienesTecnologicos: any[] = [];

  id: string = '';
  cedulaBuscada: string = '';
  cedula = '';
  nombre = '';
  apellido = '';
  telefono = '';
  direccion = '';
  mensajeValidacionCedula: string = '';
  displayModalBienes: boolean = false;

  tooltipVisible: boolean = false;
  visible: boolean = false;
  esEdicion: boolean = false;
  soloLetrasRegex = /^[a-zA-Z]*$/;
  soloNumerosRegex = /^[0-9]*$/;
  draggedEncargado: any = null;
  sourceBienes: any[] = [];
  targetBienes: any[] = [];
  bienesDisponibles: any[] = [];
  draggedBien: any;

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
        if (response) {
          this.encargados = response.map((encargado: any) => ({
            ...encargado,
            nombreCompleto: `${encargado.nombre} ${encargado.apellido}`
          }));
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
      this.encargadosService.insertarEncargado(this.cedula, this.nombre, this.apellido, this.telefono, this.direccion, 1).subscribe(
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

  showDialogPasoDeBien(encargado: any) {

    forkJoin({
      bienesMobiliarios: this.encargadosService.obtenerBienesMobiliariosAsignados(encargado.id_encargado),
      bienesTecnologicos: this.encargadosService.obtenerBienesTecnologicosAsignados(encargado.id_encargado)
    }).subscribe(
      (response: any) => {
        const { bienesMobiliarios, bienesTecnologicos } = response;
        this.sourceBienes = [...bienesMobiliarios, ...bienesTecnologicos];
      },
      (error) => {
        console.error('Error al obtener bienes asignados:', error);
      }
    );

    this.displayModalBienes = true;
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
      event.target.value = inputValue.replace(/[^a-zA-Z\s]/g, '');
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

  dragStart(bien: any) {
    this.draggedBien = bien;
  }

  drop() {
    if (this.draggedBien) {
      let draggedBienesIndex = this.findIndex(this.draggedBien);
      this.targetBienes = [...this.targetBienes, this.draggedBien];
      this.sourceBienes = this.sourceBienes?.filter((val, i) => i != draggedBienesIndex);
      this.draggedBien = null;
    }
  }

  dragEnd() {
    this.draggedBien = null;
  }

  findIndex(bien: any) {
    let index = -1;
    for (let i = 0; i < this.sourceBienes.length; i++) {
      if (bien.id_bien === this.sourceBienes[i].id_bien) {
        index = i;
        break;
      }
    }
    return index;
  }

  confirmTransfer() {
    if (this.selectedEncargado && this.targetBienes.length > 0) {
      const bienesIds = this.targetBienes.map(bien => bien.id_bien);
  
      if (bienesIds.length > 0) {
        for (let i = 0; i < this.targetBienes.length; i++) {
          const bien = this.targetBienes[i];
          if (!bien.atributos) {
            this.encargadosService.updateBienesEncargadoMobiliario(bien.id_bien, this.selectedEncargado.id_encargado).subscribe(
              response => {
                this.mostrarMensaje("Traspaso de Bien realizado con exito", true);
              },
              error => {
                this.mostrarMensaje("Hubo un problema al traspasar el bien", false);
              }
            );
          } else {
            this.encargadosService.updateBienesEncargadoTecnologico(bien.id_bien, this.selectedEncargado.id_encargado).subscribe(
              response => {
                this.mostrarMensaje("Traspaso de Bien realizado con exito", true);
              },
              error => {
                this.mostrarMensaje("Hubo un problema al traspasar el bien", false);
              }
              
            );
            console.log(this.selectedEncargado.id_encargado);
          }
        }
      }  
      this.targetBienes = [];
      this.selectedEncargado = null;
      this.displayModalBienes = false;
    }
  }

  cancelTransfer() {
    this.targetBienes = [];
    this.selectedEncargado = null;
    this.displayModalBienes = false;
  }

  moveAllToTarget() {
    this.targetBienes = this.targetBienes.concat(this.sourceBienes);
    this.sourceBienes = [];
  }

  moveAllToSource() {
    this.sourceBienes = this.sourceBienes.concat(this.targetBienes);
    this.targetBienes = [];
  }

  limpiarFormulario() {
    this.cedula = '';
    this.nombre = '';
    this.apellido = '';
    this.telefono = '';
    this.direccion = '';
  }

  openTransferModalForNullEncargados() {
    this.encargadosService.getBienesDisponibles().subscribe(
      bienes => {
        this.sourceBienes = bienes;
  
        this.displayModalBienes = true;
      },
      error => {
        console.error('Error al obtener los bienes disponibles:', error);
      }
    );
  }
}
