import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  },
  {
    path: 'course/:id',
    component: CourseOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
