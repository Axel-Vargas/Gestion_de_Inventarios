import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AreaMobiliarioService {

  API = "http://localhost:4000/api/areas"

  constructor(private http: HttpClient) { }

  obtenerAreas() {
    return this.http.get(this.API);
  }
}
