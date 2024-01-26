import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Factura } from '../interfaces/factura';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/shared/interface/respuesta';

@Injectable({
  providedIn: 'root'
})
export class FacturarService {

  private myAppUrl: string = environment.endpoint
  private myApiUrl: string = 'api/Factura/'

  constructor(private http: HttpClient) { }

  post(factura: Factura): Observable<Respuesta> {    
    return this.http.post<Respuesta>(`${this.myAppUrl}${this.myApiUrl}`, factura);
  }

}
