import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesvebalemComponent } from './procesvebalem.component';

describe('ProcesvebalemComponent', () => {
  let component: ProcesvebalemComponent;
  let fixture: ComponentFixture<ProcesvebalemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesvebalemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesvebalemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
