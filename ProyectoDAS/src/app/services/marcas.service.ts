import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Marcas } from '../componentes/api/Marcas';

@Injectable({
    providedIn: 'root'
})
export class MarcasService {
    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/marcas';
    }

    getMarcas(): Observable<Marcas[]> {
        return this.http.get<Marcas[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }

    getMarca(id: number): Observable<Marcas> {
        return this.http.get<Marcas>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }

    agregarMarca(marcas: Marcas): Observable<Marcas> {
        return this.http.post<Marcas>(`${this.myAppUrl}${this.myApiUrl}`, marcas);
    }

    actualizarMarca(id: number, marcas: Marcas): Observable<any> {
        return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, marcas);
    }

    eliminarMarca(id: number): Observable<any> {
        return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
}
