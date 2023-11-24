import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, ignoreElements } from 'rxjs';
import { Consulta } from '../interface/consulta';
import { ConsultaCalendario } from '../model/consultaCalendario';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private readonly API = 'https://localhost:44361/Consulta';  

  constructor(private http: HttpClient) { }

  listar(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.API+'/selecionarTodos');
  }
  
  listarDadosConsulta(consultaId: number): Observable<ConsultaCalendario[]> {
    return this.http.get<ConsultaCalendario[]>(this.API+'/mostrarConsultaCalendario/' + `${consultaId}`);
  }
}
