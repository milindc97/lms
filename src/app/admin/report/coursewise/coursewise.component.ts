import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coursewise',
  templateUrl: './coursewise.component.html',
  styleUrls: ['./coursewise.component.scss'],
})
export class CoursewiseComponent implements OnInit {
  courseAllocation:any=[];
  courseData:any=[];
  @ViewChild('table') table: any;
  dataTable:any;
  printData:any=[];
  constructor(public apiS:AdminapiService,public excelS:ExcelService,public title:Title) {
    this.title.setTitle("Coursewise Reports - "+environment.companyName);
   }

  ngOnInit(): void {
   this.getData();
  }

  getData(){
    this.apiS.getCourseAllocation().subscribe(data=>{
      this.courseAllocation = data.data;
      data.data.map((item:any) => item.courseDetails[0].title)
      .filter((value:any, index:any, self:any) => {
        if(self.indexOf(value) === index){
          this.courseData.push(data.data[index].courseDetails[0])
        }
      });
      this.printData=[];
      for(let i=0;i<this.courseAllocation.length;i++){
        this.printData.push({
          "SR": i+1,
          "Employee Code": this.courseAllocation[i].userDetails[0]['employeeCode'],
          "Employee Name": this.courseAllocation[i].userDetails[0]['salutation'] + ' ' + this.courseAllocation[i].userDetails[0]['firstName'] + ' ' + this.courseAllocation[i].userDetails[0]['lastName'],
          "Course Name": this.courseAllocation[i].courseDetails[0]['title'],
          "Designation": this.courseAllocation[i].userDetails[0]['designation'],
          "Department": this.courseAllocation[i].userDetails[0]['department'],
          "Branch": this.courseAllocation[i].userDetails[0]['branch'],
          "Date": this.courseAllocation[i]['createdAt'],
        })
      }
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
      this.courseAllocation=[];
      
      this.apiS.getCourseAllocationByCourse(event.target.value).subscribe(data=>{
        this.courseAllocation=data.data;
        this.printData=[];
        for(let i=0;i<this.courseAllocation.length;i++){
          this.printData.push({
            "SR": i+1,
            "Employee Code": this.courseAllocation[i].userDetails[0]['employeeCode'],
            "Employee Name": this.courseAllocation[i].userDetails[0]['salutation'] + ' ' + this.courseAllocation[i].userDetails[0]['firstName'] + ' ' + this.courseAllocation[i].userDetails[0]['lastName'],
            "Course Name": this.courseAllocation[i].courseDetails[0]['title'],
            "Designation": this.courseAllocation[i].userDetails[0]['designation'],
            "Department": this.courseAllocation[i].userDetails[0]['department'],
            "Branch": this.courseAllocation[i].userDetails[0]['branch'],
            "Date": this.courseAllocation[i]['createdAt'],
          })
        }
        console.log(this.courseAllocation);
        setTimeout(() =>{
          this.dataTable.DataTable();
        },500);
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
    this.excelS.exportAsExcelFile(this.printData, 'Course Wise Report '+ toToday);
  }

}
