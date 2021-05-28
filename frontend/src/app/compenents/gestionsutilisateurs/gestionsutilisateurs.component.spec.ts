import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionsutilisateursComponent } from './gestionsutilisateurs.component';

describe('GestionsutilisateursComponent', () => {
  let component: GestionsutilisateursComponent;
  let fixture: ComponentFixture<GestionsutilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionsutilisateursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionsutilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
