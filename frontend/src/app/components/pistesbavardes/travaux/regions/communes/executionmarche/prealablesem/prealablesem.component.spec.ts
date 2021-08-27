import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrealablesemComponent } from './prealablesem.component';

describe('PrealablesemComponent', () => {
  let component: PrealablesemComponent;
  let fixture: ComponentFixture<PrealablesemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrealablesemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrealablesemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
