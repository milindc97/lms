import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { LocationStrategy } from '@angular/common';
import { Platform, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {
  quizTitle="";
  moduleTitle="";
  grade="";
  icon="";
  rating= 0;
  baseURL=environment.baseURL;
  quizScore:any=[];
  score=0;
  quizId="";
  submitA:boolean=false;
  items : Array<any> = [];
  certificate="";
  constructor(public api: EmpapiService, public toastController: ToastController,public route:ActivatedRoute,public router:Router,public authService:AuthService,
    private location1: LocationStrategy,public platform:Platform) {
     }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/dashboard']);
    });
      this.route.queryParams.subscribe(data=>{
        this.getData(data.id);
        this.quizId=data.id; 
      })
      $(window).on('popstate', (event) =>{
        window.location.replace('/dashboard')
       });
  }

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/dashboard']);
    });
  }

  getData(id:any){
    this.api.getSingleCertificateByQuizAndEmpId(id,this.authService.currentUserValue.id).subscribe(data=>{
      console.log(data.data);
      this.certificate = (data.data==undefined)?"":data.data.certificate;
    })
    console.log(this.certificate);
    this.api.singleQuizScore(id).subscribe(data=>{
      console.log(data.data);
      this.quizScore = data.data;
      this.score = data.data.score;
      this.rating = (data.data.rating == undefined)?0:data.data.rating;
      console.log(data.data.rating);
      if(data.data.rating == undefined || data.data.rating == 0){
        this.submitA=true;
      }else{
        this.submitA=false;
      }
      this.quizTitle=data.data.quizData[0].title;
      this.moduleTitle=(data.data.modulesData.length == 0)?'':data.data.modulesData[0].title;
      if(this.score > 90){
        this.api.getSinglePolicyByPer("Greater Than 90").subscribe(data=>{
          this.grade = data.data.name;
          this.icon = data.data.icon;
        })
      }else if(this.score <= 90 && this.score > 70){
        this.api.getSinglePolicyByPer("Less Than or Equal To 90 & Greater Than 70").subscribe(data=>{
          this.grade = data.data.name;
          this.icon = data.data.icon;
        })
      }else if(this.score <= 70 && this.score > 50){
        this.api.getSinglePolicyByPer("Less Than or Equal To 70 & Greater Than 50").subscribe(data=>{
          this.grade = data.data.name;
          this.icon = data.data.icon;
        })
      }else if(this.score <= 50 && this.score > 30){
        this.api.getSinglePolicyByPer("Less Than or Equal To 50 & Greater Than 30").subscribe(data=>{
          this.grade = data.data.name;
          this.icon = data.data.icon;
        })
      }else if(this.score < 30){
        this.api.getSinglePolicyByPer("Less Than 30").subscribe(data=>{
          this.grade = data.data.name;
          this.icon = data.data.icon;
        })
      }
    })
  }

  submitRating(){
    this.api.updateRating(this.rating,this.quizId).subscribe(data=>{
      if(data.status){
        this.successPresentToast(data.message);
        this.getData(this.quizId);
      }else{
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
}
