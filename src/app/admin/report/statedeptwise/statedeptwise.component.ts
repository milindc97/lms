import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-statedeptwise',
  templateUrl: './statedeptwise.component.html',
  styleUrls: ['./statedeptwise.component.scss'],
})
export class StatedeptwiseComponent implements OnInit {

  moduleWatches:any=[];
  stateData:any=[];
  printData:any=[];
  departmentData:any=[];
  @ViewChild('table') table: any;
  dataTable:any;
  constructor(public apiS:AdminapiService,public excelS:ExcelService,public title:Title) {
    this.title.setTitle("State & Dept Wise Reports - "+environment.companyName);
   }

  ngOnInit(): void {
   this.getData();
  }

  getData(){
    this.moduleWatches=[];
    this.departmentData=[];
    this.stateData=[];
    this.apiS.allModulesWatches().subscribe(data=>{
      console.log(data.data);
      this.moduleWatches = data.data;
      this.printData=[];
        for(let i=0;i<this.moduleWatches.length;i++){
          this.printData.push({
            "SR": i+1,
            "Module Name": this.moduleWatches[i].module[0][0]['title'],
            "State": this.moduleWatches[i].user[0][0]['stateEmp'],
            "Department": this.moduleWatches[i].user[0][0]['department'],
            "Participants Count": this.moduleWatches[i]['participantsCount'],
            "Date": this.moduleWatches[i].createdAt[0]
          })
        }
      data.data.map((item:any) => item.user[0][0].stateEmp)
      .filter((value:any, index:any, self:any) => {
        if(self.indexOf(value) === index){
          this.stateData.push(data.data[index].user[0][0])
        }
      });
      data.data.map((item:any) => item.user[0][0].department)
      .filter((value:any, index:any, self:any) => {
        if(self.indexOf(value) === index){
          this.departmentData.push(data.data[index].user[0][0])
        }
      });
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      },300);
    })
  }


  filter(event:any){
    this.dataTable.DataTable().clear().destroy();
    if(event.target.value == "All"){
      this.getData();
    }else{
      this.moduleWatches=[];
      this.apiS.allModulesWatchesByEmp(event.target.value).subscribe(data=>{
        this.moduleWatches=data.data;
        this.printData=[];
        for(let i=0;i<this.moduleWatches.length;i++){
          this.printData.push({
            "SR": i+1,
            "Module Name": this.moduleWatches[i].module[0][0]['title'],
            "State": this.moduleWatches[i].user[0][0]['stateEmp'],
            "Department": this.moduleWatches[i].user[0][0]['department'],
            "Participants Count": this.moduleWatches[i]['participantsCount'],
            "Date": this.moduleWatches[i].createdAt[0]
          })
        }
        console.log(this.moduleWatches);
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
    this.excelS.exportAsExcelFile(this.printData, 'State and Department Wise Report '+ toToday);
  }



}
