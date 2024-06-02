import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Bloques2Service {

  API = "http://localhost:4000/api/bloques"

  constructor(private http: HttpClient) { }

  obtenerBloques() {
    return this.http.get(this.API);
  }

  insertarBloque(nombre: string, id_facu_per: string) {
    return this.http.post(this.API, { nombre, id_facu_per})
  }

  actualizarBloque(id: String, nombre: string, id_facu_per: string) {
    return this.http.put(`${this.API}/${id}`, { nombre, id_facu_per })
  }

  eliminarBloque(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}