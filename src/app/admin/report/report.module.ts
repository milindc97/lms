import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportRoutingModule } from './report-routing.module';
import { ApiLogComponent } from './api-log/api-log.component';
import { EmployeePerformanceComponent } from './employee-performance/employee-performance.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ChartsModule } from 'ng2-charts';
import { GaugeChartModule } from 'angular-gauge-chart';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SessionActivityComponent } from './session-activity/session-activity.component';
import { IonicModule } from '@ionic/angular';
import { CoursewiseComponent } from './coursewise/coursewise.component';
import { QuizwiseComponent } from './quizwise/quizwise.component';
import { ScorewiseComponent } from './scorewise/scorewise.component';
import { StatedeptwiseComponent } from './statedeptwise/statedeptwise.component';
import { UserwiseComponent } from './userwise/userwise.component';
import { AllocationComponent } from './allocation/allocation.component';



@NgModule({
  declarations: [
    ApiLogComponent,
    EmployeePerformanceComponent,
    ViewEmployeeComponent,
    SessionActivityComponent,
    CoursewiseComponent,
    QuizwiseComponent,
    ScorewiseComponent,
    StatedeptwiseComponent,
    UserwiseComponent,
    AllocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    GaugeChartModule,
    NgbProgressbarModule,
    ReportRoutingModule,
    TranslateModule,
    IonicModule.forRoot()
  ]
})
export class ReportModule { }
