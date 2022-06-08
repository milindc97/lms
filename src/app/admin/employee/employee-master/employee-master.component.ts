import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.scss']
})
export class EmployeeMasterComponent implements OnInit {
  @ViewChild('table') table: any;
  dataTable:any;
  printData:any=[];
  constructor(private title: Title,public http: HttpClient,public api:AdminapiService,public excelS:ExcelService,public toastController:ToastController,public router:Router) {
    this.title.setTitle("Employee Master - "+environment.companyName);
   }
   emp:any=[];
  employeesData:any = [];
  loading = false;
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    let cnt = 0;
    this.employeesData = [];
    this.loading = true;
    this.api.getAllUsers().subscribe(data=>{
      this.employeesData = data.data;
      this.printData=[];
      for(let i=0;i<this.employeesData.length;i++){
        this.printData.push({
          "SR": i+1,
          "Emp Code": this.employeesData[i]['employeeCode'],
          "Name": this.employeesData[i]['salutation'] + ' ' + this.employeesData[i]['firstName'] + ' ' + this.employeesData[i]['lastName'],
          "Email": this.employeesData[i]['email'],
          "Mobile": this.employeesData[i]['mobile'],
          "M/F": this.employeesData[i]['gender'],
          "Dpt.": this.employeesData[i]['department'],
          "Status": (this.employeesData[i]['status'] == 1)?"Active":"Pending"
        })
      }
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      },300);
      this.loading = false;
    });
  }

  filterByStatus(event:any){
    this.dataTable.DataTable().clear().destroy();
    if(event.target.value == 2){
      this.getData();
    }else{
      this.employeesData=[];
      this.api.getAllUsersByStatus(parseInt(event.target.value)).subscribe(data=>{
        this.employeesData=data.data;
        this.printData=[];
        for(let i=0;i<this.employeesData.length;i++){
          this.printData.push({
            "SR": i+1,
            "Emp Code": this.employeesData[i]['employeeCode'],
            "Name": this.employeesData[i]['salutation'] + ' ' + this.employeesData[i]['firstName'] + ' ' + this.employeesData[i]['lastName'],
            "Email": this.employeesData[i]['email'],
            "Mobile": this.employeesData[i]['mobile'],
            "M/F": this.employeesData[i]['gender'],
            "Dpt.": this.employeesData[i]['department'],
            "Status": (this.employeesData[i]['status'] == 1)?"Active":"Pending"
          })
        }
        setTimeout(() =>{
          this.dataTable.DataTable();
        },300);
      })
    }
    
  }

  changeEmployeeStatus(id:string,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateStatusUser(id,status).subscribe(data=>{
      if(status == "0"){
        this.errorPresentToast("User Status Updated");
      }else if(status == "1"){
        this.successPresentToast("User Status Updated");
      }
      
    });
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

  syncEmployee(){
    this.successPresentToast("Sync Request Sent");
    this.api.syncEmployee().subscribe(data=>{
      this.successPresentToast("Sync Success");
      this.getData();
    });
  }
  editEmployee(id:any){
      this.router.navigate(['/admin/employee/activity/edit'],{
        queryParams:{id:id}
      });
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
    this.excelS.exportAsExcelFile(this.printData, 'Employee Master Data '+ toToday);
  }
}
