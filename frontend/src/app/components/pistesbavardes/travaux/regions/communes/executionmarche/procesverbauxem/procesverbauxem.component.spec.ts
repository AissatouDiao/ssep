import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesverbauxemComponent } from './procesverbauxem.component';

describe('ProcesverbauxemComponent', () => {
  let component: ProcesverbauxemComponent;
  let fixture: ComponentFixture<ProcesverbauxemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcesverbauxemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesverbauxemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
