import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-performance',
  templateUrl: './employee-performance.component.html',
  styleUrls: ['./employee-performance.component.scss']
})
export class EmployeePerformanceComponent implements OnInit {
  @ViewChild('table') table: any;
  dataTable:any;
  loading = false;
  allEmployee:any=[];
  allEmp:any=[];
  departmentList:any=[];
  printData:any=[];
  department="";
  constructor(public api:AdminapiService,public excelS:ExcelService,public title:Title) {
    this.title.setTitle("Employee Performance - "+environment.companyName);
   }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true;
    this.api.getAllUsers().subscribe(data=>{
      console.log(data.data);
      this.allEmployee = data.data;
      this.allEmp = this.allEmployee;
      this.printData=[];
      for(let i=0;i<this.allEmployee.length;i++){
        this.printData.push({
          "SR": i+1,
          "Emp Code": this.allEmployee[i]['employeeCode'],
          "Name": this.allEmployee[i]['salutation'] + ' ' + this.allEmployee[i]['firstName'] + ' ' + this.allEmployee[i]['lastName'],
          "Department": this.allEmployee[i]['department']
        })
      }
      this.departmentList = data.data.map((item:any) => item.department)
        .filter((value:any, index:any, self:any) => self.indexOf(value) === index);
        
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      },300);
      this.loading = false;
    })
  }

  initializeItems(): void {
    this.allEmployee = this.allEmp;
  }

  filterByDept() {
    this.dataTable.DataTable().clear().destroy();
    this.allEmployee = this.allEmp.filter((x:any) => x.department == this.department);
    this.printData=[];
    for(let i=0;i<this.allEmployee.length;i++){
      this.printData.push({
        "SR": i+1,
        "Emp Code": this.allEmployee[i]['employeeCode'],
        "Name": this.allEmployee[i]['salutation'] + ' ' + this.allEmployee[i]['firstName'] + ' ' + this.allEmployee[i]['lastName'],
        "Department": this.allEmployee[i]['department']
      })
    }
    setTimeout(() =>{
      this.dataTable.DataTable();
    },300);
    // console.log(this.department);
    // this.initializeItems();
    // const val = this.department;
    // if (!val) {
    //   return;
    // }
    // this.allEmployee = this.allEmployee.filter((currentGoal:any) => {
    //   if (currentGoal.department && val) {
        
    //     if (currentGoal.department.toLowerCase().indexOf(val.toLowerCase()) > -1) {
    //       return true;
    //     }
    //   }
    //   return true;
    // });
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
    this.excelS.exportAsExcelFile(this.printData, 'Employee Performance Data '+ toToday);
  }
}
