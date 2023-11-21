import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarioConsultasComponent } from './calendario-consultas/calendario-consultas.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';

registerLocaleData(localePT);
@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    CalendarioConsultasComponent,
    CalendarioConsultasComponent,
    PacientesComponent,
    MedicosComponent,
    ConsultasComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
