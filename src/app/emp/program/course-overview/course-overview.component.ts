import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { debounceTime } from 'rxjs/operators';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss'],
})
export class CourseOverviewComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  programId = "";
  coursesData:any = [];
  course:any=[];
  baseURL = environment.baseURL;
  constructor(public activateRoute: ActivatedRoute,public api:EmpapiService,public authService:AuthService,private title: Title,public toastController:ToastController,
    public router:Router,public platform:Platform) {
    this.title.setTitle("Course Overview - "+environment.companyName);
    this.activateRoute.params.subscribe(data=>{
      this.programId = data.id;
    });
   }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/emp/program']);
    });
    this.getData();
    this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.filerData(value);
    });
  }

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/emp/program']);
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

  getData(){
    this.coursesData=[];
    this.api.singleProgram(this.programId).subscribe(data=>{
      console.log(data);
      for(let i=0;i<data.data.courses.length;i++){
        data.data.coursesData[i].pcode = data.data.courses[i].pCode;
      }
      let moduleWatchTime = 0;
      for(let i=0;i<data.data.modulesData.length;i++){
         moduleWatchTime = (moduleWatchTime*1)+(data.data.modulesData[i].moduleWatchTime*1);
      }
      data.data.coursesData[0].hours = Math.trunc(moduleWatchTime/60);
      data.data.coursesData[0].minutes = moduleWatchTime % 60;
      this.coursesData = data.data.coursesData;
      this.course= this.coursesData;
    });
  }
  initializeItems(): void {
    this.coursesData = this.course;
  }

  filerData(value:any) {
    this.initializeItems();
    if (!value) {
      return;
    }
    this.coursesData = this.coursesData.filter((currentGoal:any) => {
      console.log(currentGoal);
      if (currentGoal.title && value) {
        if (currentGoal.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return false;
    });
  }

  back(){
    window.history.back();
  }

  alert(){
    this.errorPresentToast("Work In Progress");
  }

  getModule(id:any,code:any){
    this.router.navigate(['/emp/module/overview'],{
      queryParams:{id:id,code:code,type:"Course"}
    })
  }

}
