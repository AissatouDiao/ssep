import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtbaComponent } from './ptba.component';

describe('PtbaComponent', () => {
  let component: PtbaComponent;
  let fixture: ComponentFixture<PtbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtbaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
