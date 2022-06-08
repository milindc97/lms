import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourcesBreadComponent } from './cources-bread/cources-bread.component';
import { CourcesListComponent } from './cources-list/cources-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: CourcesListComponent
  },
  {
    path: 'activity/:action',
    component: CourcesBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourcesRoutingModule { }
