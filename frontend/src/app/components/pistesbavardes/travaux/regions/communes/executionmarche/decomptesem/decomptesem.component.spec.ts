import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecomptesemComponent } from './decomptesem.component';

describe('DecomptesemComponent', () => {
  let component: DecomptesemComponent;
  let fixture: ComponentFixture<DecomptesemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecomptesemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecomptesemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
