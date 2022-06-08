import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import * as $ from "jquery";
declare var document: any;
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

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
  pendingProgram:any=[];
  completedProgram:any=[];
  topEmployee:any=[];
  empId="";
  constructor(private title: Title,public api:AdminapiService,public authS:AuthService,public route:ActivatedRoute) {
    this.title.setTitle("View - "+environment.companyName);
    this.route.params.subscribe(data=>{
      this.empId=data.id;
    })
   }

  ngOnInit(): void {
   this.getData();
  }

  getData(){
    this.api.singleUser(this.empId).subscribe(data=>{
      console.log(data)
      this.topEmployee=data.data;
    })

    this.api.getOverallScore(this.empId).subscribe(data=>{
      console.log(data)
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
      this.barChartData=[ { data: [data.data], label: 'You',barThickness:20,backgroundColor:'#ffbc2c',hoverBackgroundColor:'#ffbc2c'},
      { data: [data.everyoneData], label: 'Everyone' ,barThickness:20,backgroundColor:'#ffe4af',hoverBackgroundColor:'#ffe4af'},]
    });

    this.api.getTodayAssignedProgram(this.empId).subscribe(data=>{
      this.allocatedProgram = data.data;
    });


    this.api.allQuizScoreByEmployee(this.empId).subscribe(data=>{
      this.allQuizScore=data.data;
    })

    this.api.getProgramCompletionStatusByEmp(this.empId).subscribe(data=>{
      for(let i=0;i<data.data.length;i++){
        if(data.data[i].score == 100){
          this.completedProgram.push(data.data[i]);
        }else{
          this.pendingProgram.push(data.data[i]);
        }
      }
    })

    this.api.getWeeklyData(this.empId).subscribe(data=>{
      console.log(data.data);
      this.weeks=data.data;
    })
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
  back(){
    window.history.back();
  }

}
