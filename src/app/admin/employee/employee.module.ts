import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { EmployeeBreadComponent } from './employee-bread/employee-bread.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [EmployeeRegistrationComponent, EmployeeMasterComponent, EmployeeBreadComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),    
    IonicModule.forRoot()
  ],
  providers:[
    DatePipe 
  ]
})
export class EmployeeModule { }
