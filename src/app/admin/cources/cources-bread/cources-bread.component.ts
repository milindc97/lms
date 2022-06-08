import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cources-bread',
  templateUrl: './cources-bread.component.html',
  styleUrls: ['./cources-bread.component.scss']
})
export class CourcesBreadComponent implements OnInit {
  @ViewChild('keywordsChild') keywordsChild!: ElementRef;
  @ViewChild('titleChild') titleChild!: ElementRef;
  @ViewChild('descriptionChild') descriptionChild!: ElementRef;
  @ViewChild('thumbnailChild') thumbnailChild!: ElementRef;
  
  public allModule:any=[];
  courseCode="";
  courseKeywords="";
  courseTitle="";
  expiryDate:any;
  questionBank:any=[];
  quizAr:any =[];
  courseDesc="";
  keywordsError = "";
  titleError = "";
  thumbnailError="";
  moduleError="";
  thumbnailLink="";
  uploadfilename="";
  descriptionError = "";
  baseURL = environment.baseURL;
  public moduleChecked:any=[];
  public qbChecked:any=[];
  moduleSearched=[];
  qBSearched=[];
  uploadfile:boolean=false;
  edit:boolean=false;
  courseId="";
  constructor(private title: Title,public apiService:AdminapiService,public toastController:ToastController,public route:ActivatedRoute,public authService:AuthService,public router:Router,
    public datepipe:DatePipe) {
    this.title.setTitle("Courses - "+environment.companyName);
   }

  ngOnInit(): void {
      this.getModule();
      this.route.params.subscribe(data=>{
        if(data.action == "create"){
          this.edit = false;
          this.getIncrementalCode();
        }else{
          this.edit = true;
          this.route.queryParams.subscribe(data=>{
            this.courseId = data.id;
            let couInterval = setInterval(()=>{
              if(this.allModule.length > 0){
                this.getCourseById(data.id);
                clearInterval(couInterval);
              }
                
            },500);
          })
        }
      })
  }
  getModule(){
    this.apiService.allActiveModules().subscribe(data=>{
      console.log(data.data);
      this.allModule = data.data;
      this.moduleSearched = this.allModule;
    })
  }
  getIncrementalCode(){
    this.apiService.getIncrementalCodeCourses().subscribe(data=>{
      this.courseCode = data.data.code;

    });
  }

