import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cources-list',
  templateUrl: './cources-list.component.html',
  styleUrls: ['./cources-list.component.scss']
})
export class CourcesListComponent implements OnInit {
  baseURL = environment.baseURL;
  @ViewChild('table') table: any;
  dataTable:any;
  cou:any=[];
  constructor(private title: Title,public api: AdminapiService, private toastController: ToastController,public authService: AuthService,public router:Router) {
    this.title.setTitle("Courses - "+environment.companyName);
   }

  courseData:any = [];

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.courseData = [];
    this.api.allCourse().subscribe(data=>{
      this.courseData = data.data;
      this.cou = this.courseData;
      console.log(this.courseData);
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      },300);
    });
  }

  editCourse(id:String){
    this.router.navigate(['/admin/courses/activity/edit'],{
      queryParams:{id:id}
    });
  }

  filterByStatus(event:any){
    this.dataTable.DataTable().clear().destroy();
    if(event.target.value == '2'){
      this.getData();
    }else if(event.target.value == '1'){
      this.courseData=[];
      this.api.allActiveCourse().subscribe(data=>{
        this.courseData = data.data;
      });
      setTimeout(() =>{
        this.dataTable.DataTable();
      },500);
    }else{
      this.courseData=[];
      this.api.allInactiveCourse().subscribe(data=>{
        this.courseData = data.data;
      });
      setTimeout(() =>{
        this.dataTable.DataTable();
      },500);
    }
  }

  changeCourseStatus(id:String,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateStatusCourse(id,status).subscribe(data=>{
      if(status == "0"){
        this.errorPresentToast("Course Status Updated");
      }else if(status == "1"){
        this.successPresentToast("Course Status Updated");
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

}
