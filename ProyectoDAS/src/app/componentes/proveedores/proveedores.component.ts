import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProveedoresService } from '../../services/proveedores.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  proveedores: any = [];
  filterOptions: any = [];

  id: string = '';
  nombre = '';
  direccion = '';
  telefono = '';

  tooltipVisible: boolean = false;
  visible: boolean = false;
  esEdicion: boolean = false;
  soloLetrasRegex = /^[a-zA-Z]*$/;
  soloNumerosRegex = /^[0-9]*$/;

  rolUsuario: number | null = null;

  constructor(private authServices: AuthService, private confirmationService: ConfirmationService, private proveedoresService: ProveedoresService, private messageService: MessageService) { }

  matchModeOptions = [
    { label: 'Empieza con', value: 'startsWith' },
    { label: 'Termina con', value: 'endsWith' },
    { label: 'Contiene', value: 'contains' },
    { label: 'Es igual a', value: 'equals' },
    { label: 'No es igual a', value: 'notEquals' },
  ];

  ngOnInit(): void {
    this.listarProveedores();
  }

  obtenerRolUsuario(): void {
    this.rolUsuario = this.authServices.getUserRole();
  }

  listarProveedores(): void {
    this.proveedoresService.obtenerProveedores().subscribe(
      (response: any) => {
        if (response) {
          this.proveedores = response;
        } else {
          this.proveedores = [];
        }
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }

  registrarProveedor() {
    if (this.nombre == '' || this.direccion == '' || this.telefono == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.proveedoresService.insertarProveedor(this.nombre, this.direccion, this.telefono).subscribe(
        (response) => {
          this.mostrarMensaje("Proveedor registrado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarProveedores();
        },
        (error) => {
          this.mostrarMensaje("Error en el servidor", false);
        }
      )
    };
  }

  eliminarProveedor(id: string) {
    this.proveedoresService.eliminarProveedor(id).subscribe(
      (response) => {
        this.mostrarMensaje("Proveedor eliminado con éxito", true);
        this.listarProveedores();
      },
      (error) => {
        this.mostrarMensaje("Error al eliminar el proveedor", false);
      }
    );
  }

  editarProveedor() {
    if (this.nombre == '' || this.telefono == '' || this.direccion == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.proveedoresService.actualizarProveedor(this.id, this.nombre, this.direccion, this.telefono).subscribe(
        (response) => {
          this.mostrarMensaje("Proveedor actualizado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarProveedores();
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

  showDialogEditar(proveedor: any) {
    this.esEdicion = true;
    this.nombre = proveedor.nombre;
    this.telefono = proveedor.telefono;
    this.direccion = proveedor.direccion;
    this.id = proveedor.id_proveedor;
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
      message: 'El proveedor será eliminado de forma permanente.',
      header: '¿Está seguro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarProveedor(id);
        this.listarProveedores();
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

  limpiarFormulario() {
    this.nombre = '';
    this.telefono = '';
    this.direccion = '';
  }
}
