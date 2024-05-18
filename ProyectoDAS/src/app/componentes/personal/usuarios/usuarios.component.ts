import { Component } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { RolesService } from '../../../services/roles.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  usuarios: any = [];
  roles: any[] = [];
  selectedRole: any;

  id: string = '';
  cedula = '';
  nombre = '';
  apellido = '';
  telefono = '';
  correo = '';
  contrasena = '';
  selectedRol: any = null;

  cedulaBuscada: string = '';
  tooltipVisible: boolean = false;
  visible: boolean = false;
  esEdicion: boolean = false;
  selectedUser: any = null;

  constructor(private confirmationService: ConfirmationService, private usuariosService: UsuariosService, private rolService: RolesService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.listarUsuarios();
    this.listarRoles();
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

  cargarUsuario(cedula: string): void {
    if (this.cedulaBuscada.trim() === '') {
      this.listarUsuarios();
    } else {
      this.usuariosService.obtenerUsuarioPorCedula(this.cedulaBuscada).subscribe(
        (data: any) => {
          this.usuarios = data.usuarios;
        },
        (error) => {
          console.error('Error buscando usuario por cédula', error);
          this.usuarios = [];
        }
      );
    }
  }

  buscarUsuario() {
    this.cargarUsuario(this.cedulaBuscada);
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
        console.error('Error al obtener roles:', error);
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
      this.usuariosService.insertarUsuario(this.cedula, this.nombre, this.apellido, this.correo, this.telefono, this.contrasena, this.selectedRole.id_rol).subscribe(
        (response) => {
          this.mostrarMensaje("Usuario registrado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarUsuarios();
        },
        (error) => {
          this.mostrarMensaje("Correo ya existente", false);
        }
      )
    };
  }

  editarUsuario() {
    if (!this.selectedRole || this.cedula == '' || this.nombre == '' || this.apellido == '' || this.telefono == '' || this.correo == '' || this.contrasena == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.usuariosService.actualizarUsuario(this.id, this.cedula, this.nombre, this.apellido, this.correo, this.telefono, this.contrasena, this.selectedRole.id_rol).subscribe(
        (response) => {
          this.mostrarMensaje("Usuario actualizado con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarUsuarios();
        },
        (error) => {
          this.mostrarMensaje("Correo ya existente", false);
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

  showDialogEditar(usuario: any) {
    this.esEdicion = true;
    this.selectedUser = usuario;
    this.cedula = usuario.cedula;
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;
    this.telefono = usuario.telefono;
    this.correo = usuario.correo;
    this.selectedRole = this.roles.find(role => role.id_rol === usuario.id_rol_per);
    this.contrasena = usuario.contrasena;
    this.id = usuario.id_usuario;
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
      message: 'Este usuario sera eliminado de forma permanente del registro ',
      header: '¿Está seguro?',
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
