import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainesdevaleursComponent } from './chainesdevaleurs.component';

describe('ChainesdevaleursComponent', () => {
  let component: ChainesdevaleursComponent;
  let fixture: ComponentFixture<ChainesdevaleursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainesdevaleursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainesdevaleursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
