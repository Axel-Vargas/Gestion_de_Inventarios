import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Dependencia } from '../componentes/api/Dependencias';

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/dependencia';
  }

  getDependencias(): Observable<Dependencia[]> {
    return this.http.get<Dependencia[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getDependencia(id: number): Observable<Dependencia> {
    return this.http.get<Dependencia>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  agregarDependencia(dependencia: Dependencia): Observable<Dependencia> {
    return this.http.post<Dependencia>(`${this.myAppUrl}${this.myApiUrl}`, dependencia);
  }

  actualizarDependencia(dependencia: Dependencia): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${dependencia.id_dep}`, dependencia);
  }

  eliminarDependencia(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
}
