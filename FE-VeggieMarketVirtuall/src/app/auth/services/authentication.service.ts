import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/shared/interface/respuesta';
import { environment } from 'src/environments/environment';
import { ICredenciales } from '../interfaces/icredenciales';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private myAppUrl: string = environment.endpoint
  private myApiUrl: string = 'api/Auth/'

  constructor(private http: HttpClient) { }

  authAdmin(credenciales: ICredenciales): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.myAppUrl}${this.myApiUrl}`, credenciales);
  }

}
