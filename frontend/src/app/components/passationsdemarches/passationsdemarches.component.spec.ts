import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassationsdemarchesComponent } from './passationsdemarches.component';

describe('PassationsdemarchesComponent', () => {
  let component: PassationsdemarchesComponent;
  let fixture: ComponentFixture<PassationsdemarchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassationsdemarchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassationsdemarchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
