import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [OverviewComponent, CourseOverviewComponent],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    TranslateModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProgramModule { }
