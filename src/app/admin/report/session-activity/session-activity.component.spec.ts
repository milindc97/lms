import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionActivityComponent } from './session-activity.component';

describe('SessionActivityComponent', () => {
  let component: SessionActivityComponent;
  let fixture: ComponentFixture<SessionActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
