import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, ignoreElements } from 'rxjs';
import { Consulta } from '../interface/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private readonly API = 'https://localhost:44361/Consulta/selecionaTodos';  
  private consultaSubject = new BehaviorSubject<Consulta[]>([]);
  consulta$ = this.consultaSubject.asObservable();

  constructor(private http: HttpClient) { }

  listar(): void {
    let params = new HttpParams().appendAll({
      _sort: 'id',
      _order: 'desc',
    });
    this.http.get<Consulta[]>(this.API, { params }).subscribe(x => {
      let consultasTemporarias = this.consultaSubject.getValue();
      consultasTemporarias = consultasTemporarias.concat(x);
      this.consultaSubject.next(consultasTemporarias);
    });
  }
}
