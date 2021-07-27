import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PistesbavardesComponent } from './pistesbavardes.component';

describe('PistesbavardesComponent', () => {
  let component: PistesbavardesComponent;
  let fixture: ComponentFixture<PistesbavardesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PistesbavardesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PistesbavardesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
