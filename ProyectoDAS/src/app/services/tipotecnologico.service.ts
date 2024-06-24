import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { TipoTecnologico } from '../componentes/api/tipoTecnologico';


@Injectable({
    providedIn: 'root'
})
export class TipoTecnologicoService {
    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/tipotecnologico'; 
    }

    getTiposTecnologicos(): Observable<TipoTecnologico[]> {
        return this.http.get<TipoTecnologico[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }

    getTipoTecnologico(id: number): Observable<TipoTecnologico> {
        return this.http.get<TipoTecnologico>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
    }

    agregarTipoTecnologico(tipo: TipoTecnologico): Observable<TipoTecnologico> {
        return this.http.post<TipoTecnologico>(`${this.myAppUrl}${this.myApiUrl}`, tipo);
    }

    actualizarTipoTecnologico( tipo: TipoTecnologico): Observable<any> {
        return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${tipo.id}`, tipo);
    }

    eliminarTipoTecnologico(id: number): Observable<any> {
        return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
    }
}
