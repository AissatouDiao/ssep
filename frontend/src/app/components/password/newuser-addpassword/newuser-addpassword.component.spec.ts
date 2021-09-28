import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserAddpasswordComponent } from './newuser-addpassword.component';

describe('NewuserAddpasswordComponent', () => {
  let component: NewuserAddpasswordComponent;
  let fixture: ComponentFixture<NewuserAddpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewuserAddpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserAddpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
