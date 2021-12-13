import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreagequaliteComponent } from './agreagequalite.component';

describe('AgreagequaliteComponent', () => {
  let component: AgreagequaliteComponent;
  let fixture: ComponentFixture<AgreagequaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreagequaliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreagequaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
