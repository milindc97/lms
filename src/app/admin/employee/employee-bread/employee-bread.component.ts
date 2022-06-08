import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-employee-bread',
  templateUrl: './employee-bread.component.html',
  styleUrls: ['./employee-bread.component.scss']
})
export class EmployeeBreadComponent implements OnInit {
  edit:boolean=false;
  empId="";
  empCode="";
  employeeId="";
  empSalutation="";
  empFirstName="";
  empLastName="";
  empEmail="";
  empMobile="";
  empDOB:any;
  empGender="";
  empDepartment="";
  empState="";
  empBranch="";
  empCluster="";
  empDesignation="";
  empSalutationError="";
  empFirstNameError="";
  empLastNameError="";
  empEmailError="";
  empMobileError="";
  empDOBError="";
  empGenderError="";
  empDepartmentError="";
  empStateError="";
  empBranchError="";
  empClusterError="";
  empDesignationError="";
  constructor(private title:Title,public route:ActivatedRoute,public api:AdminapiService,public datepipe:DatePipe,public toastController:ToastController) {
    this.title.setTitle("Employee Master - "+environment.companyName);
   }

  ngOnInit(): void {
      this.route.params.subscribe(data=>{
        if(data.action == "create"){
          this.edit = false;
        }else{
          this.edit = true;
          this.route.queryParams.subscribe(data=>{
            this.empId = data.id;
            this.getEmployeeById();
          })
        }
      })
  }
  getEmployeeById(){
    this.api.singleUser(this.empId).subscribe(data=>{
      this.empCode = data.data.employeeCode;
      this.employeeId = data.data.employeeId;
      this.empSalutation = data.data.salutation;
      this.empFirstName = data.data.firstName;
      this.empLastName = data.data.lastName;
      this.empEmail = data.data.email;
      this.empMobile = data.data.mobile;
      this.empDOB = this.datepipe.transform(data.data.dob, 'yyyy-MM-dd');
      this.empState = data.data.stateEmp;
      this.empCluster = data.data.cluster;
      this.empBranch = data.data.branch;
      this.empDesignation = data.data.designation;
      console.log(this.empDOB)
      this.empGender = data.data.gender;
      this.empDepartment = data.data.department;
    });
  }
  back(){
    window.history.back()
  }
  editEmployee(){
    this.clearError();

    if(this.empSalutation == ""){
      this.empSalutationError = "has-error";
      return;
    }

    if(this.empFirstName == ""){
      this.empFirstNameError = "has-error";
      return;
    }

    if(this.empLastName == ""){
      this.empLastNameError = "has-error";
      return;
    }
    if(this.empEmail == ""){
      this.empEmailError = "has-error";
      return;
    }
    if(this.empMobile == ""){
      this.empMobileError = "has-error";
      return;
    }
    if(this.empGender == ""){
      this.empGenderError = "has-error";
      return;
    }
    if(this.empDOB == "" || this.empDOB == undefined){
      this.empDOBError = "has-error";
      return;
    }
    if(this.empDepartment == ""){
      this.empDepartmentError = "has-error";
      return;
    }

    this.api.updateUser(this.empFirstName,this.empLastName,this.empSalutation,this.empEmail,this.empMobile,this.empDOB,this.empGender,this.empDepartment,this.empId).subscribe(data=>{

      if(data.status){
          this.successPresentToast(data.message);
      } else {
        this.errorPresentToast(data.message);
      }
    })
  }
  async errorPresentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color:'danger'
    });
    toast.present();
  }

  async successPresentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color:'success'
    });
    toast.present();
  }

  clearError(){
    this.empSalutationError="";
    this.empFirstNameError="";
    this.empLastNameError="";
    this.empEmailError="";
    this.empMobileError="";
    this.empDOBError="";
    this.empGenderError="";
    this.empDepartmentError="";
  }
  clearForm(){
    this.empSalutation="";
    this.empFirstName="";
    this.empLastName="";
    this.empEmail="";
    this.empMobile="";
    this.empDOB="";
    this.empGender="";
    this.empDepartment="";
  }

}
