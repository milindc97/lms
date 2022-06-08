import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {

  data:any =[];
  notOnRoll=0;
  newEnroll=0;
  totalEmployee=0;
  currentLang = "";
  baseURL=environment.baseURL;
  isEmp:boolean=false;
  isAdmin:boolean=false;
  constructor(public authService: AuthService,public api:AdminapiService,public translate:TranslateService) { }

  ngOnInit(): void {
    if(this.authService.currentUserValue.roles == "ROLE_ADMIN"){
      this.isEmp=false;
      this.isAdmin=true;
    }else{
      this.isEmp=true;
      this.isAdmin=false;
    }
    this.getData();
    this.currentLang = "English - EN";
    // $('.sidebar-toggle').click(function (i) {
    //   console.log(i);
    //   $('.navbar').toggleClass('margin-left-no');
    // });
  }

  getData(){
    this.data = [];
    this.api.userNotification(this.authService.currentUserValue.id).subscribe(data=>{
      this.data = data.data;
      console.log(data);
    });
    this.api.getAllUserRequests().subscribe(data=>{
      this.notOnRoll =data.data.length;
    });

    this.api.getSuccessUserRequests().subscribe(data=>{
      this.newEnroll = data.data.length;
    });

    this.api.getAllUsers().subscribe(data=>{
      this.totalEmployee = data.data.length;
    });
  

  }

  clearNotification(){
    this.api.clearNotification(this.authService.currentUserValue.id).subscribe(data=>{
      this.getData();
    });
  }
  
  changeLanguage(value:any){
    // console.log(value);
    this.translate.use(value);  
    this.currentLang = value;
   }
   
   change(){
     $("#header").hide();
     $("#menu").hide();
     $("#footer").hide();
     $("#help").hide();
   }


}
