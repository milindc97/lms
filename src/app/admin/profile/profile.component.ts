import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { UserService } from 'src/app/_helper/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData:any=[];
  salutation:any;
  firstName:any;
  lastName:any;
  mobile:any;
  email:any;
  dob:any;
  gender:any;

  currentPassword = "";
  newPassword = "";
  confirmPassword = "";

  currentPasswordError = "";
  newPasswordError = "";
  confirmPasswordError = "";
  accessToken="";
  localData:any=[];
  constructor(public authService:AuthService,public apiS:AdminapiService,public datepipe:DatePipe,public toastController:ToastController,public userService: UserService,public title:Title) {
    this.title.setTitle("Profile - "+environment.companyName);
   }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.salutation=this.authService.currentUserValue.salutation;
    this.firstName=this.authService.currentUserValue.firstName;
    this.lastName=this.authService.currentUserValue.lastName;
    this.mobile=this.authService.currentUserValue.mobile;
    this.email=this.authService.currentUserValue.email;
    this.dob =this.datepipe.transform(this.authService.currentUserValue.dob, 'yyyy-MM-dd');
    this.gender =this.authService.currentUserValue.gender;
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


  updateUser(){
    if(!/^\d{10}$/.test(this.mobile)){
      this.errorPresentToast("Please Enter 10 Digit Mobile Number");
      return;
    }
    this.apiS.updateUser(this.firstName,this.lastName,this.salutation,this.email,this.mobile,this.dob,this.gender,"",this.authService.currentUserValue.id).subscribe(result=>{
      if(result.status){
        this.successPresentToast(result.message);
        this.localData = {
          "id": result.data._id, 
    "email": this.email,
    "salutation": this.salutation,
    "firstName": this.firstName,
    "lastName": this.lastName,
    "mobile": this.mobile,
    "dob": this.dob,
    "gender": this.gender,
    "accessToken": this.authService.currentUserValue.accessToken,
    "refreshToken": this.authService.currentUserValue.refreshToken,
    "lastLoginOn": this.authService.currentUserValue.lastLoginOn
        }
        localStorage.setItem('currentUser', JSON.stringify(this.localData));
        this.authService.updateData(this.localData);
        this.getData();
      } else {
        this.errorPresentToast(result.message);
      }
    })
  }

  changePassword(){
    this.clearPasswordError();
    if(this.currentPassword == ""){
      this.currentPasswordError = "has-error";
      return;
    }

    if(this.newPassword == ""){
      this.newPasswordError = "has-error";
      return;
    }

    if(this.confirmPassword == ""){
      this.confirmPasswordError = "has-error";
      return;
    }

    if(this.confirmPassword != this.newPassword){
      this.newPasswordError = "has-error";
      this.confirmPasswordError = "has-error";
      return;
    }

    this.userService.changePassword(this.authService.currentUserValue.id,this.currentPassword,this.newPassword).subscribe(res=>{
      console.log(res);
      if(res.status == "success"){
        this.successPresentToast(res.message);
      } else {
        this.errorPresentToast(res.message);
      }
    });


  }

  clearPasswordError(){
    this.currentPasswordError = "";
    this.newPasswordError = "";
    this.confirmPasswordError = "";
  }

}
