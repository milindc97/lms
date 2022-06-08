import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapshotComponent } from './snapshot.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SnapshotComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [SnapshotComponent]
})
export class SnapshotModule { }
