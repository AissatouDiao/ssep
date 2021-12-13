import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationsaccompagneesComponent } from './organisationsaccompagnees.component';

describe('OrganisationsaccompagneesComponent', () => {
  let component: OrganisationsaccompagneesComponent;
  let fixture: ComponentFixture<OrganisationsaccompagneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationsaccompagneesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationsaccompagneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
