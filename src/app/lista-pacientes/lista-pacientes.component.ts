import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { Paciente } from '../interface/paciente';
import { Subscription } from 'rxjs';
import { CorpoComponent } from '../components/corpo/corpo.component';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  listaPacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  tarefasSubscrition: Subscription = new Subscription();
  campoBusca: string = '';

  constructor(private service: PacienteService) { }

  ngOnInit(): void {
    this.service.listar();
    this.tarefasSubscrition = this.service.paciente$.subscribe(x => {
      this.listaPacientes = x;
      this.pacientesFiltrados = x;
    })
  }
  
  filtrarPacientePorNome(nome: string){
    this.campoBusca = nome.trim().toLocaleLowerCase();
    if (nome) {
      this.pacientesFiltrados = this.listaPacientes.filter(x => x.nome.toLocaleLowerCase().includes(this.campoBusca));
    } else {
      this.pacientesFiltrados = this.listaPacientes;
    }
  }

  carregarParaEditar(id: number, tipo: string){
    // ????
  }
}
