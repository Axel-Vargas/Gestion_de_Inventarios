import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bienes_Tecnologicos } from '../componentes/api/bienesTecnologicos';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Componentes } from '../componentes/api/componentes';

@Injectable({
    providedIn: 'root'
})
export class componentesService {
  private myAppUrl: string;
  private myApyUrl: string;

  constructor(private http: HttpClient) {
      this.myAppUrl = environment.endpoint;
      this.myApyUrl = 'api/componentes';
  }

    getComponentes(): Observable<Componentes[]> {
      return this.http.get<Componentes[]>(this.myAppUrl + this.myApyUrl);
    }

    getComponentesLibres(): Observable<Componentes[]> {
      return this.http.get<Componentes[]>(this.myAppUrl + this.myApyUrl+'/libres');
    }

    getbienesAsignar(): Observable<Componentes[]> {
      return this.http.get<Componentes[]>(this.myAppUrl + this.myApyUrl+'/bienes');
    }

    getComponente(id: number): Observable<Componentes> {
      return this.http.get<Componentes>(`${this.myAppUrl}${this.myApyUrl}${id}`);
    }
  
    agregarComponente(componente: Componentes): Observable<Componentes> {
      return this.http.post<Componentes>(this.myAppUrl + this.myApyUrl, componente);
    }
  
    actualizarComponente(id: number, componente: Componentes): Observable<any> {
      return this.http.put(`${this.myAppUrl}${this.myApyUrl}/${id}`, componente);
    }

    asignarComponente(id: number, id_bien_per: number): Observable<any> {
      const data = { id_bien_per: id_bien_per };
      return this.http.put(`${this.myAppUrl}${this.myApyUrl}/asignar/${id}`, data);
    }
    

    eliminarComponente(id: number): Observable<any> {
      return this.http.delete(`${this.myAppUrl}${this.myApyUrl}/${id}`);
    }
}
