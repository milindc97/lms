import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent implements OnInit {
  @ViewChild('close') closeModal!: ElementRef;
  remarkError="";
  pendingUserRequests:any=[];
  oldUserRequests:any=[];
  remark="";
  id:any;
  constructor(public api:AdminapiService,public toastController:ToastController,public title:Title) { 
    this.title.setTitle("Employee Registration - "+environment.companyName);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.api.getPendingUserRequests().subscribe(data=>{
      this.pendingUserRequests = data.data;
    });
    this.api.getOldUserRequests().subscribe(data=>{
      this.oldUserRequests = data.data;
    })
  }

  updateSuccessStatus(id:any){
    this.api.updateStatusUserRequests(id,1,"").subscribe(data=>{
      this.successPresentToast("User Request Approved");
      this.getData();
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

  showModal(id:any){
    this.remarkError="";
    this.id=id;
  }

  updateRejectedStatus(){
    if(this.remark == ""){
      this.remarkError = "has-error";
      return;
    }
    this.api.updateStatusUserRequests(this.id,2,this.remark).subscribe(data=>{
      this.successPresentToast("User Request Rejected");
      this.getData();
      this.id="";
      this.remark="";
      this.closeModal.nativeElement.click();
    });
  }
}
