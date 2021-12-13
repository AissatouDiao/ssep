import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviproductionComponent } from './suiviproduction.component';

describe('SuiviproductionComponent', () => {
  let component: SuiviproductionComponent;
  let fixture: ComponentFixture<SuiviproductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviproductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviproductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
