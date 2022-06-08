import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-api-log',
  templateUrl: './api-log.component.html',
  styleUrls: ['./api-log.component.scss']
})
export class ApiLogComponent implements OnInit {

  
  @ViewChild('table') table: any;
  dataTable:any;
  constructor(private title: Title,public http: HttpClient,public api:AdminapiService,public toastController:ToastController,public router:Router,public excelS:ExcelService) {
    this.title.setTitle("Api Log - "+environment.companyName);
  }

  employeesData:any = [];
  printData:any=[];
  loading = false;
  ngOnInit(): void {
    this.getData();
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
  
  getData(){
    this.employeesData = [];
    this.loading = true;
    this.api.apiLog().subscribe(data=>{
      console.log(data);
      this.employeesData = data.data;
      this.printData=[];
        for(let i=0;i<this.employeesData.length;i++){
          this.printData.push({
            "SR": i+1,
            "Emp Code": this.employeesData[i].userData[0]['employeeCode'],
            "Name": this.employeesData[i].userData[0]['salutation'] + ' ' + this.employeesData[i].userData[0]['firstName'] + ' ' + this.employeesData[i].userData[0]['lastName'],
            "URL": this.employeesData[i]['url'],
            "Date Time": this.employeesData[i]['createdAt'],
            "IP Address": this.employeesData[i]['ip']
          })
        }
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      },300);
      this.loading = false;
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
    this.excelS.exportAsExcelFile(this.printData, 'Api Log '+ toToday);
  }

}
