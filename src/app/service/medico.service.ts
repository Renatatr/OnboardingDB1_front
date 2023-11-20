import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Medico } from '../interface/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private readonly API = 'https://localhost:44361/Medico';  

  constructor(private http: HttpClient) { }

  listar(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.API+'/selecionarTodos');
  }
}
