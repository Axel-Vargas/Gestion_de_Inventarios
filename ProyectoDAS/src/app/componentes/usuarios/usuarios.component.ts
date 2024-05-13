import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { RolesService } from '../../services/roles.service';
import {  ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  usuarios: any = [];
  roles: any[] = [];
  selectedRole: any;

  cedula = '';
  nombre = '';
  apellido = '';
  telefono = '';
  correo = '';
  contrasena = '';
  selectedRol = '';

  cedulaBuscada: string = '';
  tooltipVisible: boolean = false;
  visible: boolean = false;

  constructor(private confirmationService: ConfirmationService, private usuariosService: UsuariosService, private rolService: RolesService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuariosService.obtenerUsuarios().subscribe(
      (response: any) => {
        if (response && response.usuarios) {
          this.usuarios = response.usuarios;
        } else {
          this.usuarios = [];
        }
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  listarRoles(): void {
    this.rolService.obtenerRoles().subscribe(
      (response: any) => {
        if (response && response.roles) {
          this.roles = response.roles;
        } else {
          this.roles = [];
        }
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  buscarUsuario(): void {
    this.usuariosService.obtenerUsuarioPorCedula(this.cedulaBuscada)
      .subscribe(
        (data) => {
          this.usuarios = data;
        },
        (error) => {
          console.error('Error al obtener usuario por cédula:', error);
        }
      );
  }

  eliminarUsuario(id: string) {
    this.usuariosService.eliminarUsuario(id).subscribe(
      (response) => {
        this.mostrarMensaje("Usuario eliminado con éxito", true);
        this.listarUsuarios();
      },
      (error) => {
        this.mostrarMensaje("Error al eliminar el usuario", false);
      }
    );
  }

  registrarUsuario() {
    if (!this.selectedRole || this.cedula == '' || this.nombre == '' || this.apellido == '' || this.telefono == '' || this.correo == '' || this.contrasena == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.usuariosService.insertarUsuario(this.cedula, this.nombre, this.apellido, this.telefono, this.correo, this.contrasena, this.selectedRole.Id_rol, "Activo").subscribe(
        (response) => {
          this.mostrarMensaje("Usuario registrado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarUsuarios();
        },
        (error) => {
          this.mostrarMensaje("Error al registrar el usuario", false);
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

  showDialog() {
    this.visible = true;
    this.listarRoles();
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
      message: '¿Seguro que desea dar de baja al Usuario?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarUsuario(id);
        this.listarUsuarios();
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
    this.correo = '';
    this.contrasena = '';
    this.selectedRole = null;
  }
}
