import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourcesListComponent } from './cources-list.component';

describe('CourcesListComponent', () => {
  let component: CourcesListComponent;
  let fixture: ComponentFixture<CourcesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourcesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
