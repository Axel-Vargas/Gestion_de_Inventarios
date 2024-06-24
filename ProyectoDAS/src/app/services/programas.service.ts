import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  API = "http://localhost:4000/api/programas"

  constructor(private http: HttpClient) { }

  obtenerProgramas() {
    return this.http.get(this.API);
  }

  insertarPrograma(software: string, version: string, tipo_licencia: string, fecha_adquisicion: Date, laboratorio: string) {
    return this.http.post(this.API, { software, version, tipo_licencia, fecha_adquisicion, laboratorio})
  }

  actualizarPrograma(id: String, software: string, version: string, tipo_licencia: string, fecha_adquisicion: Date, laboratorio: string) {
    return this.http.put(`${this.API}/${id}`, { software, version, tipo_licencia, fecha_adquisicion, laboratorio })
  }

  eliminarPrograma(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
