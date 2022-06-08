import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveWallComponent } from './active-wall/active-wall.component';
import { NotificationComponent } from './notification/notification.component';
import { PolicyComponent } from './policy/policy.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  { 
    path: 'quiz', 
    loadChildren: () => import('./quiz/quiz.module').then(m => m.QuestionBankModule)
  },
  { 
    path: 'module', 
    loadChildren: () => import('./module/module.module').then(m => m.ModuleModule)
  },
  { 
    path: 'program', 
    loadChildren: () => import('./program/program.module').then(m => m.ProgramModule)
  },
  { 
    path: 'courses', 
    loadChildren: () => import('./cources/cources.module').then(m => m.CourcesModule)
  },
  { 
    path: 'employee', 
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  { 
    path: 'report', 
    loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
  },
  { 
    path: 'notification', 
    component: NotificationComponent
  },
  {
    path:'help',
    component:SupportComponent
  },
  {
    path:'policy',
    component:PolicyComponent
  },
  { 
    path: 'profile', 
    component: ProfileComponent
  },
  { 
    path: 'active-wall', 
    component: ActiveWallComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
