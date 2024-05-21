import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API = "http://localhost:4000/api/usuarios"

  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerUsuarios() {
    return this.http.get(this.API);
  }

  obtenerUsuarioPorCedula(cedula: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/cedula/${cedula}`);
  }

  obtenerUsuarioPorId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/${id}`);
  }

  insertarUsuario(cedula: string, nombre: string, apellido: string, correo: string, telefono: string, contrasena: string, rol: string) {
    return this.http.post(this.API, { cedula, nombre, apellido, correo, telefono, contrasena, rol})
  }

  actualizarUsuario(id: String, cedula: string, nombre: string, apellido: string, correo: string, telefono: string, contrasena: string, rol: string) {
    return this.http.put(`${this.API}/${id}`, { cedula, nombre, apellido, correo, telefono, contrasena, rol})
  }

  eliminarUsuario(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

  autenticarUsuario(usuario: string, contrasena: string): Observable<any> {
    const body = { usuario, contrasena };
    return this.http.post(`${this.API}/auth`, body).pipe(
      tap((response) => {
        this.authService.setUser(response);
      })
    );
  }
}
