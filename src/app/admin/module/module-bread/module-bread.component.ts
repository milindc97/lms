import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-module-bread',
  templateUrl: './module-bread.component.html',
  styleUrls: ['./module-bread.component.scss']
})
export class ModuleBreadComponent implements OnInit {
  @ViewChild('keywordsChild') keywordsChild!: ElementRef;
  @ViewChild('titleChild') titleChild!: ElementRef;
  @ViewChild('descriptionChild') descriptionChild!: ElementRef;
  @ViewChild('thumbnailChild') thumbnailChild!: ElementRef;
  @ViewChild('youtubeLinkChild') youtubeLinkChild!: ElementRef;
  @ViewChild('documentFileChild') documentFileChild!: ElementRef;
  @ViewChild('rewardChild') rewardChild!: ElementRef;

  qbData:any = [];
  questions:any = [];
  expiryDate:any;
  moduleCode = "";
  keywords = "";
  moduleTitle = "";
  description = "";
  youtubeLink = "";
  documentFile = "";
  moduleWatchTime=0;
  thumbnailLink = "";
  reward=0;
  keywordsError = "";
  titleError = "";
  descriptionError = "";
  youtubeLinkError = "";
  documentFileError="";
  moduleWatchTimeError="";
  quizError="";
  rewardError="";
  thumbnailLinkError="";
  documentError="";
  quizArray:any=[];
  uploadThumbnailName="";
  uploadThumbnail:boolean=false;
  uploadDocumentName="";
  uploadDocument:boolean=false;
  conType = "video";
  qBSearched:any=[];
  qBSearched1:any=[];
  baseURL = environment.baseURL;
  edit:boolean=false;
  documentspdf:any=[];
  documents:any=[];
  youtubes:any=[];
  documentLink="";
  moduleId="";
  constructor(private title: Title,public api: AdminapiService,public toastController:ToastController,public route:ActivatedRoute,public authService:AuthService,public sanitizer:DomSanitizer,public router:Router,
    public datepipe:DatePipe) {
    this.title.setTitle("Modules - "+environment.companyName);
   }
  
  // TODO: [FM-3] Back Button for All BREAD

