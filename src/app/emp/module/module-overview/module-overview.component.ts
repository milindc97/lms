import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss'],
})
export class ModuleOverviewComponent implements OnInit {
  baseURL = environment.baseURL;
  courseId:any;
  moduleData:any=[];
  FirstModuleData:any=[];
  youtubes:any=[];
  @ViewChild('table') table: any;
  dataTable:any;
  courseData:any = [];
  documents:any=[];
  mdocuments:any=[];
  doc="http://www.africau.edu/images/default/sample.pdf";
  programCode=0;
  programId ="";
  type="";
  load:boolean=false;
  timeInSeconds = 0;
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;
  time: any;
  runTimer: boolean=false;
  hasStarted: boolean=false;
  hasFinished: boolean=false;
  remainingTime: any;
  displayTime:any;
  moduleTime:any;
  startTestS=false;
  hours = 0;
  minutes = 0;
  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
  constructor(public api: EmpapiService, private toastController: ToastController,public authService: AuthService,public router:Router,public activatedRoute:ActivatedRoute
    ,public sanitizer:DomSanitizer, private title: Title,public alertController:AlertController,public platform:Platform) {
    this.title.setTitle("Module Overview - "+environment.companyName);
    this.activatedRoute.queryParams.subscribe(data=>{
      this.courseId = data.id;
      this.programCode = data.code;
      this.type=data.type;
    })
   }


  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/emp/module']);
    });
    this.getData();
  }

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/emp/module']);
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


  getData(){
    this.FirstModuleData=[];
    this.moduleData=[];
    if(this.type == "Course" && this.programCode > 0){
      this.api.singleProgramByCode(this.programCode).subscribe(singlePrg=>{
        console.log(singlePrg.data);
        this.programId=singlePrg.data._id;
        this.moduleData = singlePrg.data.modulesData;
        this.FirstModuleData = this.moduleData[0];
        this.moduleTime = this.moduleData[0].moduleWatchTime + ".60";
        this.api.getModulesWatchesByEmpAndModule(this.authService.currentUserValue.id,this.FirstModuleData._id).subscribe(data=>{
          if(data.data.length > 0){
            if(data.data[0].moduleWatch[0] == undefined){
              this.timeInSeconds=this.moduleData[0].moduleWatchTime * 60;
              this.hours = Math.trunc(this.moduleData[0].moduleWatchTime/60);
              this.minutes = this.moduleData[0].moduleWatchTime % 60;
                this.initTimer();
                this.startTimer();
                setInterval(() => {
                  
                  this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{

                  });
                }, 60000);
            } else if( data.data[0].moduleWatch[0] == 0){
              this.pauseTimer();
              this.timeInSeconds = 0;
              this.displayTime = "";
              this.remainingTime = 0;
              this.startTestS = true;
           
            }else{
              this.timeInSeconds=data.data[0].moduleWatch[0] * 60;
              this.hours = Math.trunc(data.data[0].moduleWatch[0]/60);
              this.minutes = data.data[0].moduleWatch[0] % 60;
              this.initTimer();
              this.startTimer();
              setInterval(() => {
                
                this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{
      
                });
              }, 60000);
            }
          }else{ 
            this.timeInSeconds=this.moduleData[0].moduleWatchTime * 60;
            this.hours = Math.trunc(this.moduleData[0].moduleWatchTime/60);
              this.minutes = this.moduleData[0].moduleWatchTime % 60;
            this.initTimer();
            this.startTimer();
            setInterval(() => {
              
              this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{
    
              });
            }, 60000);
          }
        })
        this.youtubes = this.moduleData[0].youtubes;
        this.documents = this.moduleData[0].documents;  
        this.mdocuments = this.moduleData[0].mdocuments;  
          setTimeout(() => {
            $("#item0").addClass("active-tab");
            $("#itemy0").addClass("active-tab");
            // $("#itemm0").addClass("active-tab");
          }, 100);
        
       
      });
      setTimeout(() => {
        $("#abc"+this.FirstModuleData._id).addClass("back");
      }, 300);
    }else if(this.type == "Course" && this.programCode == 0){
      this.api.singleCourse(this.courseId).subscribe(singleCourse=>{
        this.moduleData = singleCourse.data.modulesData;
        this.FirstModuleData = this.moduleData[0];
        this.moduleTime = this.moduleData[0].moduleWatchTime + ".60";
        this.api.getModulesWatchesByEmpAndModule(this.authService.currentUserValue.id,this.FirstModuleData._id).subscribe(data=>{
          if(data.data.length > 0){
            if(data.data[0].moduleWatch[0] == undefined){
              this.timeInSeconds=this.moduleData[0].moduleWatchTime * 60;
              this.hours = Math.trunc(this.moduleData[0].moduleWatchTime/60);
              this.minutes = this.moduleData[0].moduleWatchTime % 60;
                this.initTimer();
                this.startTimer();
                setInterval(() => {
                  
                  this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{

                  });
                }, 60000);
            } else if( data.data[0].moduleWatch[0] == 0){
              this.pauseTimer();
              this.timeInSeconds = 0;
              this.displayTime = "";
              this.remainingTime = 0;
              this.startTestS = true;
           
            }else{
              this.timeInSeconds=data.data[0].moduleWatch[0] * 60;
              this.hours = Math.trunc(data.data[0].moduleWatch[0]/60);
          this.minutes = data.data[0].moduleWatch[0] % 60;
              this.initTimer();
              this.startTimer();
              setInterval(() => {
                
                this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{
      
                });
              }, 60000);
            }
          }else{ 
            this.timeInSeconds=this.moduleData[0].moduleWatchTime * 60;
            this.hours = Math.trunc(this.moduleData[0].moduleWatchTime/60);
            this.minutes = this.moduleData[0].moduleWatchTime % 60;
            this.initTimer();
            this.startTimer();
            setInterval(() => {
              
              this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{
    
              });
            }, 60000);
          }
        })
        this.youtubes = this.moduleData[0].youtubes;
        this.documents = this.moduleData[0].documents;
        this.mdocuments = this.moduleData[0].mdocuments; 
        setTimeout(() => {
          $("#item0").addClass("active-tab");
          $("#itemy0").addClass("active-tab");
          // $("#itemm0").addClass("active-tab");
        }, 100);
      });
      setTimeout(() => {
        $("#abc"+this.FirstModuleData._id).addClass("back");
      }, 300);
    }else if(this.type == "Module" && this.programCode == 0){
      this.api.singleModule(this.courseId).subscribe(singleCourse=>{
        this.moduleData.push(singleCourse.data);
        console.log(this.moduleData);
        this.FirstModuleData = this.moduleData[0];
        this.moduleTime = this.moduleData[0].moduleWatchTime + ".60";
        this.api.getModulesWatchesByEmpAndModule(this.authService.currentUserValue.id,this.FirstModuleData._id).subscribe(data=>{
          if(data.data.length > 0){
            if(data.data[0].moduleWatch[0] == undefined){
              this.timeInSeconds=this.moduleData[0].moduleWatchTime * 60;
              this.hours = Math.trunc(this.moduleData[0].moduleWatchTime/60);
              this.minutes = this.moduleData[0].moduleWatchTime % 60;
                this.initTimer();
                this.startTimer();
                setInterval(() => {
                  
                  this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{

                  });
                }, 60000);
            } else if( data.data[0].moduleWatch[0] == 0){
              this.pauseTimer();
              this.timeInSeconds = 0;
              this.displayTime = "";
              this.remainingTime = 0;
              this.startTestS = true;
           
            }else{
              this.timeInSeconds=data.data[0].moduleWatch[0] * 60;
              this.hours = Math.trunc(data.data[0].moduleWatch[0]/60);
          this.minutes = data.data[0].moduleWatch[0] % 60;
              this.initTimer();
              this.startTimer();
              setInterval(() => {
                
                this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{
      
                });
              }, 60000);
            }
          }else{ 
            this.timeInSeconds=this.moduleData[0].moduleWatchTime * 60;
            this.hours = Math.trunc(this.moduleData[0].moduleWatchTime/60);
            this.minutes = this.moduleData[0].moduleWatchTime % 60;
            this.initTimer();
            this.startTimer();
            setInterval(() => {
              
              this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{
    
              });
            }, 60000);
          }
        })
        this.youtubes = this.moduleData[0].youtubes;
        this.documents = this.moduleData[0].documents;
        this.mdocuments = this.moduleData[0].mdocuments; 
        setTimeout(() => {
          $("#item0").addClass("active-tab");
          $("#itemy0").addClass("active-tab");
          // $("#itemm0").addClass("active-tab");
        }, 100);
      });
      setTimeout(() => {
        $("#abc"+this.FirstModuleData._id).addClass("back");
      }, 300);
    }
      
  }


  editCourse(id:String){
    this.router.navigate(['/emp/courses/activity/edit'],{
      queryParams:{id:id}
    });
  }

  videoURL(url:any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  back(){
    window.history.back();
  }

  clickDocument(arr:any,index:any){
    this.startTestS=false;
    $("#abc"+this.FirstModuleData._id).removeClass("back");
    this.FirstModuleData=[];
    this.FirstModuleData = arr;
    this.moduleTime = arr.moduleWatchTime + ".60";
    this.api.getModulesWatchesByEmpAndModule(this.authService.currentUserValue.id,this.FirstModuleData._id).subscribe(data=>{
      console.log(data.data[0].moduleWatch[0]);
      if(data.data.length > 0){
        if(data.data[0].moduleWatch[0] == undefined){
          this.timeInSeconds=arr.moduleWatchTime * 60;
          this.hours = Math.trunc(arr.moduleWatchTime/60);
              this.minutes = arr.moduleWatchTime % 60;
            this.initTimer();
            this.startTimer();
            setInterval(() => {
              
              this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{

              });
            }, 60000);
        } else if( data.data[0].moduleWatch[0] == 0){
          this.pauseTimer();
          this.timeInSeconds = 0;
          this.displayTime = "";
          this.remainingTime = 0;
          this.startTestS = true;
       
        }else{
          this.timeInSeconds=data.data[0].moduleWatch[0] * 60;
          this.hours = Math.trunc(data.data[0].moduleWatch[0]/60);
          this.minutes = data.data[0].moduleWatch[0] % 60;

          this.initTimer();
          this.startTimer();
          setInterval(() => {
            
            this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{
  
            });
          }, 60000);
        }
      }else{ 
        this.timeInSeconds=arr.moduleWatchTime * 60;
        this.hours = Math.trunc(arr.moduleWatchTime/60);
        this.minutes = arr.moduleWatchTime % 60;
        this.initTimer();
        this.startTimer();
        setInterval(() => {
          
          this.api.createModulesWatch(this.FirstModuleData._id,this.authService.currentUserValue.id,(this.remainingTime/60).toFixed(0)).subscribe(()=>{

          });
        }, 60000);
      }
    })
    this.documents =arr.documents;
    this.youtubes = arr.youtubes;
    this.mdocuments = arr.mdocuments;
    setTimeout(() => {
      $("#item0").addClass("active-tab");
      $("#itemy0").addClass("active-tab");
      // $("#itemm0").addClass("active-tab");
    }, 200);
    console.log($("#abc"+arr._id).addClass("back"));
  }

  initTimer() {
    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;
    
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return minutesString + ':' + secondsString;
  }

  startTimer() {
    this.runTimer = true;
   this.hasStarted = true;
   this.timerTick();
 }
 
 pauseTimer() {
   this.runTimer = false;
 }
 
 resumeTimer() {
   this.startTimer();
 }
 
 timerTick() {
   setTimeout(() => {
    
     if (!this.runTimer) { return; }
     this.remainingTime--;
     this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
     if (this.remainingTime > 0) {
       this.timerTick();
     }
     else {
       this.hasFinished = true;
       this.startTestS = true;
     }
   }, 1000);
 }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: '<img src="assets/img/agree.png"></img><br>I agree, I have completed module.',
      mode:'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          id: 'cancel-button'
        }, {
          text: 'I Agree',
          id: 'confirm-button',
          handler: () => {
            this.startQuiz();
          }
        }
      ]
    });

    await alert.present();
  }

  startQuiz(){
    this.router.navigate(["/emp/quiz/overview",this.FirstModuleData._id,this.programCode,'Module'])
  }

  changeDocument(i:any,doc:any){
    for(let j=0;j<this.FirstModuleData.documents.length;j++){
      $("#item"+j).removeClass("active-tab");
    }
    
    $("#item"+i).addClass("active-tab");
    this.documents=[];
    this.documents.push(doc);
  }

  changeYoutube(i:any,doc:any){
    for(let j=0;j<this.FirstModuleData.youtubes.length;j++){
      $("#itemy"+j).removeClass("active-tab");
    }
    
    $("#itemy"+i).addClass("active-tab");
    this.youtubes=[];
    this.youtubes.push(doc);
  }


  siteLoaded(){
    this.load=false;
  }
  
  changeDocument1(i:any,doc:any){
    for(let j=0;j<this.FirstModuleData.mdocuments.length;j++){
      $("#itemm"+j).removeClass("active-tab");
    }
    
    $("#itemm"+i).addClass("active-tab");
    this.mdocuments=[];
    this.mdocuments.push(doc);
  }

  changeCourseStatus(id:String,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateStatusCourse(id,status).subscribe(data=>{
      this.successPresentToast("Course Status Updated");
    });
  }

}
