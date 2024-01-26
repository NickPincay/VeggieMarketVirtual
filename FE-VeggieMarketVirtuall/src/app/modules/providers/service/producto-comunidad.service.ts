import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductoComunidad } from '../interface/producto-comunidad';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from 'src/app/shared/interface/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ProductoComunidadService {

  private myAppUrl: string = environment.endpoint
  private myApiUrl: string = 'api/ProductoComunidad/'

  constructor(private http: HttpClient) { }

  get(): Observable<ProductoComunidad[]> {
    return this.http.get<ProductoComunidad[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  post(producto: ProductoComunidad, accion: string): Observable<Respuesta> {
    producto.transaccion = accion
    return this.http.post<Respuesta>(`${this.myAppUrl}${this.myApiUrl}`, producto);
  }

}
