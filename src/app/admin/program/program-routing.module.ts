import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramAllocationComponent } from './program-allocation/program-allocation.component';
import { ProgramBreadComponent } from './program-bread/program-bread.component';
import { ProgramListComponent } from './program-list/program-list.component';

const routes: Routes = [
  {
    path: 'allocation',
    component: ProgramAllocationComponent
  },
  {
    path: 'list',
    component: ProgramListComponent
  },
  {
    path: 'activity/:action',
    component: ProgramBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
