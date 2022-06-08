import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeBreadComponent } from './employee-bread/employee-bread.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';

const routes: Routes = [
  {
    path: 'master',
    component: EmployeeMasterComponent
  },
  {
    path: 'registration',
    component: EmployeeRegistrationComponent
  },
  {
    path: 'activity/:action',
    component: EmployeeBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
