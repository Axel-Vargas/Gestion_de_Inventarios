import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Bloque } from '../componentes/api/bloques';

@Injectable({
    providedIn: 'root'
})
export class BloquesService {
    private myAppUrl: string;
    private myApiUrl: string;
    private myApiUrlFiltro: string;

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/bloques';
        this.myApiUrlFiltro = 'api/bloques/area';
    }

    getBloques(): Observable<Bloque[]> {
        return this.http.get<Bloque[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }

    getBloque(id: number): Observable<Bloque> {
        return this.http.get<Bloque>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
    getBloqueFiltro(id: number): Observable<Bloque> {
        return this.http.get<Bloque>(`${this.myAppUrl}${this.myApiUrlFiltro}/${id}`);
    }

    agregarBloque(bloque: Bloque): Observable<Bloque> {
        return this.http.post<Bloque>(`${this.myAppUrl}${this.myApiUrl}`, bloque);
    }

    actualizarBloque(id: number, bloque: Bloque): Observable<any> {
        return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, bloque);
    }

    eliminarBloque(id: number): Observable<any> {
        return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
}
