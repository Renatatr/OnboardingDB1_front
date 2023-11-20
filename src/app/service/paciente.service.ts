import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, ignoreElements, tap } from 'rxjs';

import { Paciente } from '../interface/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private readonly API = 'https://localhost:44361/Paciente';  
  private pacienteSubject = new BehaviorSubject<Paciente[]>([]);
  paciente$ = this.pacienteSubject.asObservable();
  private pacienteAtualizadoSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.API+'/selecionaTodos');
  }

  criar(paciente: Paciente): Observable<Paciente> {
    const pacienteCorreto: any = {}
    pacienteCorreto.acompanhante = paciente.acompanhante;
    pacienteCorreto.nascimento = paciente.nascimento;
    pacienteCorreto.nome = paciente.nome;
    pacienteCorreto.cpf = paciente.cpf;
    pacienteCorreto.id = 0;
    
    return this.http.post<Paciente>(this.API, pacienteCorreto)
      .pipe(
        tap(() => {
          this.pacienteAtualizadoSubject.next(); // Notifica os observadores quando os dados são atualizados
        })
      );
  }

  getDadosAtualizadosObservable(): Observable<void> {
    return this.pacienteAtualizadoSubject.asObservable();
  }

  editar(paciente: Paciente, atualizarSubject: boolean): void {
    const url = `${this.API}/${paciente.id}`;
    this.http.put<Paciente>(url, paciente).subscribe(pacienteEditado => {
      if (atualizarSubject) {
        const paciente = this.pacienteSubject.getValue()
        const index = paciente.findIndex(x => x.id === pacienteEditado.id)
        if (index !== -1) {
          paciente[index] = pacienteEditado
          this.pacienteSubject.next(paciente)
        }
      }
    });
  }

  buscarPorId(id: number): Observable<Paciente> {
    const url = `${this.API}/${id}`;
    return this.http.get<Paciente>(url);
  }
}
