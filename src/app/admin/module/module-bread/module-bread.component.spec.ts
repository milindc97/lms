import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleBreadComponent } from './module-bread.component';

describe('ModuleBreadComponent', () => {
  let component: ModuleBreadComponent;
  let fixture: ComponentFixture<ModuleBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
