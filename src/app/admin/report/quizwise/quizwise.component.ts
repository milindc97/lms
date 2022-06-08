import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quizwise',
  templateUrl: './quizwise.component.html',
  styleUrls: ['./quizwise.component.scss'],
})
export class QuizwiseComponent implements OnInit {
  quizAllocation:any=[];
  quizData:any=[];
  printData:any=[];
  @ViewChild('table') table: any;
  dataTable:any;
  constructor(public apiS:AdminapiService,public excelS:ExcelService,public title:Title) { 
    this.title.setTitle("Quizwise Reports - "+environment.companyName);
  }

  ngOnInit(): void {
   this.getData();
  }

  getData(){
    this.apiS.getQuizAllocation().subscribe(data=>{
      this.quizAllocation = data.data;
      this.printData=[];
      for(let i=0;i<this.quizAllocation.length;i++){
        this.printData.push({
          "SR": i+1,
          "Employee Code": this.quizAllocation[i].userDetails[0]['employeeCode'],
          "Employee Name": this.quizAllocation[i].userDetails[0]['salutation'] + ' ' + this.quizAllocation[i].userDetails[0]['firstName'] + ' ' + this.quizAllocation[i].userDetails[0]['lastName'],
          "Quiz Name": this.quizAllocation[i].quizDetails[0]['title'],
          "Designation": this.quizAllocation[i].userDetails[0]['designation'],
          "Department": this.quizAllocation[i].userDetails[0]['department'],
          "Branch": this.quizAllocation[i].userDetails[0]['branch'],
          "Date": this.quizAllocation[i]['createdAt'],
        })
      }
      data.data.map((item:any) => item.quizDetails[0].title)
      .filter((value:any, index:any, self:any) => {
        if(self.indexOf(value) === index){
          this.quizData.push(data.data[index].quizDetails[0])
        }
      });
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      },300);
    })
  }


  filterByCourse(event:any){
    this.dataTable.DataTable().clear().destroy();
    if(event.target.value == "All"){
      this.getData();
    }else{
      this.quizAllocation=[];
      this.apiS.getQuizAllocationByQuiz(event.target.value).subscribe(data=>{
        this.quizAllocation=data.data;
        this.printData=[];
        for(let i=0;i<this.quizAllocation.length;i++){
          this.printData.push({
            "SR": i+1,
            "Employee Code": this.quizAllocation[i].userDetails[0]['employeeCode'],
            "Employee Name": this.quizAllocation[i].userDetails[0]['salutation'] + ' ' + this.quizAllocation[i].userDetails[0]['firstName'] + ' ' + this.quizAllocation[i].userDetails[0]['lastName'],
            "Quiz Name": this.quizAllocation[i].quizDetails[0]['title'],
            "Designation": this.quizAllocation[i].userDetails[0]['designation'],
            "Department": this.quizAllocation[i].userDetails[0]['department'],
            "Branch": this.quizAllocation[i].userDetails[0]['branch'],
            "Date": this.quizAllocation[i]['createdAt'],
          })
        }
        console.log(this.quizAllocation);
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
    this.excelS.exportAsExcelFile(this.printData, 'Quiz Wise Report '+ toToday);
  }

}