  getCourseById(id:any){
    this.apiService.singleCourse(id).subscribe(courseData=>{
      console.log(courseData.data);
      this.courseCode = courseData.data.code;
      this.courseKeywords = courseData.data.keywords;
      this.courseTitle = courseData.data.title;
      this.courseDesc = courseData.data.description;
      this.thumbnailLink = courseData.data.thumbnail;
      this.quizAr = courseData.data.quiz;
      this.expiryDate = this.datepipe.transform(courseData.data.expiryDate, 'yyyy-MM-dd');
      for(let i = 0;i<this.allModule.length;i++){
        for(let cm =0;cm<courseData.data.modules.length;cm++){
          if(courseData.data.modules[cm].moduleId ==  this.allModule[i]._id){
            this.allModule[i].checked = true;
            this.moduleChecked.push({moduleId:this.allModule[i]._id ,cCode:this.courseCode});
            console.log(this.allModule[i]);
            for(let ab=0;ab<this.allModule[i].quizData.length;ab++){
              this.allModule[i].quizData[ab].mcode = this.allModule[i].code;
              this.questionBank.push(this.allModule[i].quizData[ab]);
            }
            this.qBSearched = this.questionBank;
            // this.apiService.moduleConsolidate(this.allModule[i]._id).subscribe(moduleConsolidateData=>{

            //   for(let j = 0;j<moduleConsolidateData.questionBank.length;j++){
            //     this.questionBank.push({qB:moduleConsolidateData.questionBank[j],mcode:this.allModule[i].code}); 
            //   }
            // });
          }
          
        }
      }
    });

    // let qInterval = setInterval(()=>{
    //   if(this.questionBank.length > 0){
    //     for(let i = 0;i<this.questionBank.length;i++){
    //       for(let j =0;j<this.quizAr.length;j++){
    //         if(this.questionBank[i].qB._id == this.quizAr[j].quizId && this.questionBank[i].mcode == this.quizAr[j].mCode){
    //           this.questionBank[i].qB.checked = true;
    //           this.qbChecked.push({quizId:this.quizAr[j].quizId,mCode:this.quizAr[j].mCode});
    //         }
    //       }
    //     }
    //     clearInterval(qInterval);
    //   }
    // },500);
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

  chooseModule(id:string,code:any, event: any,index:any) {
    if(event.target.checked){
      this.moduleChecked.push({moduleId:id,cCode:this.courseCode});
      for(let i=0;i<this.allModule[index].quizData.length;i++){
        this.allModule[index].quizData[i].mcode = code;
        this.questionBank.push(this.allModule[index].quizData[i]);
      }
      this.qBSearched = this.questionBank;
    } else {
      this.moduleChecked.forEach((element: any,index: any)=>{
        if(element.moduleId==id) this.moduleChecked.splice(index,1);
        
     });
     for(let i=0;i<this.allModule[index].quizData.length;i++){
        const foundIndex = this.questionBank.findIndex((_id :any) =>  (_id._id === this.allModule[index].quizData[i]._id && _id.mcode === code));
        this.questionBank = this.questionBank.filter((_: any, index: any) => index !== foundIndex);
    }
    this.qBSearched = this.questionBank;

        
    }
  }

  chooseQuestioBank(id:string,code:any, event: any) {
    
    if(event.target.checked){
      this.qbChecked.push({quizId:id,mCode:code});

    } else {
      this.qbChecked.forEach((element: any,index: any)=>{
        if(element.quizId==id && element.mCode == code) this.qbChecked.splice(index,1);

     });
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

  createCourse(){
    this.clearError();

    if(this.courseCode == "" || this.courseCode == undefined || this.courseCode == null){
      this.errorPresentToast("Module Code Not Generated");
      return;
    }

    if(this.courseKeywords == ""){
      this.keywordsError = "has-error";
      this.keywordsChild.nativeElement.focus();
      return;
    }

    if(this.courseTitle == ""){
      this.titleError = "has-error";
      this.titleChild.nativeElement.focus();
      return;
    }

    if(this.courseDesc == ""){
      this.descriptionError = "has-error";
      this.descriptionChild.nativeElement.focus();
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

    this.apiService.createCourse(this.courseCode,this.courseTitle,this.courseKeywords,this.courseDesc,this.thumbnailLink,this.moduleChecked,this.expiryDate,0).subscribe(data=>{

      if(data.status){
          this.successPresentToast(data.message);
          this.clearForm();
      } else {
        this.errorPresentToast(data.message);
      }
    })
  }
  initializeItems(): void {
    this.allModule = this.moduleSearched;
  }
  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (!val) {
      return;
    }
    this.allModule = this.allModule.filter((currentGoal:any) => {
      if (currentGoal.title && val) {
        if (currentGoal.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return true;
    });
  }
  initializeItems1(): void {
    this.questionBank = this.qBSearched;
  }
  qBSearch(ev: any) {
    this.initializeItems1();
    const val = ev.target.value;
    if (!val) {
      return;
    }
    this.questionBank = this.questionBank.filter((currentGoal:any) => {
      console.log(currentGoal);
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
    this.descriptionError = "";
    this.thumbnailError="";
  }

  clearForm(){
    this.courseCode = "";
    this.courseKeywords = "";
    this.courseTitle = "";
    this.courseDesc = "";
    this.thumbnailLink="";
    this.uploadfilename="";
    this.expiryDate="";
    this.uploadfile=false;
    this.moduleChecked = [];
    this.questionBank =[];
    this.getIncrementalCode();
    this.getModule();
    this.router.navigate(['/admin/courses/list']);

  }
  editCourse(){
    this.clearError();

    if(this.courseCode == "" || this.courseCode == undefined || this.courseCode == null){
      this.errorPresentToast("Module Code Not Generated");
      return;
    }

    if(this.courseKeywords == ""){
      this.keywordsError = "has-error";
      return;
    }

    if(this.courseTitle == ""){
      this.titleError = "has-error";
      return;
    }

    if(this.courseDesc == ""){
      this.descriptionError = "has-error";
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

    this.apiService.updateCourse(this.courseCode,this.courseTitle,this.courseKeywords,this.courseDesc,this.thumbnailLink,this.moduleChecked,this.expiryDate,1,this.courseId).subscribe(data=>{

      if(data.status){
          this.successPresentToast(data.message);
          this.clearForm();
      } else {
        this.errorPresentToast(data.message);
      }
    })
  }


}
