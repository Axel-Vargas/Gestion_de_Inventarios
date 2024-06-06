import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Historial } from '../componentes/api/Historial';

@Injectable({
    providedIn: 'root'
})
export class HistorialService {
    private myAppUrl: string;
    private myApiUrl: string; // Corregido de "myApyUrl" a "myApiUrl"

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApiUrl = 'api/historial';
    }

    getHistorial(): Observable<Historial[]> {
        return this.http.get<Historial[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
    
    getHistorialById(id: number): Observable<Historial> {
        return this.http.get<Historial>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
    }
    
    agregarHistorial(historial: Historial): Observable<Historial> {
        return this.http.post<Historial>(`${this.myAppUrl}${this.myApiUrl}`, historial);
    }
    
    actualizarHistorial(id: number, historial: Historial): Observable<any> {
        return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, historial);
    }
    
    eliminarHistorial(id: number): Observable<any> {
        return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
    }
}
