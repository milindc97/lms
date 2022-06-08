import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramBreadComponent } from './program-bread/program-bread.component';
import { SnapshotModule } from '../snapshot/snapshot.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramAllocationComponent } from './program-allocation/program-allocation.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProgramListComponent, ProgramBreadComponent, ProgramAllocationComponent],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    SnapshotModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule.forRoot()
  ]
})
export class ProgramModule { }
