import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ExcelService } from 'src/app/_helper/excel/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-session-activity',
  templateUrl: './session-activity.component.html',
  styleUrls: ['./session-activity.component.scss']
})
export class SessionActivityComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  constructor(private title: Title,public http: HttpClient,public api:AdminapiService,public toastController:ToastController,public router:Router,public excelS:ExcelService) {
    this.title.setTitle("Session Activity - "+environment.companyName);
  }
  printData:any=[];
  employeesData:any = [];
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
    this.api.getAllUsers().subscribe(data=>{
      this.employeesData = data.data;
      console.log(this.employeesData)
      this.printData=[];
        for(let i=0;i<this.employeesData.length;i++){
          this.printData.push({
            "SR": i+1,
            "Emp Code": this.employeesData[i]['employeeCode'],
            "Name": this.employeesData[i]['salutation'] + ' ' + this.employeesData[i]['firstName'] + ' ' + this.employeesData[i]['lastName'],
            "Mobile": this.employeesData[i]['mobile'],
            "Last Login": this.employeesData[i]['lastLoginOn'],
            "State": this.employeesData[i]['state']
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
    this.excelS.exportAsExcelFile(this.printData, 'Session Activity Data '+ toToday);
  }

}
