import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-corpo',
  templateUrl: './corpo.component.html',
  styleUrls: ['./corpo.component.css']
})
export class CorpoComponent implements OnInit {
 
  formAbertoPaciente: boolean = false;
  formAbertoMedico: boolean = false;
  formAbertoConsulta: boolean = false;

  formularioPaciente: FormGroup = this.formBuilder.group({
    id: [0],
    nome: ['', Validators.required],
    statusFinalizadoPaciente: [false, Validators.required],
    nascimento: ['', Validators.required],
    cpf: ['', Validators.required],
    acompanhante: ['', Validators.required],
  });
  formularioMedico: FormGroup = this.formBuilder.group({
    id: [0],
    nome: ['', Validators.required],
    statusFinalizadoMedico: [false, Validators.required],
    cpf: ['', Validators.required],
    crm: ['', Validators.required],
    especialidade: ['', Validators.required],
  });
  formularioConsulta: FormGroup = this.formBuilder.group({
    id: [0],
    medicoId: [0],
    pacienteId: [0],
    statusFinalizadoConsulta: [false, Validators.required],
    data: ['', Validators.required],
    duracaoMin: ['', Validators.required],
  });

  constructor(
    private service: PacienteService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  habilitarBotao(): string {
    if (this.formularioPaciente.valid || this.formularioMedico.valid || this.formularioConsulta.valid) {
      return 'botao-salvar';
    } else return 'botao-desabilitado';
  }

  mostrarOuEsconderFormulario(tipo: string) {
    switch (tipo) {
      case 'paciente':
        this.formAbertoPaciente = !this.formAbertoPaciente;
        this.formAbertoMedico = false;
        this.formAbertoConsulta = false;
        break;
      case 'medico':
        this.formAbertoMedico = !this.formAbertoMedico;
        this.formAbertoPaciente = false;
        this.formAbertoConsulta = false;
        break;
      case 'consulta':
        this.formAbertoConsulta = !this.formAbertoConsulta;
        this.formAbertoPaciente = false;
        this.formAbertoMedico = false;
        break;
    
      default:
        break;
    }
    this.resetarFormulario(tipo);
  }

  resetarFormulario(tipo: string) {
    switch (tipo) {
      case 'paciente':
        this.formularioPaciente.reset({
          nome: '',
          statusFinalizadoPaciente: false,
          nascimento: '',
          cpf: '',
          acompanhante: '',
        });
        break;
      case 'medico':
        this.formularioMedico.reset({
          nome: '',
          statusFinalizadoMedico: false,
          especialidade: '',
          cpf: '',
          crm: '',
        });
        break;
      case 'consulta':
        this.formularioConsulta.reset({
          medicoId: '',
          pacienteId: '',
          statusFinalizadoConsulta: false,
          data: '',
          duracaoMin: '',
        });
        break;
    
      default:
        break;
    }
  }

  salvarCadastro(tipo: string) {
    if (this.formularioPaciente.value.id) {
      this.editarPaciente(tipo);
    } else {
      this.criarCadastro(tipo);
    }
  }

  criarCadastro(tipo: string) {
    switch (tipo) {
      case 'paciente':
        if (this.formularioPaciente.valid) {
          const novoPaciente = this.formularioPaciente.value;
          this.service.criar(novoPaciente);
          this.resetarFormulario(tipo);
        }
        break;
      case 'medico':

        break;
      case 'consulta':

        break;
    
      default:
        break;
    }
  }

  editarPaciente(tipo: string) {
    switch (tipo) {
      case 'paciente':
        if (this.formularioPaciente.valid) {
          const pacienteEditado = this.formularioPaciente.value;
          this.service.editar(pacienteEditado, true);
          this.resetarFormulario(tipo);
        }
        break;
      case 'medico':

        break;
      case 'consulta':

        break;
    
      default:
        break;
    }
  }

  cancelar(tipo: string) {
    this.resetarFormulario(tipo);
  }

  carregarParaEditar(id: number, tipo: string) {
    switch (tipo) {
      case 'paciente':
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
        break;
      case 'medico':

        break;
      case 'consulta':

        break;
    
      default:
        break;
    }
  }

}
