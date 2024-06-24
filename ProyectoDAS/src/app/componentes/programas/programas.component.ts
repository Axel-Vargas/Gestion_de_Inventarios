import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgramasService } from '../../services/programas.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrl: './programas.component.css'
})
export class ProgramasComponent {
  programas: any = [];
  filterOptions: any = [];
  licencias: any[] = [];
  laboratorios: any[] = [];
  selectLicencia: any;
  selectLaboratorio: any;

  id: string = '';
  software = '';
  version = '';
  tipo_licencia = '';
  fecha_adquisicion: any;
  laboratorio = '';
  mensajeValidacionCedula: string = '';

  selectedRepresentativesLi: any[] = [];
  selectedRepresentativesL: any[] = [];
  tooltipVisible: boolean = false;
  visible: boolean = false;
  esEdicion: boolean = false;
  soloLetrasRegex = /^[a-zA-Z]*$/;
  soloNumerosRegex = /^[0-9]*$/;

  rolUsuario: number | null = null;

  constructor(private authServices: AuthService, private confirmationService: ConfirmationService, private programasService: ProgramasService, private messageService: MessageService) { }

  matchModeOptions = [
    { label: 'Empieza con', value: 'startsWith' },
    { label: 'Termina con', value: 'endsWith' },
    { label: 'Contiene', value: 'contains' },
    { label: 'Es igual a', value: 'equals' },
    { label: 'No es igual a', value: 'notEquals' },
  ];

  ngOnInit(): void {
    this.listarProgramas();
    this.obtenerRolUsuario();

    this.licencias = [
      { name: 'Licencia', code: 1 },
      { name: 'Software Libre', code: 2 },
    ];

    this.laboratorios = [
      { name: 'Laboratorios de Computacion', code: 1 },
      { name: 'Laboratorios de Especializacion', code: 2 },
    ];
  }

  obtenerRolUsuario(): void {
    this.rolUsuario = this.authServices.getUserRole();
  }

  listarProgramas(): void {
    this.programasService.obtenerProgramas().subscribe(
      (response: any) => {
        if (response && response.programas) {
          this.programas = response.programas;
        } else {
          this.programas = [];
        }
      },
      (error) => {
        console.error('Error al obtener programas:', error);
      }
    );
  }

  registrarPrograma() {
    if (this.software == '') {
      this.mostrarMensaje("Ingrese el nombre del programa", false);
    } else {
      //const fecha = new Date(this.fecha_adquisicion);
      this.programasService.insertarPrograma(this.software, this.version, this.selectLicencia.name, this.fecha_adquisicion, this.selectLaboratorio.name).subscribe(
        (response) => {
          this.mostrarMensaje("Programa registrado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarProgramas();
        },
        (error) => {
          this.mostrarMensaje("Error en el servidor", false);
        }
      )
    };
  }

  eliminarPrograma(id: string) {
    this.programasService.eliminarPrograma(id).subscribe(
      (response) => {
        this.mostrarMensaje("Programa eliminado con éxito", true);
        this.listarProgramas();
      },
      (error) => {
        this.mostrarMensaje("Error al eliminar el programa", false);
      }
    );
  }

  editarPrograma() {
    if (this.software == '') {
      this.mostrarMensaje("Ingrese el nombre del programa", false);
    } else {
      const fecha = new Date(this.fecha_adquisicion);
      //const fechaFormateada = `${fechaAdquisicionDate.getFullYear()}-${String(fechaAdquisicionDate.getDate()).padStart(2, '0')}-${String(fechaAdquisicionDate.getMonth() + 1).padStart(2, '0')}`;
      this.programasService.actualizarPrograma(this.id, this.software, this.version, this.selectLicencia.name,fecha, this.selectLaboratorio.name).subscribe(
        (response) => {
          this.mostrarMensaje("Programa actualizado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarProgramas();
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
    this.limpiarFormulario();
    this.esEdicion = false;
    this.visible = true;
  }

  showDialogEditar(programa: any) {
    const fecha = new Date(programa.fecha_adquisicion);

    this.esEdicion = true;
    this.software = programa.software;
    this.version = programa.version;
    this.selectLicencia = this.licencias.find(licencia => licencia.name === programa.tipo_licencia);
    this.fecha_adquisicion = fecha;
    this.selectLaboratorio = this.laboratorios.find(laboratorio => laboratorio.name === programa.laboratorio);
    this.id = programa.id_programa;
    this.visible = true;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
      message: 'El programa será eliminado de forma permanente',
      header: '¿Está seguro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarPrograma(id);
        this.listarProgramas();
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

  limpiarFormulario() {
    this.software = '';
    this.version = '';
    this.selectLicencia = null;
    this.fecha_adquisicion = null;
    this.selectLaboratorio = null;
  }
}
