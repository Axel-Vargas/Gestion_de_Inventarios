import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  API = "http://localhost:4000/api/inicio"

  constructor(private http: HttpClient) { }

  obtenerProveedores() {
    return this.http.get(this.API);
  }

  insertarProveedor(nombre: string, direccion: string, telefono: string ) {
    return this.http.post(this.API, { nombre, direccion, telefono })
  }

  actualizarProveedor(id: String, nombre: string, direccion: string, telefono: string ) {
    return this.http.put(`${this.API}/${id}`, { nombre, direccion, telefono  })
  }

  eliminarProveedor(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}