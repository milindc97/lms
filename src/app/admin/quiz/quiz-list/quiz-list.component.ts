import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  constructor(private title: Title,private api: AdminapiService, private toastController: ToastController,public router:Router) {
    this.title.setTitle("Quiz - "+environment.companyName);
   }
  isWeb = true;
  @ViewChild('table') table: any;
  dataTable:any;
  qbData:any = [];
   qb:any=[];
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.qbData = [];
    this.api.getAllQuestionBank().subscribe(data=>{
      this.qbData = data.data;
      this.qb = this.qbData;
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      },300);
    });
  }

  editQB(id:String){
    this.router.navigate(['/admin/quiz/activity/edit'],{
      queryParams:{id:id}
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

  changeQBStatus(id:String,index:any,event:any){

    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateStatusQuestioBank(id,status).subscribe(data=>{
      if(data.status == "success"){
        if(status == "0"){
          this.errorPresentToast(data.message);
        }else if(status == "1"){
          this.successPresentToast(data.message);
        }
      }else{
        this.errorPresentToast(data.message); 
        setTimeout(() => {
          if(data.message == "Please check questions count and quiz time."){
            location.reload();
          }
        }, 500);
        
      }
    });
  }

  filterByStatus(event:any){
    this.dataTable.DataTable().clear().destroy();
    if(event.target.value == '2'){
      this.getData();
    }else if(event.target.value == '1'){
      this.qbData=[];
      this.api.getAllActiveQuestionBank().subscribe(data=>{
        this.qbData = data.data;
      });
      setTimeout(() =>{
        this.dataTable.DataTable();
      },500);
    }else{
      this.qbData=[];
      this.api.getAllInactiveQuestionBank().subscribe(data=>{
        this.qbData = data.data;
      });
      setTimeout(() =>{
        this.dataTable.DataTable();
      },500);
    }
    
  }

}
