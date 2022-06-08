import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizBreadComponent } from './quiz-bread/quiz-bread.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: QuizListComponent
  },
  {
    path: 'activity/:action',
    component: QuizBreadComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionBankRoutingModule { }
