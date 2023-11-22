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
  formularioPaciente!: FormGroup;

  listaPacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  tarefasSubscrition: Subscription = new Subscription();
  campoBusca: string = '';

  constructor(
    private service: PacienteService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.atualizarDados();
    this.service.getDadosAtualizadosObservable().subscribe(() => {
      this.atualizarDados();
    })

    this.formularioPaciente = this.formBuilder.group({
      id: [0],
      nome: ['', Validators.required, Validators.minLength(3)],
      statusFinalizadoPaciente: [false, Validators.required],
      nascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      acompanhante: ['', Validators.required],
    });
  }

  atualizarDados() {
    this.service.listar().subscribe(x => {
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

  salvarCadastro() {
    if (this.formularioPaciente.value.id) {
      this.editarPaciente();
    } else {
      this.criarCadastro();
    }
  }
  criarCadastro() {
    if (this.formularioPaciente.valid) {
      const novoPaciente = this.formularioPaciente.value;
      this.service.criar(novoPaciente).subscribe(() => {
        console.log('Paciente Criado!');
      });
      this.resetarFormulario();
    }
  }

  editarPaciente() {
    if (this.formularioPaciente.valid) {
      const pacienteEditado = this.formularioPaciente.value;
      this.service.editar(pacienteEditado).subscribe(() => {
        console.log('Paciente Editado!');
      });
      this.resetarFormulario();
      this.atualizarDados();
    };
  }

  excluirPaciente(paciente: Paciente) {
    this.service.excluir(paciente).subscribe(() => {
      console.log('Paciente Excluído!');
    });
    this.atualizarDados();
  }

  cancelar() {
    this.resetarFormulario();
  }

  carregarParaEditar(id: number) {
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