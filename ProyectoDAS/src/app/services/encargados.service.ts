import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncargadosService {

  API = "http://localhost:4000/api/encargados"

  constructor(private http: HttpClient) { }

  obtenerEncargados() {
    return this.http.get(this.API);
  }

  insertarEncargado(cedula: string, nombre: string, apellido: string, telefono: string, direccion: string) {
    return this.http.post(this.API, { cedula, nombre, apellido, telefono, direccion})
  }

  actualizarEncargado(id: String, cedula: string, nombre: string, apellido: string, telefono: string, direccion: string) {
    return this.http.put(`${this.API}/${id}`, { cedula, nombre, apellido, telefono, direccion })
  }

  eliminarEncargado(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
