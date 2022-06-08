

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @ViewChild('title') titleChild!: ElementRef;
  @ViewChild('message') messageChild!: ElementRef;
  @ViewChild('segmentPrg') segmentPrgChild!: ElementRef;
  @ViewChild('segmentDep') segmentDepChild!: ElementRef;
  notTitle="";
  messageEditor!: Editor;
   toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
  ];
  @ViewChild('table') table: any;
  dataTable:any;
  messageText="";
  segment="All";
  titleError="";
  messageError="";
  segmentPrgError="";
  segmentDepError="";
  empData:any=[];
  programData:any=[];
  program="select";
  department="select";
  notificationArr:any=[];
  uploadImage=false;
  uploadImageName="";
  image="";
  imageError="";
  baseURL=environment.baseURL;

  constructor(private title: Title,public apiS:AdminapiService,public toastController:ToastController,public authS:AuthService) {
    this.title.setTitle("Notifications - "+environment.companyName);
   }

  ngOnInit(): void {
    this.messageEditor = new Editor();
    this.getData();
  }

  getData(){
    this.apiS.allProgram().subscribe(data=>{
      this.programData = data.data;
    });
    this.apiS.getAllUsers().subscribe(data=>{
      this.empData = data.data.map((item:any) => item.department)
      .filter((value:any, index:any, self:any) => self.indexOf(value) === index)
    })
    this.apiS.getAllNotification().subscribe(data=>{
      this.notificationArr = data.data; 
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
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

  uploadImageFile(event:any){
    this.uploadImage= true;
    this.uploadImageName= event.target.files[0].name;
    var reader = new FileReader();
    reader.onload =  (e:any)=> {
        $('#thum').attr('src', e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    let fileData:FormData = new FormData();
    fileData.append('file', event.target.files[0]);
    this.apiS.uploadFile(fileData).subscribe(data=>{
      if(data.status){
        this.image = data.data.url;
      }
    });
  }


  sendNotification(){
    this.clearError();
    if(this.notTitle == ""){
      this.titleError = "has-error";
      this.titleChild.nativeElement.focus();
      return;
    }

    if(this.messageText == ""){
      this.messageError = "has-error";
      this.messageChild.nativeElement.focus();
      return;
    }

    if(this.segment == "Program" && this.program == ""){
      this.segmentPrgError = "has-error";
      this.segmentPrgChild.nativeElement.focus();
      return;
    }
    if(this.segment == "Department" && this.department == ""){
      this.segmentDepError = "has-error";
      this.segmentDepChild.nativeElement.focus();
      return
    }
    if(this.image == ""){
      this.imageError = "has-error";
      return
    }
    if(this.segment == "All"){
      this.apiS.createNotification(this.notTitle,this.messageText,this.segment,"",this.image).subscribe(result=>{
        if(result.status){
            this.successPresentToast(result.message);
            this.clearForm();
            this.getData();
        } else {
          this.errorPresentToast(result.message);
        }
      });
    }else if(this.segment == "Program"){
      this.apiS.createNotification(this.notTitle,this.messageText,this.segment,this.program,this.image).subscribe(result=>{
        if(result.status){
            this.successPresentToast(result.message);
            this.clearForm();
            this.getData();
        } else {
          this.errorPresentToast(result.message);
        }
      });
    }else if(this.segment == "Department"){
      this.apiS.createNotification(this.notTitle,this.messageText,this.segment,this.department,this.image).subscribe(result=>{
        if(result.status){
            this.successPresentToast(result.message);
            this.clearForm();
            this.getData();
        } else {
          this.errorPresentToast(result.message);
        }
      });
    }
  }
  clearForm(){
    this.notTitle="";
    this.messageText="";
    this.segment="All";
    this.program="";
    this.department="";
    this.uploadImage=false;
    this.uploadImageName="";
    this.image="";
  }
  clearError(){
    this.titleError = "";
    this.messageError = "";
    this.segmentDepError = "";
    this.imageError="";
    this.segmentPrgError = "";
  }
}
