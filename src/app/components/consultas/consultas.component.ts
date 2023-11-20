import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Consulta } from 'src/app/interface/consulta';
import { ConsultaService } from 'src/app/service/consulta.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  formAbertoConsulta: boolean = false;

  formularioConsulta: FormGroup = this.formBuilder.group({
    id: [0],
    medicoId: [0],
    pacienteId: [0],
    statusFinalizadoConsulta: [false, Validators.required],
    data: ['', Validators.required],
    duracaoMin: ['', Validators.required],
  });

  listaConsultas: Consulta[] = [];
  consultasFiltradas: Consulta[] = [];
  tarefasSubscrition: Subscription = new Subscription();
  campoBusca: string = '';

  constructor(
    private service: ConsultaService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.service.listar().subscribe(x => {
      this.listaConsultas = x;
      this.consultasFiltradas = x;
  })}

  habilitarBotao(): string {
    if (this.formularioConsulta.valid) {
      return 'botao-salvar';
    } else return 'botao-desabilitado';
  }

  resetarFormulario() {
    this.formularioConsulta.reset({
      medicoId: '',
      pacienteId: '',
      statusFinalizadoConsulta: false,
      data: '',
      duracaoMin: '',
    });
  }

  cancelar() {
    this.resetarFormulario();
  }
}
