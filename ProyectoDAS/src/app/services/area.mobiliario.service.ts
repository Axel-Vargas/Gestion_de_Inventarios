import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AreaMobiliarioService {

  API = "http://localhost:4000/api/areas"

  constructor(private http: HttpClient) { }

  obtenerAreas() {
    return this.http.get(this.API);
  }

  insertarArea(nombre: string, num_piso:string ,id_bloque_per: string) {
    return this.http.post(this.API, { nombre, num_piso ,id_bloque_per})
  }

  actualizarArea(id: String, nombre: string, num_piso:string, id_bloque_per: string) {
    return this.http.put(`${this.API}/${id}`, { nombre, num_piso ,id_bloque_per })
  }

  eliminarArea(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}