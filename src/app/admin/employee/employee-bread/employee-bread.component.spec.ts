import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBreadComponent } from './employee-bread.component';

describe('EmployeeBreadComponent', () => {
  let component: EmployeeBreadComponent;
  let fixture: ComponentFixture<EmployeeBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
