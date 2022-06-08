import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBreadComponent } from './quiz-bread.component';

describe('QuizBreadComponent', () => {
  let component: QuizBreadComponent;
  let fixture: ComponentFixture<QuizBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
