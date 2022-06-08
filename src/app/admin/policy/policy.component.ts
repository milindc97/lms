import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { Title } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  public edit = false;
  public uploadImage=false;
  public icon="";
  public name="";
  public uploadImageName="";
  public percentage="";
  public iconError="";
  public nameError="";
  public percentageError="";
  public policies:any=[];
  baseURL =environment.baseURL;
  public policyId="";
  public update=false;
  message="";
  messageError="";
  constructor(public api:AdminapiService,public toastController:ToastController,public authService:AuthService,public title:Title) {
    this.title.setTitle("Policy - "+environment.companyName);
   }

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
    this.api.allPolicy().subscribe(data=>{
      this.policies=data.data;
    })
    this.api.singleMessageConfig().subscribe(data=>{
      if(data.data == null){
        this.message="";
      }else{
        this.message=data.data.message;
      }
    })
  }

  uploadIcon(event:any){
    // var reader = new FileReader();
    // reader.onload =  (e:any)=> {
    //   console.log(e);
    //     $('#doc').attr('href', e.target.result);
    // };
    // reader.readAsDataURL(event.target.files[0]);
    this.uploadImage= true;
    this.uploadImageName= event.target.files[0].name;
    let fileData:FormData = new FormData();
    fileData.append('file', event.target.files[0]);
    this.api.uploadFile(fileData).subscribe(data=>{
      if(data.status){
        this.icon = data.data.url;
      }
    });
  }

  createPolicy(){
    this.iconError="";
    this.percentageError="";
    this.nameError="";

    if(this.icon == ""){
      this.iconError = "has-error";
      return;
    }

    if(this.percentage == ""){
      this.percentageError = "has-error";
      return;
    }

    if(this.name == ""){
      this.nameError = "has-error";
      return;
    }
    this.api.createPolicy(this.icon,this.name,this.percentage).subscribe(result=>{
      if(result.status){
          this.successPresentToast(result.message);
        this.clear();
        this.getData();
        this.edit=false;
          
      } else {
        this.errorPresentToast(result.message);
      }
    });
  }
  

clear(){
  this.name="";
          this.icon="";
          this.percentage="";
          this.uploadImageName="";
          this.uploadImage=false;
}
editP(id:any){
  this.edit=true;
  this.update=true;
  this.api.singlePolicy(id).subscribe(data=>{
    this.name=data.data.name;
    this.percentage = data.data.percentage;
    this.icon=data.data.icon;
    this.policyId=id;
  })
}

editPolicy(){
  this.iconError="";
  this.percentageError="";
  this.nameError="";

  if(this.icon == ""){
    this.iconError = "has-error";
    return;
  }

  if(this.percentage == ""){
    this.percentageError = "has-error";
    return;
  }

  if(this.name == ""){
    this.nameError = "has-error";
    return;
  }
  this.api.updatePolicy(this.icon,this.name,this.percentage,this.policyId).subscribe(result=>{
    if(result.status){
      this.successPresentToast(result.message);

    this.getData();
      
  } else {
    this.errorPresentToast(result.message);
  }
  })
}

saveMessageConfig(){
  this.messageError="";

  if(this.message == ""){
    this.messageError = "has-error";
    return;
  }

  this.api.updateMessageConfig(this.message).subscribe(result=>{
    if(result.status){
      this.successPresentToast(result.message);
    }else{
      this.errorPresentToast(result.message);
    }
  })
}

}
