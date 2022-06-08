import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { UserService } from 'src/app/_helper/user/user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email:any = '';
  password = '';
  loader = false;
  returnUrl = "";
  rememberMe = true;
  companyName = environment.companyName;
  constructor(private toastController: ToastController, public authS: AuthService, public userS: UserService,private route: ActivatedRoute,private router: Router,private title: Title) {
    this.title.setTitle("Login - "+environment.companyName);
    $("body").removeClass("skin-blue sidebar-mini");
    $("body").addClass("login-page");

    if(localStorage.getItem("credential") != "" && localStorage.getItem("credential") != undefined){
      this.email = localStorage.getItem("credential");
    }
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

  ngOnInit(): void {
  
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(){
    this.loader = true;
    if(this.email !== '' && this.password !== ''){
      this.authS.userSignIn(this.email, this.password).pipe(first()).subscribe(data => {
        this.loader = false;
        if(this.rememberMe){
          localStorage.removeItem("remember");
          localStorage.removeItem("credential");
          localStorage.setItem("remember","true");
          localStorage.setItem("credential",this.email);
        }        
        window.location.replace(this.returnUrl);
      },
      error => {
        if(error.status == "0"){
          this.errorPresentToast(error.statusText);
        } else {
          this.errorPresentToast(error);
        }
        console.log(error);
        this.loader = false;
      });
    }else{
      this.loader = false;
      this.errorPresentToast("Please! Enter email & password.");
    }
  }
}
