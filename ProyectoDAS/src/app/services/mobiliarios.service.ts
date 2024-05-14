import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MobiliariosService {
  API = "http://localhost:4000/api/mobiliarios"
  
  constructor(private http: HttpClient) {}
  obtenerMobiliarios() {
    return this.http.get(this.API);
  }
}
