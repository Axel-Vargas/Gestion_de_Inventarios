import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  API = "http://localhost:4000/api/inicio";

  constructor(private http: HttpClient) { }

  obtenerTotalBienes(): Observable<number> {
    return this.http.get<number>(`${this.API}/total-bienes`);
  }

  obtenerTotalAreas(): Observable<number> {
    return this.http.get<number>(`${this.API}/total-areas`);
  }

  obtenerTotalProveedores(): Observable<number> {
    return this.http.get<number>(`${this.API}/total-proveedores`);
  }

  obtenerTotalUsuarios(): Observable<number> {
    return this.http.get<number>(`${this.API}/total-usuarios`);
  }

  //aqui
  obtenerComponentesLibres(): Observable<number> {
    return this.http.get<number>(`${this.API}/componentesLibres`);
  }
  

  obtenerTotalRepotencias(): Observable<number> {
    return this.http.get<number>(`${this.API}/totalrepotencias`);
  }

  obtenerTotalBienesMobiliarios(): Observable<number> {
    return this.http.get<number>(`${this.API}/totalbienesmobilarios`);
  }
  
  obtenerTotalTecnologicosBodega(): Observable<number> {
    return this.http.get<number>(`${this.API}/tecnologicosBodega`);
  }


  obtenerBloques(idFacultad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/bloques`, {
      params: {
        idFacultad: idFacultad.toString()
      }
    });
  }

  obtenerFacultades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/facultades`);
  }
}