import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { Medico } from '../interface/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private readonly API = 'https://localhost:44361/Medico';  
  private medicoSubject = new BehaviorSubject<Medico[]>([]);
  medico$ = this.medicoSubject.asObservable();

  constructor(private http: HttpClient) { }

  listar(): void {
    let params = new HttpParams().appendAll({
      _sort: 'id',
      _order: 'desc',
    });
    this.http.get<Medico[]>(this.API+'/selecionarTodos', { params }).subscribe(x => {
      let medicosTemporarios = this.medicoSubject.getValue();
      medicosTemporarios = medicosTemporarios.concat(x);
      this.medicoSubject.next(medicosTemporarios);
    });
  }
}
