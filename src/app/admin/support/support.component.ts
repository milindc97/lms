import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import * as jqeury from 'jquery';
import 'select2';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  @ViewChild('refresh') refresh!: ElementRef;
  constructor(private title: Title,private api: AdminapiService, private toastController: ToastController,public authService:AuthService) {
    this.title.setTitle("Support - "+environment.companyName);
   }
   remarkEditor!: Editor;
   toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
  ];
  isWeb = true;
  supportId="";
  @ViewChild('table') table: any;
  dataTable:any;
  supportRequests:any = [];
  supportTransaction:any = [];
  emp:any=[];
  employee:any="";
  subject="";
  message="";
  remark:any="";
  file = "";
  baseURL=environment.baseURL;
  ngOnInit(): void {
    this.remarkEditor = new Editor();
    this.getData();
  }

  getData(){
    jqeury(document).ready(function() {
      (<any>jqeury('.select2')).select2({
        width:"resolve",
        theme: "classic"
      });
  });
    this.supportRequests = [];
    this.api.getAllUsers().subscribe(data=>{
      this.emp = data.data;
    })
    this.api.getAllSupportRequests().subscribe(data=>{
      console.log(data.data);
      this.supportRequests = data.data;
      setTimeout(() =>{
        this.dataTable = (<any>$(this.table.nativeElement));
        this.dataTable.DataTable();
      },300);
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

  showSupport(item:any){
    this.supportId = item._id;
    this.subject = item.subject;
    this.message = item.message;
    this.file = item.file;
    this.api.getAllSupportTransaction(this.supportId).subscribe(data=>{
      console.log(data.data);
      this.supportTransaction = data.data;
    })
  }

  closeModal(){
    this.subject="";
    this.message="";
    this.employee="";
  }

  updateStatus(id:any){
    console.log(this.remark);
    console.log(id);
    this.api.updateSupportRequestStatus(id,this.remark,1).subscribe(data=>{
      if(data.status){
        // this.api.updateSupportTransactionStatus(id,1).subscribe(data=>{
          this.refresh.nativeElement.click();
          this.successPresentToast(data.message);
        // })
      }else{
        this.successPresentToast(data.message);
      }
    });
  }
  send(){
    let employee:any = jqeury('#employee').val();
    console.log(this.baseURL+"/retrieve/"+this.file+"/"+this.authService.currentUserValue.accessToken);
      this.api.sendSupportEmail(this.supportId,this.baseURL+"/retrieve/"+this.file+"/"+this.authService.currentUserValue.accessToken,this.subject,this.message,this.emp[employee].email,this.emp[employee]._id,(this.emp[employee].salutation == undefined)?"":this.emp[employee].salutation,this.emp[employee].firstName,this.emp[employee].lastName).subscribe(data=>{
        if(data.status){
          this.successPresentToast(data.message);
        }else{
          this.errorPresentToast(data.message);
        }
      })
  }
}
