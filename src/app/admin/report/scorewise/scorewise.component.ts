import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scorewise',
  templateUrl: './scorewise.component.html',
  styleUrls: ['./scorewise.component.scss'],
})
export class ScorewiseComponent implements OnInit {

  quizScore:any=[];
  printData:any=[];
  scoreData:any=[];
  @ViewChild('table') table: any;
  dataTable:any;
  constructor(public apiS:AdminapiService,public excelS:ExcelService,public title:Title) { 
    this.title.setTitle("Scorewise Reports - "+environment.companyName);
  }

  ngOnInit(): void {
   this.getData();
  }

  getData(){
    this.apiS.getAllQuizScore().subscribe(data=>{
      console.log(data.data);
      this.quizScore = data.data;
      this.printData=[];
      for(let i=0;i<this.quizScore.length;i++){
        this.printData.push({
          "SR": i+1,
          "Quiz Name": this.quizScore[i].quizData[0]['title'],
          "Score": this.quizScore[i]['score'],
          "Employee Code": this.quizScore[i].userData[0]['employeeCode'],
          "Employee Name": this.quizScore[i].userData[0]['salutation'] + ' ' + this.quizScore[i].userData[0]['firstName'] + ' ' + this.quizScore[i].userData[0]['lastName'],
          "Designation": this.quizScore[i].userData[0]['designation'],
          "Date": this.quizScore[i]['createdAt'],
        })
      }
      this.scoreData =data.data.map((item:any) => item.score)
      .filter((value:any, index:any, self:any) => self.indexOf(value) === index)
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      },300);
    })
  }


  filterByScore(event:any){
    this.dataTable.DataTable().clear().destroy();
    if(event.target.value == "All"){
      this.getData();
    }else{
      this.quizScore=[];
      this.apiS.getAllQuizScoreByScore(parseInt(event.target.value)).subscribe(data=>{
        this.quizScore=data.data;
        this.printData=[];
      for(let i=0;i<this.quizScore.length;i++){
        this.printData.push({
          "SR": i+1,
          "Quiz Name": this.quizScore[i].quizData[0]['title'],
          "Score": this.quizScore[i]['score'],
          "Employee Code": this.quizScore[i].userData[0]['employeeCode'],
          "Employee Name": this.quizScore[i].userData[0]['salutation'] + ' ' + this.quizScore[i].userData[0]['firstName'] + ' ' + this.quizScore[i].userData[0]['lastName'],
          "Designation": this.quizScore[i].userData[0]['designation'],
          "Date": this.quizScore[i]['createdAt'],
        })
      }
        console.log(this.quizScore);
        setTimeout(() =>{
          this.dataTable.DataTable();
        },300);
      })
      // this.employeesData = this.emp.filter((x:any) => x.status == event.target.value);
    }
    
  }


  exportAsXLSX():void {
    var dToday = new Date();
    var monthToday = dToday.getMonth() + 1;
    var dayToday = dToday.getDate();
    var yearToday = dToday.getFullYear();
    var hour = dToday.getHours();
    var min = dToday.getMinutes();
    var sec = dToday.getSeconds();

    var toToday = [yearToday, monthToday, dayToday, hour, min, sec].join('-');
    this.excelS.exportAsExcelFile(this.printData, 'Score Wise Report '+ toToday);
  }



}
