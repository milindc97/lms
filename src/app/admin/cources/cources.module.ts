import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourcesRoutingModule } from './cources-routing.module';
import { CourcesListComponent } from './cources-list/cources-list.component';
import { CourcesBreadComponent } from './cources-bread/cources-bread.component';
import { SnapshotModule } from '../snapshot/snapshot.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [CourcesListComponent, CourcesBreadComponent],
  imports: [
    CommonModule,
    CourcesRoutingModule,
    SnapshotModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule.forRoot()
  ]
})
export class CourcesModule { }
