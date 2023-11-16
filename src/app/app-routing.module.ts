import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioConsultasComponent } from './calendario-consultas/calendario-consultas.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { ConsultasComponent } from './components/consultas/consultas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: CalendarioConsultasComponent,
  },
  {
    path: 'pacientes',
    component: PacientesComponent,
  },
  {
    path: 'medicos',
    component: MedicosComponent,
  },
  {
    path: 'consultas',
    component: ConsultasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
