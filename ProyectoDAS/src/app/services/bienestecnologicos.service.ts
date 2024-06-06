import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bienes_Tecnologicos } from '../componentes/api/bienesTecnologicos';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class BienestecnologicosService {
    private myAppUrl: string;
    private myApyUrl: string;
    private myApyUrls: string;
    private myApyUrls2: string;
    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApyUrl = 'api/bientecnologico';
        this.myApyUrls = 'api/bientecnologico/obtenerPorBloqueYArea';
        this.myApyUrls2 = 'api/bientecnologico/area';
    }

    getBienesTecnologicos(): Observable<bienes_Tecnologicos[]> {
        return this.http.get<bienes_Tecnologicos[]>(this.myAppUrl + this.myApyUrl);
    }

    getPorBloqueYArea(bloque: string, area: string): Observable<bienes_Tecnologicos[]> {
        const url = `${this.myAppUrl}${this.myApyUrls}/${bloque}/${area}`;
        return this.http.get<bienes_Tecnologicos[]>(url);
    }

    getBienTecnologico(id: number): Observable<bienes_Tecnologicos> {
        return this.http.get<bienes_Tecnologicos>(`${this.myAppUrl}${this.myApyUrl}${id}`);
    }

    agregarBienTecnologico(bien: any): Observable<any> {
        return this.http.post<any>(this.myAppUrl + this.myApyUrl, bien);
    }

    actualizarBienTecnologico(id: number, bien: any): Observable<any> {
        return this.http.put(`${this.myAppUrl}${this.myApyUrl}/${id}`, bien);
    }

    eliminarBienTecnologico(id: number): Observable<any> {
        return this.http.delete(`${this.myAppUrl}${this.myApyUrl}/${id}`);
    }

    getComputadorasDeEscritorio(): Observable<bienes_Tecnologicos[]> {
        return this.http.get<bienes_Tecnologicos[]>(this.myAppUrl + this.myApyUrl).pipe(
            map(bienes => bienes.filter(bien => bien.nombre_bien === 'COMPUTADORA DE ESCRITORIO'))
        );
    }

    getComputadorasPorAreas(id: number): Observable<bienes_Tecnologicos[]> {
        const url = `${this.myAppUrl}${this.myApyUrls2}/${id}`;
        return this.http.get<bienes_Tecnologicos[]>(url);
    }
}
