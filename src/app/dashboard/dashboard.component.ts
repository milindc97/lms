import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import * as $ from "jquery";
declare var document: any;
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AuthService } from '../_helper/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AdminapiService } from '../_helper/api/adminapi.service';
import { EmpapiService } from '../_helper/api/empapi.service';
import { Platform, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  createS = false;
  topEmployee:any=[];
  prgAct:any=[];
  modulesWatch:any=[];
  modulesCount:any=[];
  program:any=[];
  cauroselEmp:any=[];
  quizCount:any=[];
  quizScore:any=[];
  searchControl: FormControl = new FormControl();
  programActivity:any=[];
  public canvasWidth = 250;
  public needleValue = 0;
  public centralLabel = '';
  public name = 'Overall Score';
  public bottomLabel = '';
  public options = {};
  public searchProgram:any=[];
  public searchCourse:any=[];
  public searchModule:any=[];
  val="";
  public searchQuiz:any=[];
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
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  public date= new Date();
  weeks:any=[];
  public barChartData: ChartDataSets[] = [];
  allocatedProgram:any=[];
  allQuizScore:any=[];

  baseURL = environment.baseURL;
  completedProgram:any=[];
  pendingProgram:any=[];
  topMessage="";
  isEmp:boolean=false;
  isAdmin:boolean=false;
  constructor(private title: Title,public adminapiS:AdminapiService,public empapiS:EmpapiService,public router:Router,public authS:AuthService,private platform: Platform,public toastController:ToastController) { 
    this.title.setTitle("Dashboard - "+environment.companyName);
  }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(5, () => {
      App.exitApp();
  });
    if(this.authS.currentUserValue.roles == "ROLE_ADMIN"){
      this.isEmp=false;
      this.isAdmin=true;
      this.getAdminData();
    }else{
      this.isEmp=true;
      this.isAdmin=false;
      this.getEmpData();
    }
    this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.filerData(value);
    });
 
  
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(5, () => {
        App.exitApp();
    });
   }
  getEmpData(){
    this.empapiS.getTopEmployee().subscribe(data=>{
      this.topEmployee=data.data;
    })

    this.empapiS.getTodayAssignedProgram(this.authS.currentUserValue.id).subscribe(data=>{
      this.allocatedProgram = data.data;
    });

    this.empapiS.getTopMessage().subscribe(data=>{
      this.topMessage=data.data.message;
    })

    this.empapiS.allQuizScoreByEmployee(this.authS.currentUserValue.id).subscribe(data=>{
      this.allQuizScore=data.data;
    })

    this.empapiS.getProgramCompletionStatusByEmp(this.authS.currentUserValue.id).subscribe(data=>{
      for(let i=0;i<data.data.length;i++){
        if(data.data[i].score == 100){
          this.completedProgram.push(data.data[i]);
        }else{
          this.pendingProgram.push(data.data[i]);
        }
      }
      console.log(this.pendingProgram);
      console.log(this.completedProgram);
    })

    this.empapiS.getWeeklyData(this.authS.currentUserValue.id).subscribe(data=>{
      console.log(data.data);
      this.weeks=data.data;
    })
    this.empapiS.getOverallScore(this.authS.currentUserValue.id).subscribe(data=>{

      console.log(data.data);
      console.log(data.everyoneData);
      if(data.data>0 && data.everyoneData>0 && data.data<100 && data.everyoneData <100){
        let youData = data.data;
        this.options={ hasNeedle: true,
          needleColor: '#9e9e9e',
          needleUpdateSpeed: 1000,
          arcColors: ['#ffbc2c', '#eeeeee'],
          arcDelimiters: [youData],
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

  getAdminData(){
    this.adminapiS.getMonthAndYearWiseCount().subscribe(data=>{
      console.log(data);
      data.data.filter((i:any) =>{
        this.quizCount[(i._id.month-1)] = i.count;
        this.quizScore[(i._id.month-1)] = i.score;
      });
      for(let i =0;i<this.quizCount.length;i++){
        if(this.quizCount[i] == undefined){
          this.quizCount[i] = 0;
          this.quizScore[i] = 0;
        }
      }
      var strDate = new Date(); // By default Date empty constructor give you Date.now.
      var shortYear = strDate. getFullYear();
      var twoDigitYear = shortYear.toString().substr(-2);
      console.log(this.quizCount);
      var mixedChart = new Chart('myChartCombo', {
        type: 'bar',
        data: {
          datasets: [{
            label: 'Total Quiz Count',
            data: this.quizCount,
            order: 2,
            fill: true,
            barThickness:30,
            backgroundColor: ['#ffbc2c', '#ffbc2c', '#ffbc2c', '#ffbc2c', '#ffbc2c', '#ffbc2c', '#ffbc2c', '#ffbc2c','#ffbc2c','#ffbc2c','#ffbc2c','#ffbc2c']
          }
          , {
            label: 'Total Quiz Score',
            data: this.quizScore,
            order: 2,
            barThickness:30,
            backgroundColor: ['#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af', '#ffe4af']
          }
        ],
          labels: ['Jan '+twoDigitYear,'Feb '+twoDigitYear,'Mar '+twoDigitYear,'Apr '+twoDigitYear,
          'May '+twoDigitYear,'June '+twoDigitYear,'July '+twoDigitYear,'Aug '+twoDigitYear
          ,'Sept '+twoDigitYear,'Oct '+twoDigitYear,'Nov '+twoDigitYear,'Dec '+twoDigitYear]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
  
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
              display: true,
              ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true   // minimum value will be 0.
              }
            }]
          }
        }
      });
    })
    this.adminapiS.getTop20Employee().subscribe(data=>{
      this.topEmployee=data.data;
    });
    this.adminapiS.getProgramActivity().subscribe(data=>{
      console.log(data.data)
      this.programActivity=data.data;
      this.prgAct = this.programActivity;
     
    });
    this.adminapiS.getCountByStatus().subscribe(data=>{
      $(document).ready(function () {
        var xValues = ["Pending", "Approved", "Rejected"];
        var yValues = [data.pending.length, data.success.length, data.reject.length];
        var barColors = [
          "#fe9365",
          "#01a9ac",
          "#ff5c6f"
        ];
  
        new Chart("myChart", {
          type: "doughnut",
          data: {
            labels: xValues,
            datasets: [{
              backgroundColor: barColors,
              data: yValues
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            // title: {
            //   display: true,
            //   text: "World Wide Wine Production 2018"
            // }
          }
        });
      });
    })

   
  }

  notify(id:any){
    this.adminapiS.sendNotificationToAssEmp(id).subscribe(data=>{
      console.log(data);
    })
  }

  initializeItems(): void {
    this.programActivity = this.prgAct;
  }

  filerData(value:any) {
    this.initializeItems();
    if (!value) {
      return;
    }
    this.programActivity = this.programActivity.filter((currentGoal:any) => {
      if (currentGoal.programDetails.title && value) {
        if (currentGoal.programDetails.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return false;
    });
  }


  doRefreshEmp(event:any) {
    this.getEmpData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  doRefreshAdmin(event:any) {
    this.getAdminData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  
   weekCount(year:any, month_number:any, startDayOfWeek:any) {
    var firstDayOfWeek = startDayOfWeek || 0;
  
    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);
    var numberOfDaysInMonth = lastOfMonth.getDate();
    var firstWeekDay = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
  
    var used = firstWeekDay + numberOfDaysInMonth;
  
    return Math.ceil( used / 7);
  }

  getItems(ev: any) {
    this.val = ev.target.value;
    
    if (!this.val) {
      this.searchProgram=[];
      this.searchCourse=[];
      this.searchModule=[];
      this.searchQuiz=[];
      return;
    }
    this.empapiS.searchProgram(this.authS.currentUserValue.id,this.val).subscribe(data=>{
      this.searchProgram = data.data;
      console.log(data.data);
    })
    this.empapiS.searchModule(this.authS.currentUserValue.id,this.val).subscribe(data=>{
      this.searchModule = data.data;
    })
    this.empapiS.searchCourse(this.authS.currentUserValue.id,this.val).subscribe(data=>{
      this.searchCourse = data.data;
    })
    this.empapiS.searchQuiz(this.authS.currentUserValue.id,this.val).subscribe(data=>{
      this.searchQuiz = data.data;
    })
  }

  getModule(id:any,type:any){
    this.router.navigate(['/emp/module/overview'],{
      queryParams:{id:id,code:0,type:type}
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
