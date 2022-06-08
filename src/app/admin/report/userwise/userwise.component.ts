import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userwise',
  templateUrl: './userwise.component.html',
  styleUrls: ['./userwise.component.scss'],
})
export class UserwiseComponent implements OnInit {

  quizScore:any=[];
  userData:any=[];
  @ViewChild('table') table: any;
  dataTable:any;
  printData:any=[];
  constructor(public title:Title,public apiS:AdminapiService,public excelS:ExcelService) {
    this.title.setTitle("Userwise Reports - "+environment.companyName);
   }

  ngOnInit(): void {
   this.getData();
  }

  getData(){
    this.quizScore=[];
    this.userData=[];
    this.apiS.getAllQuizScore().subscribe(data=>{
      this.quizScore = data.data;
      this.printData=[];
      for(let i=0;i<this.quizScore.length;i++){
        this.printData.push({
          "SR": i+1,
          "Employee Code": this.quizScore[i].userData[0]['employeeCode'],
          "Employee Name": this.quizScore[i].userData[0]['salutation'] + ' ' + this.quizScore[i].userData[0]['firstName'] + ' ' + this.quizScore[i].userData[0]['lastName'],
          "Designation": this.quizScore[i].userData[0]['designation'],
          "Department": this.quizScore[i].userData[0]['department'],
          "Branch": this.quizScore[i].userData[0]['branch'],
          "Score": this.quizScore[i]['score'],
          "Date": this.quizScore[i]['createdAt'],
        })
      }
      data.data.map((item:any) => item.userData[0].firstName && item.userData[0].lastName)
      .filter((value:any, index:any, self:any) => {
        if(self.indexOf(value) === index){
          this.userData.push(data.data[index].userData[0])
        }
      });
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
      this.apiS.allQuizScoreByEmployee(event.target.value).subscribe(data=>{
        this.quizScore=data.data;
        this.printData=[];
        for(let i=0;i<this.quizScore.length;i++){
          this.printData.push({
            "SR": i+1,
            "Employee Code": this.quizScore[i].userData[0]['employeeCode'],
            "Employee Name": this.quizScore[i].userData[0]['salutation'] + ' ' + this.quizScore[i].userData[0]['firstName'] + ' ' + this.quizScore[i].userData[0]['lastName'],
            "Designation": this.quizScore[i].userData[0]['designation'],
            "Department": this.quizScore[i].userData[0]['department'],
            "Branch": this.quizScore[i].userData[0]['branch'],
            "Score": this.quizScore[i]['score'],
            "Date": this.quizScore[i]['createdAt'],
          })
        }
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
    this.excelS.exportAsExcelFile(this.printData, 'User Wise Report '+ toToday);
  }


}
