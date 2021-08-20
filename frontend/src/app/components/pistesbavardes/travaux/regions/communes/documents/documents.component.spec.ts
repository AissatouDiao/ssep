import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Documents1Component } from './documents.component';

describe('DocumentsComponent', () => {
  let component: Documents1Component;
  let fixture: ComponentFixture<Documents1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Documents1Component]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Documents1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
