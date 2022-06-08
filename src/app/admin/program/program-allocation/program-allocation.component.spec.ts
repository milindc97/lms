import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAllocationComponent } from './program-allocation.component';

describe('ProgramAllocationComponent', () => {
  let component: ProgramAllocationComponent;
  let fixture: ComponentFixture<ProgramAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
