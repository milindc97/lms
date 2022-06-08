import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, ToastController } from '@ionic/angular';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @ViewChild('slides') public slides!: IonSlides;
  displayTime:any;
  isWeb = true;
  @ViewChild('table') table: any;
  dataTable:any;
  qbData:any = [];
  timeInSeconds = 0;
  questionsCount = 0;
  time: any;
  runTimer: boolean=false;
  hasStarted: boolean=false;
  hasFinished: boolean=false;
  remainingTime: any;
  moduleId="";
  programId="";
  quizTime:any;
  quizId="";
  public scnt = 1;
  public anscal = 0;
  public wrongAns = 0;
  public skipAns = 0;
  public usersQuestions: any = [];
  allQuestionsL=0;
  quizTitle="";
  type="";
  empDept="";
  lastName="";
  baseURL=environment.baseURL;
  firstName="";
  salutation="";
  certificate="";
  constructor(private api: EmpapiService, private toastController: ToastController,public route:ActivatedRoute,public router:Router,public authS:AuthService,public title:Title) {
    this.title.setTitle("Quiz - "+environment.companyName);
    this.api.singleUser(this.authS.currentUserValue.id).subscribe(data=>{
      this.empDept = data.data.department;
      this.firstName = data.data.firstName;
      this.lastName = data.data.lastName;
      console.log(this.lastName);
      this.salutation = data.data.salutation;
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

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.moduleId=data.id;
      this.type=data.type;
      if(data.code != 0){
      this.api.singleProgramByCode(data.code).subscribe(prg=>{
        this.programId=prg.data._id;
      })
    }
      this.getData(data.id);
      
    })
   
    
  }

  getData(id:any){
    this.qbData = [];
    if(this.type== 'Module'){
    this.api.singleModule(id).subscribe(mod=>{
      console.log(mod);
      this.quizTitle = mod.data.quizData[0].title;
      this.quizId=mod.data.quiz[0].quizId;
      this.quizTime = mod.data.quizData[0].quizTime + ".60";
      this.timeInSeconds=mod.data.quizData[0].quizTime * 60;
      this.questionsCount = mod.data.quizData[0].questionsCount;
      this.initTimer();
      this.api.getAllQuestion(mod.data.quiz[0].quizId).subscribe(question=>{
        this.qbData = this.usersQuestions= this.chooseRandom(question.data,this.questionsCount);
        this.skipAns = this.questionsCount;
      })
      this.startTimer();
    })
  }else{
    this.api.getSingleQuestionBank(id).subscribe(qu=>{
      console.log(qu);
      this.quizTitle = qu.data.title;
      this.quizId=qu.data._id;
      this.quizTime = qu.data.quizTime + ".60";
      this.timeInSeconds=qu.data.quizTime * 60;
      this.questionsCount = qu.data.questionsCount;
      this.initTimer();
      this.api.getAllQuestion(qu.data._id).subscribe(question=>{
        this.qbData = this.usersQuestions= this.chooseRandom(question.data,this.questionsCount);
        this.skipAns = this.questionsCount;
      })
      this.startTimer();
    })
  }
  }
  chooseRandom(arr:any, num:any){
    const res = [];
    for(let i = 0; i < num; ){
       const random = Math.floor(Math.random() * arr.length);
       if(res.indexOf(arr[random]) !== -1){
          continue;
       };
       res.push(arr[random]);
       i++;
    };
    return res;
  };

  checkAns(option:any,ans:any,index:any){
    this.usersQuestions[index]['marked']=true;
    if(option === ans){
      this.usersQuestions[index]['Act_Answer']=option;
      this.usersQuestions[index]['status']=true;
    }else{
      this.usersQuestions[index]['Act_Answer']=option;
      this.usersQuestions[index]['status']=false;
    }
    console.log(this.usersQuestions);
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
        this.submitAns();
     }
   }, 1000);
 }


 submitAns(){
   this.wrongAns=0;
   this.anscal=0;
  this.pauseTimer();
  let examTime = this.getSecondsAsDigitalClock((this.timeInSeconds*1)-((this.displayTime.split(':')[0] *60)+(this.displayTime.split(':')[1]*1)));
  for (let index = 0; index < this.questionsCount; index++) {
    if(this.usersQuestions[index]['status'] == true){
      this.anscal = this.anscal + 1;
    }else if(this.usersQuestions[index]['status'] == false){
      this.wrongAns = this.wrongAns + 1;
    }
  }
  let per = Math.floor((100/this.questionsCount) * this.anscal);
  let perc = per*100; 
  let wPer = Math.floor((100/this.questionsCount) * (this.wrongAns));
  let sPer = Math.floor((100/this.questionsCount) * (this.skipAns - (this.wrongAns + this.anscal)));
  
  console.log(this.wrongAns);
  console.log((this.skipAns - (this.wrongAns + this.anscal)));
  console.log(this.anscal);
  

    this.api.createQuizScore(this.programId,this.quizId,this.moduleId,this.authS.currentUserValue.id,per,this.wrongAns,this.questionsCount,this.anscal,(this.skipAns - (this.wrongAns + this.anscal)),this.usersQuestions,examTime).subscribe(quizS=>{
      if(quizS.status){
        if(per >= 70){
          this.api.createCertificate(this.salutation,this.firstName,this.lastName,this.empDept).subscribe(data=>{
            console.log(this.quizId);
            console.log(quizS.data._id);
            this.api.createCertificateData(this.quizId,quizS.data._id,this.authS.currentUserValue.id,data.imageName,this.baseURL+"/retrieve/certificate/"+data.imageName+"/"+this.authS.currentUserValue.accessToken).subscribe(cerData=>{
              this.router.navigate(['/emp/quiz/result'],{
                queryParams:{id:quizS.data._id}
              })
            })
          });
        }else{
          this.router.navigate(['/emp/quiz/result'],{
            queryParams:{id:quizS.data._id}
          })
        }
       
    } else {
      this.errorPresentToast(quizS.message);
    }
    })
}




  next() {
    this.scnt = this.scnt + 1;
    console.log(this.slides);
    this.slides.slideNext();
  }

  prev() {
    this.scnt = this.scnt - 1;
    this.slides.slidePrev();

  }


}
