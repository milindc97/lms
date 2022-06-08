import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestResultComponent } from './test-result/test-result.component';
import { QuizComponent } from './quiz/quiz.component';
import { OverviewComponent } from './overview/overview.component';
import { QuizOverviewComponent } from './quiz-overview/quiz-overview.component';

const routes: Routes = [
  {
    path: ':id/:code/:type',
    component: QuizComponent
  },
  {
    path:'result',
    component:TestResultComponent
  },
  {
    path:'overview/:id/:code/:type',
    component:QuizOverviewComponent
  },
  {
    path:'',
    component:OverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
