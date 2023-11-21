import { Injectable } from '@angular/core';
import { Consulta } from '../interface/consulta';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private consulta: Consulta = {
    id: 1,
    medicoId: 2,
    pacienteId: 2,
    data: new Date(),
    duracaoMin: 3
  }

  constructor() { }

  ngOnInit(): void {
  }

  setModalData(dados: Consulta): void {
    this.consulta = dados;
  }

  getModalData(): Consulta {
    return this.consulta;
  }

}
