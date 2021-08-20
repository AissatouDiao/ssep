import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionmarcheComponent } from './executionmarche.component';

describe('ExecutionmarcheComponent', () => {
  let component: ExecutionmarcheComponent;
  let fixture: ComponentFixture<ExecutionmarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutionmarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionmarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
