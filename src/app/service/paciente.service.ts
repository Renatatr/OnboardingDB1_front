import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { Paciente } from '../interface/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private readonly API = 'https://localhost:44361/Paciente/selecionaTodos';  
  private pacienteSubject = new BehaviorSubject<Paciente[]>([]);
  paciente$ = this.pacienteSubject.asObservable();

  constructor(private http: HttpClient) { }

  listar() {
    let params = new HttpParams().appendAll({
      _sort: 'id',
      _order: 'desc',
    });
    this.http.get<Paciente[]>(this.API, { params }).subscribe(x => {
      let pacientesTemporarios = this.pacienteSubject.getValue();
      pacientesTemporarios = pacientesTemporarios.concat(x);
      this.pacienteSubject.next(pacientesTemporarios);
    });
    return 'a'
  }

}
