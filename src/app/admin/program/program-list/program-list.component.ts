import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {
  constructor(private title:Title,private api: AdminapiService, private toastController: ToastController,public authService: AuthService,public router:Router) {
    this.title.setTitle("Programs - "+environment.companyName);
   }
  baseURL = environment.baseURL;
  programData:any = [];
  prg:any=[];
  @ViewChild('table') table: any;
  dataTable:any;

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.programData = [];
    this.api.allProgram().subscribe(data=>{
      this.programData = data.data;
      this.prg =this.programData
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
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

  filterByStatus(event:any){
    this.dataTable.DataTable().clear().destroy();
    if(event.target.value == '2'){
      this.getData();
    }else if(event.target.value == '1'){
      this.programData=[];
      this.api.allActiveProgram().subscribe(data=>{
        this.programData = data.data;
      });
      setTimeout(() =>{
        this.dataTable.DataTable();
      },500);
    }else{
      this.programData=[];
      this.api.allInactiveProgram().subscribe(data=>{
        this.programData = data.data;
      });
      setTimeout(() =>{
        this.dataTable.DataTable();
      },500);
    }
    
  }

  editProgram(id:String){
    this.router.navigate(['/admin/program/activity/edit'],{
      queryParams:{id:id}
    });
  }

  truncateText(selector:any, maxLength:any) {
    var element = document.querySelector(selector),
        truncated = element.innerText;

    if (truncated.length > maxLength) {
        truncated = truncated.substr(0,maxLength) + '...';
    }
    return truncated;
}

  changeProgramStatus(id:String,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateStatusProgram(id,status).subscribe(data=>{
      if(status == "0"){
        this.errorPresentToast("Program Status Updated");
      }else if(status == "1"){
        this.successPresentToast("Program Status Updated");
      }
    });
  }
}