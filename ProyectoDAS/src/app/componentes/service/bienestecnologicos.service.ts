import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bienes_Tecnologicos } from '../api/bienesTecnologicos';

@Injectable({
  providedIn: 'root'
})
export class BienestecnologicosService {

  constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as bienes_Tecnologicos[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as bienes_Tecnologicos[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as bienes_Tecnologicos[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as bienes_Tecnologicos[])
            .then(data => data);
    }
}
