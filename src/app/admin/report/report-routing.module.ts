import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeePerformanceComponent } from './employee-performance/employee-performance.component';
import { ApiLogComponent } from './api-log/api-log.component';
import { SessionActivityComponent } from './session-activity/session-activity.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { AllocationComponent } from './allocation/allocation.component';
import { CoursewiseComponent } from './coursewise/coursewise.component';
import { QuizwiseComponent } from './quizwise/quizwise.component';
import { ScorewiseComponent } from './scorewise/scorewise.component';
import { StatedeptwiseComponent } from './statedeptwise/statedeptwise.component';
import { UserwiseComponent } from './userwise/userwise.component';


const routes: Routes = [
  {
    path: 'session-activity',
    component: SessionActivityComponent
  },
  {
    path: 'api-log',
    component: ApiLogComponent
  }
  ,
  {
    path: 'employee-performance',
    component: EmployeePerformanceComponent
  }
  ,
  {
    path: 'employee/:id',
    component: ViewEmployeeComponent
  },
  {
    path: 'allocation',
    component: AllocationComponent
  },
  {
    path: 'coursewise',
    component: CoursewiseComponent
  },
  {
    path: 'quizwise',
    component: QuizwiseComponent
  },
  {
    path: 'scorewise',
    component: ScorewiseComponent
  },
  {
    path: 'userwise',
    component: UserwiseComponent
  },
  {
    path: 'statedeptwise',
    component: StatedeptwiseComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
