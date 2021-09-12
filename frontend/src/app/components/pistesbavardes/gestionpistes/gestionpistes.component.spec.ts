import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionpistesComponent } from './gestionpistes.component';

describe('GestionpistesComponent', () => {
  let component: GestionpistesComponent;
  let fixture: ComponentFixture<GestionpistesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionpistesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionpistesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
