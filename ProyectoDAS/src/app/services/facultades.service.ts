import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacultadesService {

  API = "http://localhost:4000/api/facultades"

  constructor(private http: HttpClient) { }

  obtenerFacultades() {
    return this.http.get(this.API);
  }

  insertarFacultad(nombre: string, siglas: string) {
    return this.http.post(this.API, { nombre, siglas})
  }

  actualizarFacultad(id: String, nombre: string, siglas: string) {
    return this.http.put(`${this.API}/${id}`, { nombre, siglas })
  }
}