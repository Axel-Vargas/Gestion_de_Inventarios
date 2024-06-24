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
    private myApyUrls3: string;
    private myApyUrls4: string;
    private myApyUrls5: string;
    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;
        this.myApyUrl = 'api/bientecnologico';
        this.myApyUrls = 'api/bientecnologico/obtenerPorBloqueYArea';
        this.myApyUrls2 = 'api/bientecnologico/area';
        this.myApyUrls3 = 'api/bientecnologico/estado';
        this.myApyUrls4 = 'api/bientecnologico/encargado';
        this.myApyUrls5 = 'api/bientecnologico/obtenerPorBloque';
    }

    getBienesTecnologicos(): Observable<bienes_Tecnologicos[]> {
        return this.http.get<bienes_Tecnologicos[]>(this.myAppUrl + this.myApyUrl);
    }
    
    getPorBloqueYArea(bloque: string, area: string): Observable<bienes_Tecnologicos[]> {
    const url = `${this.myAppUrl}${this.myApyUrls}/${bloque}/${area}`;
    return this.http.get<bienes_Tecnologicos[]>(url);
    }
    
    getBienTecnologico(id: number): Observable<bienes_Tecnologicos> {
        return this.http.get<bienes_Tecnologicos>(`${this.myAppUrl}${this.myApyUrl}/${id}`);
    }
    getPorBloque(bloque: string): Observable<bienes_Tecnologicos[]> {
        const url = `${this.myAppUrl}${this.myApyUrls5}/${bloque}`;
        return this.http.get<bienes_Tecnologicos[]>(url);
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
            map(bienes => bienes.filter(bien => bien.nombre === 'COMPUTADORA DE ESCRITORIO'))
        );
    }

    getBienesTecnologicosPrestados(): Observable<bienes_Tecnologicos[]> {
        return this.http.get<bienes_Tecnologicos[]>(this.myAppUrl + this.myApyUrl).pipe(
            map(bienes => bienes.filter(bien => bien.prestado === 'SI'))
        );
    }

    getBienesTecnologicosPorAreas(id: number): Observable<bienes_Tecnologicos[]> {
        const url = `${this.myAppUrl}${this.myApyUrls2}/${id}`;
        return this.http.get<bienes_Tecnologicos[]>(url);
    }

    getBienesTecnologicosPorEstado(estado: string): Observable<bienes_Tecnologicos[]> {
        const url = `${this.myAppUrl}${this.myApyUrls3}/${estado}`;
        return this.http.get<bienes_Tecnologicos[]>(url);
    }

    getBienesTecnologicosPorEncargado(encargado: string): Observable<bienes_Tecnologicos[]> {
        const url = `${this.myAppUrl}${this.myApyUrls4}/${encargado}`;
        return this.http.get<bienes_Tecnologicos[]>(url);
    }

    getComputadorasPorAreas(id: number): Observable<bienes_Tecnologicos[]> {
        return this.http.get<bienes_Tecnologicos[]>(this.myAppUrl + this.myApyUrls2 +'/'+id).pipe(
            map(bienes => bienes.filter(bien => bien.nombre === 'COMPUTADORA DE ESCRITORIO'))
        );
    }
}
