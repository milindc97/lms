import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  employeeCode:any="";
  mobile:any="";
  dob:any="";
  confirm_password:any="";
  new_password:any="";
  employeeCodeError:any="";
  mobileError:any="";
  dobError:any="";
  confirm_passwordError:any="";
  new_passwordError:any="";
  companyName = environment.companyName;
  constructor(public authService:AuthService,public toastController:ToastController) { }

  ngOnInit(): void {
  
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

  create(){
    this.clearError();
    // if(this.employeeCode == ""){
    //   this.employeeCodeError = "has-error";
    //   return;
    // }
    if(this.dob == ""){
      this.dobError = "has-error";
      return;
    }
    if(this.mobile == ""){
      this.mobileError = "has-error";
      return;
    }
    if(this.new_password == ""){
      this.new_passwordError = "has-error";
      return;
    }
    if(this.confirm_password == ""){
      this.confirm_passwordError = "has-error";
      return;
    }

    if(this.confirm_password != this.new_password){
      this.new_passwordError = "has-error";
      this.confirm_passwordError = "has-error";
      return;
    }

    this.authService.userForgotPassword(this.dob,this.mobile,this.new_password).subscribe(data=>{
      console.log(data);
      if(data.status){
        this.successPresentToast(data.message);
      }else{
        this.errorPresentToast(data.message);
      }
    });
  }
  
  back(){
    window.history.back();
  }

  clearError(){
    // this.employeeCodeError="";
    this.mobileError="";
    this.dobError="";
    this.confirm_passwordError="";
    this.new_passwordError="";
  }


}
