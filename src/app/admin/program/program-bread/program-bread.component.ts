import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-program-bread',
  templateUrl: './program-bread.component.html',
  styleUrls: ['./program-bread.component.scss']
})
export class ProgramBreadComponent implements OnInit {
  @ViewChild('keywordsChild') keywordsChild!: ElementRef;
  @ViewChild('titleChild') titleChild!: ElementRef;
  @ViewChild('descriptionChild') descriptionChild!: ElementRef;
  @ViewChild('thumbnailChild') thumbnailChild!: ElementRef;

  public allCourse:any=[];
  programCode="";
  programKeywords="";
  programTitle="";
  expiryDate:any;
  module:any=[];
  programDesc="";
  moduleArr:any=[];
  keywordsError = "";
  titleError = "";
  thumbnailError="";
  thumbnailLink="";
  uploadfilename="";
  descriptionError = "";
  courseError = "";
  moduleError = "";
  courseChecked:any=[];
  moduleChecked:any=[];
  moduleSearched=[];
  courseSearched=[];
  uploadfile:boolean=false;
  baseURL = environment.baseURL;
  edit:boolean=false;
  programId="";
  constructor(private title: Title,public apiService:AdminapiService,public toastController:ToastController,public authService:AuthService,public route:ActivatedRoute,public router:Router,
    public datepipe:DatePipe) {
    this.title.setTitle("Programs - "+environment.companyName);
   }

