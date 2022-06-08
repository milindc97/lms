import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourcesBreadComponent } from './cources-bread.component';

describe('CourcesBreadComponent', () => {
  let component: CourcesBreadComponent;
  let fixture: ComponentFixture<CourcesBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourcesBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourcesBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
