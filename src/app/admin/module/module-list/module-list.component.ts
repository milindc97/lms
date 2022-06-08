import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment} from 'src/environments/environment'
@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  @ViewChild('table') table: any;
  dataTable:any;
  baseURL = environment.baseURL;
  constructor(private title: Title,public api: AdminapiService, private toastController: ToastController,public authService: AuthService,public router:Router) {
    this.title.setTitle("Modules - "+environment.companyName);
   }
mod:any=[];
  moduleData:any = [];

  ngOnInit(): void {
    this.getData();
    this.getFile("d822cbff7a60a41a14d8e0500.png");
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
    this.moduleData = [];
    this.api.allModules().subscribe(data=>{
      this.moduleData = data.data;
      this.mod = this.moduleData;
      console.log(this.moduleData);
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      },300);
    });
  }

  editModule(id:String){
    console.log(id);
    this.router.navigate(['/admin/module/activity/edit'],{
      queryParams:{id:id}
    });
  }

  changeModuleStatus(id:String,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateStatusModule(id,status).subscribe(data=>{
      if(status == "0"){
        this.errorPresentToast("Module Status Updated");
      }else if(status == "1"){
        this.successPresentToast("Module Status Updated");
      }
    });
  }
  // {{baseURL}}/retrieve/{{item.thumbnail}}/{{authService.currentUserValue.accessToken}}
  getFile(filename:string){
    // return "http://localhost:8080/api/retrieve/d822cbff7a60a41a14d8e0500.png/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGUwYzFhYjJkNDM3Y2RhMzk3ZGVjMCIsImlhdCI6MTYzNzc0MjIwNywiZXhwIjoxNjM3NzQ1ODA3fQ.ziiBFJ4vTda2dNIsjKTZ2LvsYyMikP9XdfQOcNhw534";
    this.api.downloadFile(filename);
  }

  filterByStatus(event:any){
    this.dataTable.DataTable().clear().destroy();
    if(event.target.value == '2'){
      this.getData();
    }else if(event.target.value == '1'){
      this.moduleData=[];
      this.api.allActiveModules().subscribe(data=>{
        this.moduleData = data.data;
      });
      setTimeout(() =>{
        this.dataTable.DataTable();
      },500);
    }else{
      this.moduleData=[];
      this.api.allInactiveModules().subscribe(data=>{
        this.moduleData = data.data;
      });
      setTimeout(() =>{
        this.dataTable.DataTable();
      },500);
    }
    
  }

}
