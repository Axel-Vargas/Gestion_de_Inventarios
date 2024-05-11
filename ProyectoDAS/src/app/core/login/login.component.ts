import { Component } from '@angular/core';
import { LayoutService } from '../../panel/service/app.layout.service';
import { UsuariosService } from '../../services/usuarios.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  rol: string = '';

  constructor(private route: Router, public layoutService: LayoutService, private usuarioService: UsuariosService, private messageService: MessageService) { }

  ngOnInit() { }

  login() {
    this.usuarioService.autenticarUsuario(this.username, this.password).subscribe(
      (response) => {
        console.log('Usuario autenticado:', response);
        this.limpiarFormulario();
        this.route.navigate(['/panel']);
      },
      (error) => {
        this.mostrarMensaje('Credenciales incorrectas', false);
      }
    );
  }

  async mostrarMensaje(mensaje: string, exito: boolean) {
    this.messageService.add(
      {
        severity: exito ? 'success' : 'error',
        summary: exito ? 'Éxito' : 'Error', detail: mensaje
      });
  }


  limpiarFormulario() {
    this.username = '';
    this.password = '';
  }
}
