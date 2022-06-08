import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveWallComponent } from './active-wall/active-wall.component';
import { CalenderComponent } from './calender/calender.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  { 
    path: 'quiz', 
    loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule),
  },
  { 
    path: 'program', 
    loadChildren: () => import('./program/program.module').then(m => m.ProgramModule)
  },
  { 
    path: 'module', 
    loadChildren: () => import('./module/module.module').then(m => m.ModuleModule)
  },
  { 
    path: 'course', 
    loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
  },
  { 
    path: 'help', 
    component: SupportComponent
  },
  { 
    path: 'calender', 
    component: CalenderComponent
  },
  { 
    path: 'certificates', 
    component: CertificatesComponent
  },
  { 
    path: 'profile', 
    component: ProfileComponent
  },
  { 
    path: 'active-wall', 
    component: ActiveWallComponent
  },
  { 
    path: 'notification', 
    component: NotificationComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpRoutingModule { }
