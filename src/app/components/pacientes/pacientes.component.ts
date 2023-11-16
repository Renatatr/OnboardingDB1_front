import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Paciente } from 'src/app/interface/paciente';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  formAbertoPaciente: boolean = false;

  formularioPaciente: FormGroup = this.formBuilder.group({
    id: [0],
    nome: ['', Validators.required],
    statusFinalizadoPaciente: [false, Validators.required],
    nascimento: ['', Validators.required],
    cpf: ['', Validators.required],
    acompanhante: ['', Validators.required],
  });

  listaPacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  tarefasSubscrition: Subscription = new Subscription();
  campoBusca: string = '';

  constructor(
    private service: PacienteService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.service.listar();
    this.tarefasSubscrition = this.service.paciente$.subscribe(x => {
      this.listaPacientes = x;
      this.pacientesFiltrados = x;
  })}
  
  filtrarPacientePorNome(nome: string){
    this.campoBusca = nome.trim().toLocaleLowerCase();
    if (nome) {
      this.pacientesFiltrados = this.listaPacientes.filter(x => x.nome.toLocaleLowerCase().includes(this.campoBusca));
    } else {
      this.pacientesFiltrados = this.listaPacientes;
    }
  }

  habilitarBotao(): string {
    if (this.formularioPaciente.valid) {
      return 'botao-salvar';
    } else return 'botao-desabilitado';
  }

  resetarFormulario() {
    this.formularioPaciente.reset({
      nome: '',
      statusFinalizadoPaciente: false,
      nascimento: '',
      cpf: '',
      acompanhante: '',
    });
  }

  salvarCadastro(tipo: string) {
    if (this.formularioPaciente.value.id) {
      this.editarPaciente(tipo);
    } else {
      this.criarCadastro();
    }
  }

  criarCadastro() {
    if (this.formularioPaciente.valid) {
      const novoPaciente = this.formularioPaciente.value;
      this.service.criar(novoPaciente);
      this.resetarFormulario();
    }
  }

  editarPaciente(tipo: string) {
    if (this.formularioPaciente.valid) {
      const pacienteEditado = this.formularioPaciente.value;
      this.service.editar(pacienteEditado, true);
      this.resetarFormulario();
    }
  }

  cancelar() {
    this.resetarFormulario();
  }

  carregarParaEditar(id: number, tipo: string) {
    this.service.buscarPorId(id!).subscribe((x) => {
      this.formularioPaciente = this.formBuilder.group({
        id: [x.id],
        nome: [x.nome],
        nascimento: [x.nascimento],
        cpf: [x.cpf],
        acompanhante: [x.acompanhante],
      });
    });
    this.formAbertoPaciente = true;
  }
}