import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantiesemComponent } from './garantiesem.component';

describe('GarantiesemComponent', () => {
  let component: GarantiesemComponent;
  let fixture: ComponentFixture<GarantiesemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarantiesemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantiesemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
