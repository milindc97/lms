import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleBreadComponent } from './module-bread/module-bread.component';
import { SnapshotModule } from '../snapshot/snapshot.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ModuleListComponent, ModuleBreadComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    SnapshotModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule.forRoot()
  ]
})
export class ModuleModule { }
