import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpoComponent } from './corpo.component';

describe('CorpoComponent', () => {
  let component: CorpoComponent;
  let fixture: ComponentFixture<CorpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
