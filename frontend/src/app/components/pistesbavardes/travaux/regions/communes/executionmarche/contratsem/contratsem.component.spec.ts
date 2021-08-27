import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsemComponent } from './contratsem.component';

describe('ContratsemComponent', () => {
  let component: ContratsemComponent;
  let fixture: ComponentFixture<ContratsemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratsemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratsemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
