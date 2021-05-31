import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsevaluationsComponent } from './documentsevaluations.component';

describe('DocumentsevaluationsComponent', () => {
  let component: DocumentsevaluationsComponent;
  let fixture: ComponentFixture<DocumentsevaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsevaluationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsevaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
