import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { debounceTime } from 'rxjs/operators';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(private api: EmpapiService, private toastController: ToastController,public authService: AuthService,public router:Router,private title: Title,
    public platform:Platform) {
    this.title.setTitle("Program Overview - "+environment.companyName);
   }
  baseURL = environment.baseURL;
  searchControl: FormControl = new FormControl();
  programData:any = [];
  prg:any=[];
  coursesLength=0;
  modulesLength=0;
  quizLength=0;
  completedQuizLength =0;
   loading:boolean=true;
  @ViewChild('table') table: any;
  dataTable:any;

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/dashboard']);
    });
    this.getData();
    this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.filerData(value);
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

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/dashboard']);
    });
  }

  getData(){
    this.api.quizCountForProgram(this.authService.currentUserValue.id).subscribe(data=>{
        this.quizLength = data.quizLength;
        this.completedQuizLength = data.completedLength;
    });
    this.api.getProgramCompletionStatusByEmp(this.authService.currentUserValue.id).subscribe(data=>{
      this.loading=false;
      this.programData= data.data;
      this.prg = this.programData;
      for(let a=0;a<data.data.length;a++){
        this.coursesLength += data.data[a].programData.courses.length;
        this.modulesLength += data.data[a].programData.modules.length;
      }
    })
    
    
  }

  expiredToast(){
    this.errorPresentToast("Program is expired");
  }

  editProgram(id:String){
    this.router.navigate(['/emp/program/activity/edit'],{
      queryParams:{id:id}
    });
  }

  changeProgramStatus(id:String,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateStatusProgram(id,status).subscribe(data=>{
      this.successPresentToast("Program Status Updated");
    });
  }

  doRefresh(event:any) {
    this.getData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  initializeItems(): void {
    this.programData = this.prg;
  }

  filerData(value:any) {
    this.initializeItems();
    if (!value) {
      return;
    }
    this.programData = this.programData.filter((currentGoal:any) => {
      console.log(currentGoal);
      if (currentGoal.programData.title && value) {
        if (currentGoal.programData.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return false;
    });
  }
}
