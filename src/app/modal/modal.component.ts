import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../service/modal.service';
import { Consulta } from '../interface/consulta';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modalData: Consulta= {
    id: 1,
    medicoId: 2,
    pacienteId: 2,
    data: new Date(),
    duracaoMin: 3
  }

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalData = this.modalService.getModalData();
    console.log(this.modalData);
  }

  close(): void {
    this.dialogRef.close();
  }
}