  ngOnInit(): void {
    this.getQuestionBank();
    this.route.params.subscribe(data=>{
      if(data.action == "create"){
        this.edit = false;
        this.getIncrementalCode();
      }else{
        this.edit = true;
        this.route.queryParams.subscribe(data=>{
          this.moduleId = data.id;
          this.getModuleById(data.id);
          let modInterval = setInterval(()=>{
            if(this.qbData.length > 0){
              this.getModuleById(data.id);
              clearInterval(modInterval);
            }
          },500);
        })
      }
    })
    
  }
  cleanURL(link:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  getQuestionBank(){
    this.qbData = [];
    this.api.getAllActiveQuestionBank().subscribe(data=>{
      this.qbData = data.data;
      this.qBSearched = this.qbData;
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

  getModuleById(id:any){
    this.api.singleModule(id).subscribe(data=>{
      this.moduleCode = data.data.code;
      this.keywords = data.data.keywords;
      this.moduleTitle = data.data.title;
      this.description = data.data.description;
      this.moduleWatchTime = data.data.moduleWatchTime;
      this.reward = data.data.rewardPoints;
      this.expiryDate = this.datepipe.transform(data.data.expiryDate, 'yyyy-MM-dd');
      this.documentspdf = data.data.documents;
      this.documents = data.data.mdocuments;
      this.youtubes = data.data.youtubes;
      // this.youtubeLink = data.data.youtubeUrl.slice(30);
      this.thumbnailLink = data.data.thumbnail;
      data.data.quiz.filter((currentGoal:any) => {
        for(let i = 0;i<this.qbData.length;i++){
          if(currentGoal.quizId ==  this.qbData[i]._id){
            this.qbData[i].checked = true;
            this.quizArray.push({quizId:this.qbData[i]._id});
            this.api.getAllQuestion(currentGoal.quizId).subscribe(data=>{
              if(data.data.length > 0){
                for(let i = 0;i<data.data.length;i++){
                  this.questions.push(data.data[i]);
                }
              }
            });
          }
        }
        console.log(this.quizArray);

      });
    });
  }


  

  clickUploadDoc(){
    document.getElementById('exampleFileDoc')?.click();
  }

  getIncrementalCode(){
    this.api.getIncrementalCodeModule().subscribe(data=>{
      this.moduleCode = data.data.code;
    });
  }
  initializeItems(): void {
    this.qbData = this.qBSearched;
  }
  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (!val) {
      return;
    }
    this.qbData = this.qbData.filter((currentGoal:any) => {
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
    this.questions = this.qBSearched1;
  }
  qBSearch(ev: any) {
    this.initializeItems1();
    const val = ev.target.value;
    if (!val) {
      return;
    }
    this.questions = this.questions.filter((currentGoal:any) => {
      if (currentGoal.question && val) {
        if (currentGoal.question.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return true;
    });
  }

  createModule(){
    this.clearError();
    let link = "";

    if(this.moduleCode == "" || this.moduleCode == undefined || this.moduleCode == null){
      this.errorPresentToast("Module Code Not Generated");
      return;
    }

    if(this.keywords == ""){
      this.keywordsError = "has-error";
      this.keywordsChild.nativeElement.focus();
      return;
    }

    if(this.moduleTitle == ""){
      this.titleError = "has-error";
      this.titleChild.nativeElement.focus();
      return;
    }

    if(this.reward == 0){
      this.rewardError = "has-error";
      this.rewardChild.nativeElement.focus();
      return;
    }

    if(this.description == ""){
      this.descriptionError = "has-error";
      this.descriptionChild.nativeElement.focus();
      return;
    }

    // if(this.youtubeLink == ""){
    //   this.youtubeLinkError = "has-error";
    //   this.youtubeLinkChild.nativeElement.focus();
    //   return
    // }


    if(this.documentspdf.length == 0 && this.documentspdf.length >= 6){
      this.documentFileError = "has-error";
      this.documentFileChild.nativeElement.focus();
      return
    }


    if(this.quizArray.length == 0){
      this.quizError = "has-error";
      return
    }


    if(this.thumbnailLink == ""){
      this.thumbnailLinkError = "has-error";
      this.thumbnailChild.nativeElement.focus();
      return
    }

    if(this.moduleWatchTime == 0 ){
      this.thumbnailLinkError = "has-error";
      return;
    }
    // TODO: [FM-4] Make Sure Status must be active by Default
    this.api.createModule(this.moduleCode,this.moduleTitle,this.keywords,this.description,this.youtubes,this.documentspdf,this.thumbnailLink,this.quizArray,this.reward,this.expiryDate,this.moduleWatchTime,0).subscribe(result=>{
      if(result.status){
          this.successPresentToast(result.message);
          this.clearForm();
      } else {
        this.errorPresentToast(result.message);
      }
    });

  }

  addYoutubeLink(){
    if(this.youtubeLink != ""){
      this.youtubes.push({path:"https://www.youtube.com/embed/"+this.youtubeLink,id:this.youtubes.length +1,type:'YoutubeLink'});
      this.youtubeLink="";
    }else{
      this.errorPresentToast("Please enter the link");
    }
  }

  back(){
    window.history.back();
  }
  
  clearError(){
    this.keywordsError = "";
    this.titleError = "";
    this.descriptionError = "";
    this.youtubeLinkError = "";
    this.documentFileError = "";
    this.thumbnailLinkError = "";
    this.rewardError="";
    this.moduleWatchTimeError="";
  }

  clearForm(){
    this.moduleCode = "";
    this.keywords = "";
    this.moduleTitle = "";
    this.description = "";
    this.youtubeLink= "";
    this.reward=0;
    this.youtubes=[]
    this.moduleWatchTime =0;
    this.expiryDate="";
    this.documentspdf=[];
    this.uploadThumbnail = false;
    this.uploadThumbnailName="";
    this.uploadDocument = false;
    this.uploadDocumentName ="";
    this.documentFile ="";
    this.quizArray = [];
    this.questions =[];
    this.getIncrementalCode();
    this.getQuestionBank();
    this.router.navigate(['/admin/module/list']);
  }

  addQuestion(event:any,id:string){
    if(event.target.checked){
      this.quizArray.push({quizId:id});
        for (var i = 0; i < this.qbData.length; i++) {
          if (this.qbData[i]._id != id) {
              this.qbData[i].checked = false;
                this.quizArray.forEach((element: any,index: any)=>{
                    if(element.quizId==this.qbData[i]._id) this.quizArray.splice(index,1);
                 });
                this.api.getAllQuestion(this.qbData[i]._id).subscribe(data=>{
                  if(data.data.length > 0){
                    for(let i = 0;i<data.data.length;i++){
                      const foundIndex = this.questions.findIndex(({ _id }:any) => _id === data.data[i]._id);
                      this.questions = this.questions.filter((_: any, index: any) => index !== foundIndex);
                    }
                    this.qBSearched1 = this.questions;
                    
                  }
              });
            }
      }
      this.api.getAllQuestion(id).subscribe(data=>{
      
        if(data.data.length > 0){
          for(let i = 0;i<data.data.length;i++){
            this.questions.push(data.data[i]);
          }
          this.qBSearched1 = this.questions;
        }
      });
    } else{
      this.quizArray.forEach((element: any,index: any)=>{
            if(element.quizId==id) this.quizArray.splice(index,1);
         });
         this.api.getAllQuestion(id).subscribe(data=>{
        if(data.data.length > 0){
          for(let i = 0;i<data.data.length;i++){
            const foundIndex = this.questions.findIndex(({ _id }:any) => _id === data.data[i]._id);
            this.questions = this.questions.filter((_: any, index: any) => index !== foundIndex);
          }
          this.qBSearched1 = this.questions;
          
        }
      });
    }
  }


  getDocuments(event:any){
    if(event.keyCode == 13){
      if(this.documentLink != ""){
        this.documents.push({path:this.documentLink,id:this.documents.length +1,type:'Other'});
        this.documentLink="";
      }else{
        this.errorPresentToast("Please enter the link");
      }
     
    }
  }

  addDocument(){
    if(this.documentLink != ""){
      this.documents.push({path:this.documentLink,id:this.documents.length +1,type:'Other'});
      this.documentLink="";
    }else{
      this.errorPresentToast("Please enter the link");
    }
  }

  uploadDocumentFile(event:any){
    let file = event.target.files;
    this.uploadDocument= true;
    for(let i=0;i<file.length;i++){
    this.uploadDocumentName= file[i].name;
    
      let fileData:FormData = new FormData();
      fileData.append('file', file[i]);
      console.log(file[i]);
      this.api.uploadFile(fileData).subscribe(data=>{
        if(data.status){
          this.documentspdf.push({path:data.data.url,id:i,type:file[i].type});
        }
      });
    }
  }

  uploadThumbnailFile(event:any){
    this.uploadThumbnail= true;
    this.uploadThumbnailName= event.target.files[0].name;
    var reader = new FileReader();
    reader.onload =  (e:any)=> {
        $('#thum').attr('src', e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    let fileData:FormData = new FormData();
    fileData.append('file', event.target.files[0]);
    this.api.uploadFile(fileData).subscribe(data=>{
      if(data.status){
        this.thumbnailLink = data.data.url;
      }
    });
  }

  changeContent(value:any){
    if(value == "video")
    {
      $('.video').removeClass("display-no");
      $('.video').addClass("display");
      $('.document').removeClass("display");
      $('.document').addClass("display-no");
    }
    if(value == "document"){
      $('.document').removeClass("display-no");
      $('.video').addClass("display-no");
      $('.video').removeClass("display");
      $('.document').addClass("display");
    }
  }
  contentType(event:any){
    this.conType = event.target.value;
    this.changeContent(event.target.value);
   
  }


  editModule(){
    this.clearError();
    let link = "";

    if(this.moduleCode == "" || this.moduleCode == undefined || this.moduleCode == null){
      this.errorPresentToast("Module Code Not Generated");
      return;
    }

    if(this.keywords == ""){
      this.keywordsError = "has-error";
      return;
    }

    if(this.moduleTitle == ""){
      this.titleError = "has-error";
      return;
    }

    if(this.reward == 0){
      this.rewardError = "has-error";
      return;
    }

    if(this.description == ""){
      this.descriptionError = "has-error";
      return;
    }

    if(this.documentspdf.length == 0 && this.documentspdf.length  >= 6){
      this.documentFileError = "has-error";
      return
    }


    if(this.quizArray.length == 0){
      this.quizError = "has-error";
      return
    }


    if(this.thumbnailLink == ""){
      this.thumbnailLinkError = "has-error";
      return
    }

    if(this.moduleWatchTime == 0){
      this.moduleWatchTimeError = "has-error";
      return
    }

    this.api.updateModule(this.moduleCode,this.moduleTitle,this.keywords,this.description,this.youtubes,this.documentspdf,this.thumbnailLink,this.quizArray,1,this.reward,this.expiryDate,this.moduleWatchTime,this.moduleId).subscribe(result=>{
      if(result.status){
          this.successPresentToast(result.message);
          this.clearForm();
      } else {
        this.errorPresentToast(result.message);
      }
    });
    // TODO: [FM-5] Edit Functioning for All BREAD
  }

  //TODO: [FM-6] On Urgent "Add Work in progress" on edit button 
  
  deleteDocument(index:any){
    this.documentspdf.splice(index, 1);
  }

  deleteDocuments(index:any){
    this.documents.splice(index, 1);
  }
  
}
