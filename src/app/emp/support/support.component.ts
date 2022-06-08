import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Editor, Toolbar } from 'ngx-editor';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit,OnDestroy {
  messageEditor!: Editor;
  subject:any="";
  message:any="";
  fileLink:any="";
  subjectError="";
  messageError="";
  fileError="";
  uploadfile:boolean=false;
  uploadfilename="";
  baseURL=environment.baseURL;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
  ];
  supportArr:any=[];
  constructor(public authService:AuthService,public apiS:EmpapiService,public toastController:ToastController,private title: Title,public router:Router,
    public platform:Platform) { 
    this.title.setTitle("Support - Fusion Microfinance");
  }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/dashboard']);
    });
    this.messageEditor = new Editor();
    this.getData();
  }
  ngOnDestroy(): void {
    this.messageEditor.destroy();
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

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/dashboard']);
    });
  }
  getData(){
    this.apiS.getAllSupportByEmp(this.authService.currentUserValue.id).subscribe(data=>{
      console.log(data.data);
      this.supportArr= data.data;
    })
  }

  uploadFile(event:any){
      this.uploadfile= true;
      this.uploadfilename= event.target.files[0].name;
      let fileData:FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      this.apiS.uploadFile(fileData).subscribe(data=>{
        if(data.status){
          this.fileLink = data.data.url;
        }
      });
  }

  createSupportRequest(){
    this.subjectError="";
    this.messageError="";

    if(this.subject == ""){
      this.subjectError = "has-error";
      return;
    }

    if(this.message == ""){
      this.messageError = "has-error";
      return;
    }


    this.apiS.createSupportRequest(this.subject,this.message,this.fileLink,this.authService.currentUserValue.id).subscribe(res=>{
      if(res.status == "success"){
        this.successPresentToast(res.message);
        this.subject="";
        this.message="";
        this.fileLink="";
        this.getData();
      } else {
        this.errorPresentToast(res.message);
      }
    });


  }
}
