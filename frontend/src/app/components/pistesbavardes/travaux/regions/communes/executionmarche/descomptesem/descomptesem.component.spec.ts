import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescomptesemComponent } from './descomptesem.component';

describe('DescomptesemComponent', () => {
  let component: DescomptesemComponent;
  let fixture: ComponentFixture<DescomptesemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescomptesemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescomptesemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
