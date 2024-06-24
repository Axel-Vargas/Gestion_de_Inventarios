import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Area } from '../componentes/api/Areas';

@Injectable({
    providedIn: 'root'
})
export class AreasService {
    private myAppUrl: string;
    private myApiUrl: string;
    private myApiUrlFiltro: string;
    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/areas';
        this.myApiUrlFiltro = 'api/areas/bloque';
    }

    getAreas(): Observable<Area[]> {
        return this.http.get<Area[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }

    getArea(id: number): Observable<Area> {
        return this.http.get<Area>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
    }

    getAreaFiltro(id: number): Observable<Area> {
        return this.http.get<Area>(`${this.myAppUrl}${this.myApiUrlFiltro}/${id}`);
    }

    agregarArea(area: Area): Observable<Area> {
        return this.http.post<Area>(`${this.myAppUrl}${this.myApiUrl}`, area);
    }

    actualizarArea(id: number, area: Area): Observable<any> {
        return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, area);
    }

    eliminarArea(id: number): Observable<any> {
        return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
}
