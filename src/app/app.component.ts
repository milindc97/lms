import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './_helper/auth/auth.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  title = environment.companyName;
  isLogin = true;
  isActiveWall=false;
  isEmp:boolean=false;
  isAdmin:boolean=false;
  constructor(private authenticationService: AuthService,public translate:TranslateService,public platform: Platform) {
    translate.addLangs(['English - EN', 'हिंदी - HI','தமிழ் - TA','తెలుగు - TE','ଘୃଣା କରେ - OD','বাঙ্গালি - BN','ਪੰਜਾਬੀ - PB','ગુજરાતી - GJ','मराठी - MR','অসমীয়া - AS']);  
    translate.setDefaultLang('English - EN'); 
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.isLogin = true;
      if(this.authenticationService.currentUserValue.roles == "ROLE_ADMIN"){
        this.isEmp=false;
        this.isAdmin=true;
      }else{
        this.isEmp=true;
        this.isAdmin=false;
      }
    } else {
      this.isLogin = false;
    }
    
    if(location.pathname == "/emp/active-wall" || location.pathname == "/admin/active-wall"){
      this.isActiveWall = true;
    }else{
      this.isActiveWall=false;
    }
    $('.content-wrapper').click(()=>{
      $('.sidebar-mini').removeClass('sidebar-open');
    })
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(()=>{
      // StatusBar.setBackgroundColor({color:"#fff7f2"});
      // StatusBar.setStyle({ style: Style.Light });
      // StatusBar.setOverlaysWebView({ overlay: false });
    });
  }

  ngOnInit(): void {
    
  }

  
}
