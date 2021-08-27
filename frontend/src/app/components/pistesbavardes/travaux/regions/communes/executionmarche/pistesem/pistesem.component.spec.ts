import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PistesemComponent } from './pistesem.component';

describe('PistesemComponent', () => {
  let component: PistesemComponent;
  let fixture: ComponentFixture<PistesemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PistesemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PistesemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
