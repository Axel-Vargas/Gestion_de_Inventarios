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

  obtenerUsuarioPorNombre(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/name/${nombre}`);
  }

  obtenerUsuarioPorId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/${id}`);
  }

  insertarUsuario(nombre: string, direccion: string, correo: string, usuario: string, contrasena: string, rol: string) {
    return this.http.post(this.API, { nombre, direccion, correo, usuario, contrasena, rol })
  }

  actualizarUsuario(id: String, nombre: string, direccion: string, correo: string, usuario: string) {
    return this.http.put(`${this.API}/${id}`, { nombre, direccion, correo, usuario })
  }

  eliminarUsuario(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

  autenticarUsuario(usuario: string, contraseña: string): Observable<any> {
    const body = { usuario, contraseña };
    return this.http.post(`${this.API}/auth`, body).pipe(
      tap((response) => {
        this.authService.setUser(response);
      })
    );
  }
}
