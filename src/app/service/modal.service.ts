import { Injectable } from '@angular/core';
import { ConsultaCalendario } from '../model/consultaCalendario';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private consulta: ConsultaCalendario;

  constructor() { }

  ngOnInit(): void {
  }

  setModalData(dados: ConsultaCalendario): void {
    this.consulta = dados;
  }

  getModalData(): ConsultaCalendario {
    return this.consulta;
  }

  // modalConcluida(): Observable<any> {
  //   console.log('aaa');
  //   return of('true');
  // }
}
