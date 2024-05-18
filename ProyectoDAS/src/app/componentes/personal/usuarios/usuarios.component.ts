import { Component } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { RolesService } from '../../../services/roles.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  usuarios: any = [];
  roles: any[] = [];
  selectedRole: any;

  id = '';
  cedula = '';
  nombre = '';
  apellido = '';
  telefono = '';
  correo = '';
  contrasena = '';
  selectedRol = '';

  usuarioSeleccionado: any;
  cedulaBuscada: string = '';
  tooltipVisible: boolean = false;
  visible: boolean = false;
  esEdicion: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService, private usuariosService: UsuariosService, private rolService: RolesService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
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
        console.error('Error al obtener usuarios:', error);
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
    console.log(this.id);
    if (!this.selectedRole || this.cedula == '' || this.nombre == '' || this.apellido == '' || this.telefono == '' || this.correo == '' || this.contrasena == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.usuariosService.actualizarUsuario(this.id, this.cedula, this.nombre, this.apellido, this.telefono, this.correo, this.contrasena, this.selectedRole.Id_rol, "Activo").subscribe(
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
    this.visible = true;
    this.listarRoles();
  }
/*
  showDialogEditar(usuario: any) {
    const userId = this.id;

    // Modificar la URL para incluir el ID del usuario
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: userId },
      queryParamsHandling: 'merge'
    });
    this.usuarioSeleccionado = usuario;
    this.cedula = usuario.ced_usuario;
    this.nombre = usuario.nom_usuario;
    this.apellido = usuario.ape_usuario;
    this.telefono = usuario.tel_usuario;
    this.correo = usuario.correo;
    this.contrasena = usuario.contrasena;
    this.selectedRole = usuario.Id_rol;
    this.visible = true;
    this.listarRoles();
  }
*/
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
