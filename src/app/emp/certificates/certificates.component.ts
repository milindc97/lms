import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  loading:boolean=true;
  certificateData:any=[];
  baseURL=environment.baseURL;
  constructor(public api:EmpapiService,public authService:AuthService,public platform:Platform,public router:Router,public title:Title) { 
    this.title.setTitle("Certificates - "+environment.companyName);
  }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/dashboard']);
    });
    this.getData();
  }

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/dashboard']);
    });
  }

  getData(){
    this.certificateData = [];
    this.api.getAllCertificates(this.authService.currentUserValue.id).subscribe(data=>{
      this.certificateData= data.data;
      this.loading=false;
    })
    
    
  }

}
