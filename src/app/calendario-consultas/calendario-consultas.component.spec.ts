import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioConsultasComponent } from './calendario-consultas.component';

describe('CalendarioConsultasComponent', () => {
  let component: CalendarioConsultasComponent;
  let fixture: ComponentFixture<CalendarioConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioConsultasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
