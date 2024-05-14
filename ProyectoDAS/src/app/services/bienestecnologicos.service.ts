import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bienes_Tecnologicos } from '../componentes/api/bienesTecnologicos';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class BienestecnologicosService {
    private myAppUrl: string;
    private myApyUrl: string;

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApyUrl = 'api/bientecnologico';
    }

    getBienesTecnologicos(): Observable<bienes_Tecnologicos[]> {
        return this.http.get<bienes_Tecnologicos[]>(this.myAppUrl + this.myApyUrl);
    }

    getBienTecnologico(id: number): Observable<bienes_Tecnologicos> {
        return this.http.get<bienes_Tecnologicos>(`${this.myAppUrl}${this.myApyUrl}${id}`);
    }

    agregarBienTecnologico(bien: bienes_Tecnologicos): Observable<bienes_Tecnologicos> {
        return this.http.post<bienes_Tecnologicos>(this.myAppUrl + this.myApyUrl, bien);
    }

    actualizarBienTecnologico(id: number, bien: bienes_Tecnologicos): Observable<any> {
        return this.http.put(`${this.myAppUrl}${this.myApyUrl}${id}`, bien);
    }

    eliminarBienTecnologico(id: number): Observable<any> {
        return this.http.delete(`${this.myAppUrl}${this.myApyUrl}${id}`);
    }
}
