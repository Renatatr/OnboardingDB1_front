import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/interface/medico';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  formAbertoMedico: boolean = false;

  formularioMedico: FormGroup = this.formBuilder.group({
    id: [0],
    nome: ['', Validators.required],
    statusFinalizadoMedico: [false, Validators.required],
    cpf: ['', Validators.required],
    crm: ['', Validators.required],
    especialidade: ['', Validators.required],
  });

  listaMedicos: Medico[] = [];
  medicosFiltrados: Medico[] = [];
  tarefasSubscrition: Subscription = new Subscription();
  campoBusca: string = '';

  constructor(
    private service: MedicoService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.service.listar().subscribe(x => {
      this.listaMedicos = x;
      this.medicosFiltrados = x;
  })}

  filtrarMedicoPorNome(nome: string){
    this.campoBusca = nome.trim().toLocaleLowerCase();
    if (nome) {
      this.medicosFiltrados = this.listaMedicos.filter(x => x.nome.toLocaleLowerCase().includes(this.campoBusca));
    } else {
      this.medicosFiltrados = this.listaMedicos;
    }
  }

  habilitarBotao(): string {
    if (this.formularioMedico.valid) {
      return 'botao-salvar';
    } else return 'botao-desabilitado';
  }

  resetarFormulario() {
    this.formularioMedico.reset({
      nome: '',
      statusFinalizadoMedico: false,
      especialidade: '',
      cpf: '',
      crm: '',
    });
  }

  cancelar() {
    this.resetarFormulario();
  }
}
