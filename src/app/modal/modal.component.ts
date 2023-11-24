import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../service/modal.service';
import { Consulta } from '../interface/consulta';
import { shakeTrigger } from '../animations';
import { ConsultaCalendario } from '../model/consultaCalendario';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    shakeTrigger
  ]
})
export class ModalComponent implements OnInit {
  animationState:boolean = false;
  modalData: ConsultaCalendario;
  concuirModal: string;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalData = this.modalService.getModalData();
  }

  onButtonClick() {
    this.animationState = !this.animationState;
    this.close();
    // this.modalService.modalConcluida().subscribe(x => {
    //   this.concuirModal = x;  
    // });
  }

  close(): void {
    this.dialogRef.close();
  }
}
