import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.scss'],
})
export class AllocationComponent implements OnInit {

  programAllocation:any=[];
  courseAllocation:any=[];
  moduleAllocation:any=[];
  quizAllocation:any=[];
  programPrintData:any=[];
  coursePrintData:any=[];
  modulePrintData:any=[];
  quizPrintData:any=[];
  @ViewChild('table1') table1: any;
  dataTable1:any;
  @ViewChild('table2') table2: any;
  dataTable2:any;
  @ViewChild('table3') table3: any;
  dataTable3:any;
  @ViewChild('table4') table4: any;
  dataTable4:any;
  
  constructor(public apiS:AdminapiService,public toastController:ToastController,public excelS:ExcelService,public title:Title) {
    this.title.setTitle("Allocation Reports - "+environment.companyName);
   }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.programAllocation=[];
    this.courseAllocation=[];
    this.moduleAllocation=[];
    this.quizAllocation=[];
    this.apiS.getProgramAllocation().subscribe(data=>{
      this.programAllocation = data.data;
      this.programPrintData=[];
        for(let i=0;i<this.programAllocation.length;i++){
          this.programPrintData.push({
            "SR": i+1,
            "Program Name": this.programAllocation[i].programDetails[0]['title'],
            "User Name": this.programAllocation[i].userDetails[0]['salutation'] + ' ' + this.programAllocation[i].userDetails[0]['firstName'] + ' ' + this.programAllocation[i].userDetails[0]['lastName'],
            "Date": this.programAllocation[i]['createdAt']
          })
        }
      setTimeout(() =>{
        this.dataTable1 = $(this.table1.nativeElement);
        this.dataTable1.DataTable();
      },300);
    })
    this.apiS.getCourseAllocation().subscribe(data=>{
      this.courseAllocation = data.data;
      this.coursePrintData=[];
      for(let i=0;i<this.courseAllocation.length;i++){
        this.coursePrintData.push({
          "SR": i+1,
          "Course Name": this.courseAllocation[i].courseDetails[0]['title'],
          "User Name": this.courseAllocation[i].userDetails[0]['salutation'] + ' ' + this.courseAllocation[i].userDetails[0]['firstName'] + ' ' + this.courseAllocation[i].userDetails[0]['lastName'],
          "Date": this.courseAllocation[i]['createdAt']
        })
      }
      setTimeout(() =>{
        this.dataTable2 = $(this.table2.nativeElement);
        this.dataTable2.DataTable();
      },300);
    })
    this.apiS.getModuleAllocation().subscribe(data=>{
      console.log(data);
      this.moduleAllocation = data.data;
      this.modulePrintData=[];
      for(let i=0;i<this.moduleAllocation.length;i++){
        this.modulePrintData.push({
          "SR": i+1,
          "Module Name": this.moduleAllocation[i].moduleDetails[0]['title'],
          "User Name": this.moduleAllocation[i].userDetails[0]['salutation'] + ' ' + this.moduleAllocation[i].userDetails[0]['firstName'] + ' ' + this.moduleAllocation[i].userDetails[0]['lastName'],
          "Date": this.moduleAllocation[i]['createdAt']
        })
      }
      setTimeout(() =>{
        this.dataTable3 = $(this.table3.nativeElement);
        this.dataTable3.DataTable();
      },300);
    })
    this.apiS.getQuizAllocation().subscribe(data=>{
      this.quizAllocation = data.data;
      this.quizPrintData=[];
      for(let i=0;i<this.quizAllocation.length;i++){
        this.quizPrintData.push({
          "SR": i+1,
          "Module Name": this.quizAllocation[i].quizDetails[0]['title'],
          "User Name": this.quizAllocation[i].userDetails[0]['salutation'] + ' ' + this.quizAllocation[i].userDetails[0]['firstName'] + ' ' + this.quizAllocation[i].userDetails[0]['lastName'],
          "Date": this.quizAllocation[i]['createdAt']
        })
      }
      setTimeout(() =>{
        this.dataTable4 = $(this.table4.nativeElement);
        this.dataTable4.DataTable();
      },300);
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

  delete(id:any){
    this.apiS.deleteAllocation(id).subscribe(data=>{
      if(data.status === "success"){
        this.successPresentToast("Allocation Deleted Successfully");
        this.dataTable1.DataTable().clear().destroy();
        this.dataTable2.DataTable().clear().destroy();
        this.dataTable3.DataTable().clear().destroy();
        this.dataTable4.DataTable().clear().destroy();
        this.getData();
      }else{
        this.errorPresentToast(data.message);
      }
    })
  }


  programexportAsXLSX():void {
    var dToday = new Date();
    var monthToday = dToday.getMonth() + 1;
    var dayToday = dToday.getDate();
    var yearToday = dToday.getFullYear();
    var hour = dToday.getHours();
    var min = dToday.getMinutes();
    var sec = dToday.getSeconds();

    var toToday = [yearToday, monthToday, dayToday, hour, min, sec].join('-');
    this.excelS.exportAsExcelFile(this.programPrintData, 'Program Allocation '+ toToday);
  }


  courseexportAsXLSX():void {
    var dToday = new Date();
    var monthToday = dToday.getMonth() + 1;
    var dayToday = dToday.getDate();
    var yearToday = dToday.getFullYear();
    var hour = dToday.getHours();
    var min = dToday.getMinutes();
    var sec = dToday.getSeconds();

    var toToday = [yearToday, monthToday, dayToday, hour, min, sec].join('-');
    this.excelS.exportAsExcelFile(this.coursePrintData, 'Course Allocation '+ toToday);
  }


  moduleexportAsXLSX():void {
    var dToday = new Date();
    var monthToday = dToday.getMonth() + 1;
    var dayToday = dToday.getDate();
    var yearToday = dToday.getFullYear();
    var hour = dToday.getHours();
    var min = dToday.getMinutes();
    var sec = dToday.getSeconds();

    var toToday = [yearToday, monthToday, dayToday, hour, min, sec].join('-');
    this.excelS.exportAsExcelFile(this.modulePrintData, 'Module Allocation '+ toToday);
  }


  quizexportAsXLSX():void {
    var dToday = new Date();
    var monthToday = dToday.getMonth() + 1;
    var dayToday = dToday.getDate();
    var yearToday = dToday.getFullYear();
    var hour = dToday.getHours();
    var min = dToday.getMinutes();
    var sec = dToday.getSeconds();

    var toToday = [yearToday, monthToday, dayToday, hour, min, sec].join('-');
    this.excelS.exportAsExcelFile(this.quizPrintData, 'Quiz Allocation '+ toToday);
  }


}
