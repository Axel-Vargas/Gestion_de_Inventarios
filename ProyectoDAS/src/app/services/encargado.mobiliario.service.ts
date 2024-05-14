import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EncargadoMobiliarioService {
  API = "http://localhost:4000/api/encargados"

  constructor(private http: HttpClient) { }

  obtenerEncargados() {
    return this.http.get(this.API);
  }

}
