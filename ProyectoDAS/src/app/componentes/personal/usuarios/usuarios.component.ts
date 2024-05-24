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
  mensajeValidacionCedula: string = '';
  mensajeValidacionCorreo: string = '';
  mensajeValidacionContrasena: string = '';
  selectedRol: any = null;

  cedulaBuscada: string = '';
  tooltipVisible: boolean = false;
  visible: boolean = false;
  esEdicion: boolean = false;
  esEdicionContra: boolean = false;
  selectedUser: any = null;
  soloLetrasRegex = /^[a-zA-Z]*$/;
  soloNumerosRegex = /^[0-9]*$/;
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  contrasenasCoinciden: boolean = false;

  matchModeOptions = [
    { label: 'Empieza con', value: 'startsWith' },
    { label: 'Termina con', value: 'endsWith' },
    { label: 'Contiene', value: 'contains' },
    { label: 'Es igual a', value: 'equals' },
    { label: 'No es igual a', value: 'notEquals' },
  ];

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
    if (!this.selectedRole || this.cedula == '' || this.nombre == '' || this.apellido == '' || this.telefono == '' || this.correo == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.usuariosService.actualizarUsuario(this.id, this.cedula, this.nombre, this.apellido, this.correo, this.telefono, this.selectedRole.id_rol).subscribe(
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

  cambiarContrasena() {
    if (this.nuevaContrasena == '' || this.confirmarContrasena == '') {
      this.mostrarMensaje("Complete todos los campos", false);
    } else {
      this.usuariosService.actualizarContrasena(this.id, this.nuevaContrasena).subscribe(
        (response) => {
          this.mostrarMensaje("Contraseña actualizada con éxito", true);
          this.limpiarFormulario();
          this.visible = false;
          this.listarUsuarios();
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

validarCorreo() {
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regexCorreo.test(this.correo)) {
    this.mensajeValidacionCorreo = '';
  } else {
    this.mensajeValidacionCorreo = 'Correo inválido';
  }
}

validarContrasenas(): void {
  this.contrasenasCoinciden = this.nuevaContrasena === this.confirmarContrasena;
  if(!this.contrasenasCoinciden){
  this.mensajeValidacionContrasena = 'Las contraseñas no coinciden';
}else {
  this.mensajeValidacionContrasena = '';
}
  }

showTooltip() {
  this.tooltipVisible = true;
}

hideTooltip() {
  this.tooltipVisible = false;
}

showDialogAgregar() {
  this.esEdicionContra = false;
  this.esEdicion = false;
  this.visible = true;
  this.limpiarFormulario();
}

showDialogEditar(usuario: any) {
  this.esEdicionContra = false;
  this.esEdicion = true;
  this.selectedUser = usuario;
  this.cedula = usuario.cedula;
  this.nombre = usuario.nombre;
  this.apellido = usuario.apellido;
  this.telefono = usuario.telefono;
  this.correo = usuario.correo;
  this.selectedRole = this.roles.find(role => role.id_rol === usuario.id_rol_per);
  this.id = usuario.id_usuario;
  this.visible = true;
}

showDialogContrasena(usuario: any) {
  this.esEdicion = true;
  this.esEdicionContra = true;
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
  this.correo = '';
  this.contrasena = '';
  this.nuevaContrasena = '';
  this.confirmarContrasena = '';
  this.selectedRole = null;
}
}
