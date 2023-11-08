import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, ignoreElements } from 'rxjs';

import { Paciente } from '../interface/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private readonly API = 'https://localhost:44361/Paciente';  
  private pacienteSubject = new BehaviorSubject<Paciente[]>([]);
  paciente$ = this.pacienteSubject.asObservable();

  constructor(private http: HttpClient) { }

  listar(): void {
    let params = new HttpParams().appendAll({
      _sort: 'id',
      _order: 'desc',
    });
    this.http.get<Paciente[]>(this.API+'/selecionaTodos', { params }).subscribe(x => {
      let pacientesTemporarios = this.pacienteSubject.getValue();
      pacientesTemporarios = pacientesTemporarios.concat(x);
      this.pacienteSubject.next(pacientesTemporarios);
    });
  }

  criar(paciente: Paciente): void {
    const pacienteCorreto: any = {}
    pacienteCorreto.acompanhante = paciente.acompanhante;
    pacienteCorreto.nascimento = paciente.nascimento;
    pacienteCorreto.nome = paciente.nome;
    pacienteCorreto.cpf = paciente.cpf;
    pacienteCorreto.id = 0;
    
    this.http.post<Paciente>(this.API, pacienteCorreto).subscribe(novoPaciente => {
      const pacientes = this.pacienteSubject.getValue();
      pacientes.unshift(novoPaciente);
      this.pacienteSubject.next(pacientes);
    });
  }
}