  ngOnInit(): void {
      this.getCourse();
      this.route.params.subscribe(data=>{
        if(data.action == "create"){
          this.edit = false;
          this.getIncrementalCode();
        }else{
          this.edit = true;
          this.route.queryParams.subscribe(data=>{
            this.programId = data.id;
            let couInterval = setInterval(()=>{
              if(this.allCourse.length > 0){
                this.getProgramById(data.id);
                clearInterval(couInterval);
              }
                
            },500);
            
          })
        }
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

  getProgramById(id:any){
    this.apiService.singleProgram(id).subscribe(programData=>{

      this.programCode = programData.data.code;
      this.programKeywords = programData.data.keywords;
      this.programTitle = programData.data.title;
      this.programDesc = programData.data.description;
      this.thumbnailLink = programData.data.thumbnail;
      this.moduleArr = programData.data.modules;
      this.expiryDate = this.datepipe.transform(programData.data.expiryDate, 'yyyy-MM-dd');
      for(let i = 0;i<this.allCourse.length;i++){
        for(let cm =0;cm<programData.data.courses.length;cm++){
          if(programData.data.courses[cm].courseId ==  this.allCourse[i]._id){
            this.allCourse[i].checked = true;
            this.courseChecked.push({courseId:this.allCourse[i]._id ,pCode:this.programCode});
            this.apiService.courseConsolidate(this.allCourse[i]._id).subscribe(courseConsolidate=>{
              console.log(courseConsolidate);
              for(let j = 0;j<courseConsolidate.module.length;j++){
                this.module.push({module:courseConsolidate.module[j],ccode:this.allCourse[i].code}); 
              }
            });
          }
        }
      }
    });

    let qInterval = setInterval(()=>{
      if(this.module.length > 0){
        for(let i = 0;i<this.module.length;i++){
          for(let j =0;j<this.moduleArr.length;j++){
            if(this.module[i].module._id == this.moduleArr[j].moduleId && this.module[i].ccode == this.moduleArr[j].cCode){
              this.module[i].module.checked = true;
              this.moduleChecked.push({moduleId:this.moduleArr[j].moduleId,cCode:this.moduleArr[j].cCode});
            }
          }
        }
        clearInterval(qInterval);
      }
    },1000);
  }
  getCourse(){
    this.apiService.allActiveCourse().subscribe(data=>{
      this.allCourse = data.data;
      this.courseSearched = this.allCourse;
    })
  }
  getIncrementalCode(){
    this.apiService.getIncrementalCodeProgram().subscribe(data=>{
      this.programCode = data.data.code;
    });
  }
  addCourse(id:string,code:any, event: any) {
    if(event.target.checked){
      this.courseChecked.push({courseId:id ,pCode:this.programCode});
      this.apiService.courseConsolidate(id).subscribe(data=>{
        console.log(data)
        if(data.module.length > 0){
          for(let i = 0;i<data.module.length;i++){
            this.module.push({module:data.module[i],ccode:code});   
            
          }
          this.moduleSearched = this.module;
        }
      });
    } else {
     this.courseChecked.forEach((element: any,index: any)=>{
      if(element.courseId==id) this.courseChecked.splice(index,1);  
      });
      this.apiService.courseConsolidate(id).subscribe(data=>{
        if(data.module.length > 0){
          for(let i = 0;i<data.module.length;i++){
            const foundIndex = this.module.findIndex((_id :any) =>  (_id.module._id === data.module[i]._id && _id.ccode === code));
            this.module = this.module.filter((_: any, index: any) => index !== foundIndex);
          }
          this.moduleSearched = this.module;
          console.log(this.module);
        }
      });
    }
  }

  addModule(id:string, code:any,event: any) {
    if(event.target.checked){
      this.moduleChecked.push({moduleId:id,cCode:code});
    } else {
     this.moduleChecked.forEach((element: any,index: any)=>{
      if(element.moduleId==id && element.cCode == code) this.moduleChecked.splice(index,1);

   });
   console.log(this.moduleChecked);
    }
  }


  uploadThumbnailFile(event:any){
    this.uploadfile= true;
    this.uploadfilename= event.target.files[0].name;
    let fileData:FormData = new FormData();
    fileData.append('file', event.target.files[0]);
    this.apiService.uploadFile(fileData).subscribe(data=>{
      if(data.status){
        this.thumbnailLink = data.data.url;
      }
    });
  }

  createProgram(){
    this.clearError();
    let link = "";

    if(this.programCode == "" || this.programCode == undefined || this.programCode == null){
      this.errorPresentToast("Module Code Not Generated");
      return;
    }

    if(this.programKeywords == ""){
      this.keywordsError = "has-error";
      this.keywordsChild.nativeElement.focus();
      return;
    }

    if(this.programTitle == ""){
      this.titleError = "has-error";
      this.titleChild.nativeElement.focus();
      return;
    }

    if(this.programDesc == ""){
      this.descriptionError = "has-error";
      this.descriptionChild.nativeElement.focus();
      return;
    }

    if(this.courseChecked.length == 0){
      this.courseError = "has-error";
      return;
    }


    if(this.moduleChecked.length == 0){
      this.moduleError = "has-error";
      return;
    }

    if(this.thumbnailLink == ""){
      this.thumbnailError = "has-error";
      this.thumbnailChild.nativeElement.focus();
      return;
    }

    this.apiService.createProgram(this.programCode,this.programTitle,this.programKeywords,this.programDesc,this.thumbnailLink,this.courseChecked,this.moduleChecked,this.expiryDate,0).subscribe(data=>{
      if(data.status){
          this.successPresentToast(data.message);
          this.clearForm();
      } else {
        this.errorPresentToast(data.message);
      }
    })
  }
  initializeItems(): void {
    this.allCourse = this.courseSearched;
  }
  initializeItems1(): void {
    this.module = this.moduleSearched;
  }
  getItems(ev: any) {
    this.initializeItems1();
    const val = ev.target.value;
    if (!val) {
      return;
    }
    this.allCourse = this.allCourse.filter((currentGoal:any) => {
      if (currentGoal.title && val) {
        if (currentGoal.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return true;
    });
  }
  back(){
    window.history.back();
  }
  clearError(){
    this.keywordsError = "";
    this.titleError = "";
    this.thumbnailError="";
    this.descriptionError = "";
  }

  moduleSearch(ev: any) {
    this.initializeItems1();
    const val = ev.target.value;
    if (!val) {
      return;
    }
    this.module = this.module.filter((currentGoal:any) => {
      console.log(currentGoal);
      if (currentGoal.module.title && val) {
        if (currentGoal.module.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return true;
    });
  }
  clearForm(){
    this.programCode = "";
    this.programKeywords = "";
    this.programTitle = "";
    this.programDesc = "";
    this.thumbnailLink="";
    this.uploadfile=false;
    this.uploadfilename="";
    this.courseChecked = [];
    this.module =[];
    this.expiryDate="";
    this.getIncrementalCode();
    this.getCourse();
    this.router.navigate(['/admin/program/list']);
  }

  editProgram(){
    this.clearError();

    if(this.programCode == "" || this.programCode == undefined || this.programCode == null){
      this.errorPresentToast("Module Code Not Generated");
      return;
    }

    if(this.programKeywords == ""){
      this.keywordsError = "has-error";
      return;
    }

    if(this.programTitle == ""){
      this.titleError = "has-error";
      return;
    }

    if(this.programDesc == ""){
      this.descriptionError = "has-error";
      return;
    }

    if(this.courseChecked.length == 0){
      this.courseError = "has-error";
      return;
    }


    if(this.moduleChecked.length == 0){
      this.moduleError = "has-error";
      return;
    }

    if(this.thumbnailLink == ""){
      this.thumbnailError = "has-error";
      return;
    }

    this.apiService.updateProgram(this.programCode,this.programTitle,this.programKeywords,this.programDesc,this.thumbnailLink,this.courseChecked,this.moduleChecked,this.expiryDate,1,this.programId).subscribe(data=>{
      if(data.status){
          this.successPresentToast(data.message);
          this.clearForm();
      } else {
        this.errorPresentToast(data.message);
      }
    })
  }


}
