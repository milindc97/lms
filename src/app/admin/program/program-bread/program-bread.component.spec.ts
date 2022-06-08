import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramBreadComponent } from './program-bread.component';

describe('ProgramBreadComponent', () => {
  let component: ProgramBreadComponent;
  let fixture: ComponentFixture<ProgramBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
