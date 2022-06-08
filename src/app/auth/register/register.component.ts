import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  loader = false;
  empData:any=[];
  employeeCode:any="";
  salutation:any="";
  firstName:any="";
  lastName:any="";
  mobile:any="";
  dob:any="";
  department:any="";
  gender:any="";
  email:any="";
  state:any="";
  cluster:any="";
  branch:any="";
  designation:any="";
  password:any="";
  confirm_password:any="";
  employeeCodeError="";
  salutationError="";
  firstNameError="";
  lastNameError="";
  mobileError="";
  dobError="";
  departmentError="";
  genderError="";
  emailError="";
  stateError="";
  clusterError="";
  branchError="";
  designationError="";
  passwordError="";
  confirm_passwordError="";
  constructor(public apiS:EmpapiService,public toastController:ToastController,public router:Router) {
    $("body").removeClass("skin-blue sidebar-mini");
    $("body").addClass("login-page");
   }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.apiS.getAllUsers().subscribe(data=>{
      this.empData = data.data.map((item:any) => item.department)
      .filter((value:any, index:any, self:any) => self.indexOf(value) === index)
    })
  }
  register(){
    this.clearError();
    if(this.employeeCode == ""){
      this.employeeCodeError = "has-error";
      return;
    }
    if(this.salutation == ""){
      this.salutationError = "has-error";
      return;
    }
    if(this.firstName == ""){
      this.firstNameError = "has-error";
      return;
    }
    if(this.lastName == ""){
      this.lastNameError = "has-error";
      return;
    }
    if(this.mobile == ""){
      this.mobileError = "has-error";
      return;
    }
    if(!/^\d{10}$/.test(this.mobile)){
      this.mobileError = "has-error";
      return;
    }
    if(this.dob == ""){
      this.dobError = "has-error";
      return;
    }
    if(this.department == ""){
      this.departmentError = "has-error";
      return;
    }
    if(this.gender == ""){
      this.genderError = "has-error";
      return;
    }
    if(this.state == ""){
      this.stateError = "has-error";
      return;
    }
    if(this.cluster == ""){
      this.clusterError = "has-error";
      return;
    }
    if(this.branch == ""){
      this.branchError = "has-error";
      return;
    }
    if(this.designation == ""){
      this.designationError = "has-error";
      return;
    }

    if(this.email == ""){
      this.emailError = "has-error";
      return;
    }
    if(this.password == ""){
      this.passwordError = "has-error";
      return;
    }
    if(this.confirm_password == ""){
      this.confirm_passwordError = "has-error";
      return;
    }
    if(this.password != this.confirm_password){
      this.passwordError = "has-error";
      this.confirm_passwordError = "has-error";
      return;
    }
    this.apiS.createUserRequests(this.employeeCode,this.salutation,this.firstName,this.lastName,this.email,this.password,
      this.mobile,this.dob,this.gender,this.department,this.state,this.cluster,this.branch,this.designation).subscribe(res=>{
      if(res.status == "success"){
        this.clearForm();
        this.successPresentToast(res.message);
        this.apiS.createNotification("Employee Registration","Employee signup request received","Admin","").subscribe(data=>{
          
        });
        this.router.navigate(['/auth/login']);
      } else {
        this.errorPresentToast(res.message);
      }
    });
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
  clearForm(){
    this.employeeCode="";
    this.salutation="";
    this.firstName="";
    this.lastName="";
    this.mobile="";
    this.dob="";
    this.department="";
    this.gender="";
    this.email="";
    this.password="";
    this.confirm_password="";
  }

  clearError(){
    this.employeeCodeError="";
    this.salutationError="";
    this.firstNameError="";
    this.lastNameError="";
    this.mobileError="";
    this.dobError="";
    this.departmentError="";
    this.genderError="";
    this.emailError="";
    this.passwordError="";
    this.confirm_passwordError="";
  }


}
