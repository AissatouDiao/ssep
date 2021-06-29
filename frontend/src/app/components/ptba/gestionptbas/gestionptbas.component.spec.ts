import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionptbasComponent } from './gestionptbas.component';

describe('GestionptbasComponent', () => {
  let component: GestionptbasComponent;
  let fixture: ComponentFixture<GestionptbasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionptbasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionptbasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
