import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoreferencementComponent } from './georeferencement.component';

describe('GeoreferencementComponent', () => {
  let component: GeoreferencementComponent;
  let fixture: ComponentFixture<GeoreferencementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoreferencementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoreferencementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
