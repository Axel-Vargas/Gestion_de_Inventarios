import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encargados } from '../componentes/api/Encargados';

@Injectable({
  providedIn: 'root'
})
export class EncargadosService {

  API = "http://localhost:4000/api/encargados"

  constructor(private http: HttpClient) { }

  obtenerEncargados() {
    return this.http.get(this.API);
  }

  getEncargados(): Observable<Encargados[]> {
    return this.http.get<Encargados[]>(`${this.API}`);
  }
  insertarEncargado(cedula: string, nombre: string, apellido: string, telefono: string, direccion: string, estado: number) {
    return this.http.post(this.API, { cedula, nombre, apellido, telefono, direccion, estado})
  }

  actualizarEncargado(id: String, cedula: string, nombre: string, apellido: string, telefono: string, direccion: string) {
    return this.http.put(`${this.API}/${id}`, { cedula, nombre, apellido, telefono, direccion })
  }

  eliminarEncargado(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

  obtenerBienesMobiliariosAsignados(idEncargado: string): Observable<any> {
    return this.http.get<any>(`${this.API}/${idEncargado}/bienes-mobiliarios`);
  }

  obtenerBienesTecnologicosAsignados(idEncargado: string): Observable<any> {
    return this.http.get<any>(`${this.API}/${idEncargado}/bienes-tecnologicos`);
  }

  updateBienesEncargadoMobiliario(bienes: any[], encargadoId: number): Observable<any> {
    const body = { bienes, encargadoId };
    return this.http.put(`${this.API}/bienes/updateEncargadoMobiliario`, body);
  }

  updateBienesEncargadoTecnologico(bienes: any[], encargadoId: number): Observable<any> {
    const body = { bienes, encargadoId };
    return this.http.put(`${this.API}/bienes/updateEncargadoTecnologico`, body);
  }
}
