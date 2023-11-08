import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../service/paciente.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  constructor(private service: PacienteService) { }

  ngOnInit(): void {
    this.service.listar();
  }

}
