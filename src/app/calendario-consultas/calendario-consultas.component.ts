import { Component, OnInit } from '@angular/core';
import { Consulta } from '../interface/consulta';
import { ConsultaService } from '../service/consulta.service';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-calendario-consultas',
  templateUrl: './calendario-consultas.component.html',
  styleUrls: ['./calendario-consultas.component.css']
})
export class CalendarioConsultasComponent implements OnInit {
  dataAtual: Date = new Date();
  diasCalendario: Date[] = [];
  consultas: Consulta[] = [];
  tarefasSubscrition: Subscription = new Subscription();

  constructor(
    private service: ConsultaService,
    public dialog: MatDialog,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.service.listar().subscribe(x => {
      this.consultas = x;
    })
    this.construirCalendario();
  }

  construirCalendario() {
    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDiaDaSemana = 0; // domingo
    const ultimoDiaDaSemana = 6;   // sábado

    // Vai subtraindo -1 até chegarmos no primeiro dia da semana
    const dataInicial = new Date(ano, mes, 1);
    while (dataInicial.getDay() !== primeiroDiaDaSemana) {
      dataInicial.setDate(dataInicial.getDate() - 1);
    }

    // Vai somando +1 até chegarmos no último dia da semana
    const dataFinal = new Date(ano, mes + 1, 0);
    while (dataFinal.getDay() !== ultimoDiaDaSemana) {
      dataFinal.setDate(dataFinal.getDate() + 1);
    }

    this.diasCalendario = [];
    for (
      let data = new Date(dataInicial.getTime());
      data <= dataFinal;
      data.setDate(data.getDate() + 1)
    ) {
      this.diasCalendario.push(new Date(data.getTime()));
    }
  }

  alterarMes(offsetMes: number) {
      this.dataAtual.setMonth(this.dataAtual.getMonth() + offsetMes);
      this.dataAtual = new Date(this.dataAtual.getTime());
      this.construirCalendario();
  }

  abrirModal(consultaModal: Consulta){
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px', 
      height: '200px',
      panelClass: ['custom-modal'],      
    });

    const dadosModal: Consulta = {
      medicoId: consultaModal.medicoId,
      pacienteId: consultaModal.pacienteId,
      data: consultaModal.data,
      duracaoMin: consultaModal.duracaoMin,
      id: 0
    };

    this.modalService.setModalData(dadosModal);

    dialogRef.afterClosed().subscribe(result => {
      console.log('A modal foi fechada');
    });
  }
}