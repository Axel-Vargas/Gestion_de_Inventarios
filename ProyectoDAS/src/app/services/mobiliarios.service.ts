import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobiliariosService {
  API = "http://localhost:4000/api/mobiliarios"

  constructor(private http: HttpClient) {}
  obtenerMobiliarios() {
    return this.http.get(this.API);
  }

  obtenerUsuarioPorNombre(nombre: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/nombre/${nombre}`);
  }
}
