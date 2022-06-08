import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { AlertController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.scss']
})
export class QuizOverviewComponent implements OnInit {

  moduleId="";
  programId="";
  prgLength=0;
  quizLength = 0;
  currentQuizTitle ="";
  courseLength = 0;
  moduleLength = 0;
  programData:any=[];
  quizTitle="";
  programTitle="";
  score=0;
  totalQuestion=0;
  correctAnswer=0;
  wrongAnswer=0;
  skipAnswer=0;
  programCode="";
  examTime="00:00";
  public canvasWidth = 250;
  public needleValue = 0;
  public centralLabel = '';
  public name = 'Overall Score';
  public bottomLabel = '';
  public options = {};
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes:[{
        display:false
      }],
      yAxes: [{
        display:false,
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['You'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  type="";
  startQ:boolean=false;
  public barChartData: ChartDataSets[] = [];
  constructor(public route:ActivatedRoute,public router:Router,public api:EmpapiService,public authS:AuthService,public toastController:ToastController,public alertController:AlertController,
    public platform:Platform) {
   
   }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/emp/quiz']);
    });
    this.route.params.subscribe(data=>{
      this.moduleId=data.id;
      this.programCode =data.code;
      this.type = data.type;
      // this.api.singleProgramByCode(data.code).subscribe(prg=>{
      //   this.programId=prg.data._id;
      // })
      this.getData();
      
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

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/emp/quiz']);
    });
  }

  getData(){
    if(this.type == "Module"){
      this.api.singleModule(this.moduleId).subscribe(data=>{
        this.currentQuizTitle = data.data.quizData[0].title;
        this.api.singleQuizScoreByQuizEmp(data.data.quizData[0]._id,this.authS.currentUserValue.id).subscribe(data=>{
          console.log(data.data)
          if(data.data == undefined){
            this.startQ =true;
          } else{
            this.startQ=false;
          }
          
        })
      })
    }else{
      this.api.getSingleQuestionBank(this.moduleId).subscribe(data=>{
        this.currentQuizTitle =data.data.title;
      })
      this.api.singleQuizScoreByQuizEmp(this.moduleId,this.authS.currentUserValue.id).subscribe(data=>{
        console.log(data.data)
        if(data.data == undefined){
          this.startQ =true;
        } else{
          this.startQ=false;
        }
        
      })
    }
   
    this.api.getProgramCompletionStatusByEmp(this.authS.currentUserValue.id).subscribe(data=>{
      this.prgLength = data.data.length;
    });
    this.api.getCourseCompletionStatusByEmp(this.authS.currentUserValue.id).subscribe(data=>{
      this.courseLength = data.data.length;
    });
    this.api.getModuleCompletionStatusByEmp(this.authS.currentUserValue.id).subscribe(data=>{
      this.moduleLength = data.data.length;
    });
    this.api.quizCountForQuiz(this.authS.currentUserValue.id).subscribe(data=>{
      this.quizLength = data.quizLength;
    });
    this.api.singleQuizScoreByEmployee(this.authS.currentUserValue.id).subscribe(data=>{
      this.programData = data.data;
      this.quizTitle=(this.programData == undefined)?'-':this.programData.quizData[0].title;
      this.score = (this.programData == undefined)?this.score:this.programData.score;
      this.totalQuestion = (this.programData == undefined)?this.totalQuestion:this.programData.totalQuestion;
      this.examTime = (this.programData == undefined)?this.examTime:this.programData.examTime;
      this.correctAnswer = (this.programData == undefined)?this.correctAnswer:this.programData.correctAnswer;
      this.wrongAnswer = (this.programData == undefined)?this.wrongAnswer:this.programData.wrongAnswer;
      this.skipAnswer = (this.programData == undefined)?this.skipAnswer:this.programData.skipAnswer;
    })
    this.api.getOverallScore(this.authS.currentUserValue.id).subscribe(data=>{
      console.log(data)
      if(data.data>0 && data.everyoneData>0 && data.data<100 && data.everyoneData <100){
      this.options={ hasNeedle: true,
        needleColor: '#9e9e9e',
        needleUpdateSpeed: 1000,
        arcColors: ['#ffbc2c', '#eeeeee'],
        arcDelimiters: [data.data],
        rangeLabel: ['', ''],
        needleStartValue: 0
      }
      this.needleValue=data.data;
      this.bottomLabel =data.data+"%";
    }
    this.barChartData=[ { data: [data.data], label: 'You',barThickness:20,backgroundColor:'#ffbc2c',hoverBackgroundColor:'#ffbc2c'},
      { data: [data.everyoneData], label: 'Everyone' ,barThickness:20,backgroundColor:'#ffe4af',hoverBackgroundColor:'#ffe4af'},]
    });
   
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
    if(this.type == "Module"){
      this.api.singleModule(this.moduleId).subscribe(data=>{
        this.api.getSingleQuestionBank(data.data.quizData[0]._id).subscribe(qB=>{
          this.api.getAllQuestion(data.data.quizData[0]._id).subscribe(question=>{
            if(qB.data.questionsCount <= question.data.length && qB.data.quizTime !== 0){
              this.router.navigate(['/emp/quiz',this.moduleId,this.programCode,this.type]);  
            }else{
              this.errorPresentToast("Something went wrong")
            }
          })
        });
      })
    }else{
      this.api.getSingleQuestionBank(this.moduleId).subscribe(qB=>{
        this.api.getAllQuestion(this.moduleId).subscribe(question=>{
          if(qB.data.questionsCount <= question.data.length && qB.data.quizTime !== 0){
            this.router.navigate(['/emp/quiz',this.moduleId,this.programCode,this.type]);  
          }else{
            this.errorPresentToast("Something went wrong")
          }
        })
      });
    }
    
  }


}
