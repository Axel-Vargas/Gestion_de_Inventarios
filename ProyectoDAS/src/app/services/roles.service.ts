import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  API = "http://localhost:4000/api/roles"

  constructor(private http: HttpClient) { }

  obtenerRoles() {
    return this.http.get(this.API);
  }
}
