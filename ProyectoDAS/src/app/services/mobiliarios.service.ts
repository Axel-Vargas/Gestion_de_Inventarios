import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobiliariosService {
  API = "http://localhost:4000/api/mobiliarios"

  constructor(private http: HttpClient) { }
  obtenerMobiliarios() {
    return this.http.get(this.API);
  }

  obtenerUsuarioPorNombre(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/nombre/${nombre}`);
  }
  insertarMobiliaria(bld_bca: string, nombre: string, marca: string, modelo: string, num_serie: string, material: string, color: string, fecha_adquisicion: Date, estado: string, localizacion: string, codigoUTA: string, valor_contable: Number, id_encargado_per: string, id_area_per: string) {
    return this.http.post(this.API, { bld_bca, nombre, marca, modelo, num_serie, material, color, fecha_adquisicion, estado, localizacion, codigoUTA, valor_contable, id_encargado_per, id_area_per })
  }
  eliminarMobiliario(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
  actualizarMobiliarios(id: string, bld_bca: string, nombre: string, marca: string, modelo: string, num_serie: string, material: string, color: string, fecha_adquisicion: Date, estado: string, localizacion: string, codigoUTA: string, valor_contable: Number, id_encargado_per: string, id_area_per: string) {
    return this.http.put(`${this.API}/${id}`, { bld_bca, nombre, marca, modelo, num_serie, material, color, fecha_adquisicion, estado, localizacion, codigoUTA, valor_contable, id_encargado_per, id_area_per })
  }
}
