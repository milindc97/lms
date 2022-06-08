import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleOverviewComponent } from './module-overview/module-overview.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: 'overview',
    component: ModuleOverviewComponent
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
export class ModuleRoutingModule { }
