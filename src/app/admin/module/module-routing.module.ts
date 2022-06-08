import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleBreadComponent } from './module-bread/module-bread.component';
import { ModuleListComponent } from './module-list/module-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ModuleListComponent
  },
  {
    path: 'activity/:action',
    component: ModuleBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
