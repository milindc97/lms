import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jqeury from 'jquery';
import { Editor, Toolbar } from 'ngx-editor';
import { CSVRecord } from 'src/app/_models/CSVModel';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
//import * as XLSX from 'ts-xlsx';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-quiz-bread',
  templateUrl: './quiz-bread.component.html',
  styleUrls: ['./quiz-bread.component.scss']
})
export class QuizBreadComponent implements OnInit, OnDestroy {
  @ViewChild('keywordsChild') keywordsChild!: ElementRef;
  @ViewChild('titleChild') titleChild!: ElementRef;
  @ViewChild('descriptionChild') descriptionChild!: ElementRef;
  @ViewChild('thumbnailChild') thumbnailChild!: ElementRef;
  @ViewChild('questionsCountChild') questionsCountChild!: ElementRef;
  @ViewChild('quizTimeChild') quizTimeChild!: ElementRef;
  @ViewChild('table1') table: any;
  dataTable:any;
  questionEditor!: Editor;
  optionAEditor!: Editor;
  optionBEditor!: Editor;
  optionCEditor!: Editor;
  optionDEditor!: Editor;
  add:boolean=false;
  baseURL = environment.baseURL;
  question= '';
  optionA= '';
  optionB= '';
  optionC= '';
  optionD= '';
  expiryDate:any;
  answer= '';

  arrayBuffer:any=[];
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['text_color', 'background_color'],
  ];
  
  rowIdxaddBtnQuestion = 0;
  questionBankCode = "";
  keywords = "";
  quizTitle = "";
  questionsCount=0;
  quizTime=0;
  description = "";
  uploadfilename="";
  uploadthumbnailname="";
  uploadthumbnail:boolean= false;
  selectfiles:any;
  keywordsError = "";
  titleError = "";
  descriptionError = "";
  questionsCountError = "";
  answerError = "";
  thumbnailError="";
  quizTimeError="";
  questionError="";
  uploadfile:boolean= false;
  edit:boolean=false;
  update:boolean=false;
  qbId="";
  questionId="";
  targetFiles:any;
  questions:any=[];
  thumbnailLink="";
  public records:any= [];  
  @ViewChild('csvReader') csvReader: any;  
  constructor(private titl: Title,public api: AdminapiService, public toastController: ToastController,public route:ActivatedRoute,public router:Router,public authService:AuthService,
    public datepipe:DatePipe) {
    this.titl.setTitle("Quiz - "+environment.companyName);
   }

  ngOnInit(): void {
    this.questionEditor = new Editor();
    this.optionAEditor = new Editor();
    this.optionBEditor = new Editor();
    this.optionCEditor = new Editor();
    this.optionDEditor = new Editor();


    this.route.params.subscribe(data=>{
      if(data.action == "create"){
        this.edit = false;
        this.getIncrementalCode();
      }else{
        this.edit = true;
        this.route.queryParams.subscribe(data=>{
          this.qbId = data.id;
          this.getQbById(data.id);
          this.getAllQuestionById();
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.questionEditor.destroy();
    this.optionAEditor.destroy();
    this.optionBEditor.destroy();
    this.optionCEditor.destroy();
    this.optionDEditor.destroy();
  }

  addQ(){
    this.add=true;
  }
  getQbById(id:any){
    this.api.getSingleQuestionBank(id).subscribe(data=>{
      console.log(data.data);
      this.questionBankCode = data.data.code;
      this.keywords = data.data.keywords;
      this.quizTitle = data.data.title;
      this.description = data.data.description;
      this.quizTime = data.data.quizTime;
      this.thumbnailLink = data.data.thumbnail;
      this.expiryDate = this.datepipe.transform(data.data.expiryDate, 'yyyy-MM-dd');
      
      this.questionsCount = data.data.questionsCount;
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

  getIncrementalCode(){
    this.api.getIncrementalCodeQuestionBank().subscribe(data=>{
      this.questionBankCode = data.data.code;
    });
  }
  getAllQuestionById(){
    this.questions=[];
    this.api.getAllQuestion(this.qbId).subscribe(data=>{
      
      this.questions = data.data;
      setTimeout(() =>{
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable();
      },1000);
    })
  }

  uploadThumbnailFile(event:any){
    this.uploadthumbnail= true;
    this.uploadthumbnailname= event.target.files[0].name;
    let fileData:FormData = new FormData();
    fileData.append('file', event.target.files[0]);
    this.api.uploadFile(fileData).subscribe(data=>{
      if(data.status){
        this.thumbnailLink = data.data.url;
      }
    });
  }

  checkQuiz(index:any){
    this.questions[index].checked = true;
  }


  createQuestionBank(needEdit:boolean){
    this.clearError();
    if(this.questionBankCode == "" || this.questionBankCode == undefined || this.questionBankCode == null){
      this.errorPresentToast("Question Bank Code Not Generated");
      return;
    }
    if(this.quizTitle == ""){
      this.titleError = "has-error";
      this.titleChild.nativeElement.focus();
      return;
    }

    if(this.keywords == ""){
      this.keywordsError = "has-error";
      this.keywordsChild.nativeElement.focus();
      return;
    }

    if(this.thumbnailLink == ""){
      this.thumbnailError = "has-error";
      this.thumbnailChild.nativeElement.focus();
      return;
    }


    if(this.questionsCount == 0){
      this.questionsCountError = "has-error";
      this.questionsCountChild.nativeElement.focus();
      return;
    }

    if(this.quizTime == 0){
      this.quizTimeError = "has-error";
      this.quizTimeChild.nativeElement.focus();
      return;
    }

    if(this.description == ""){
      this.descriptionError = "has-error";
      this.descriptionChild.nativeElement.focus();
      return;
    }


    this.api.createQuestioBank(this.questionBankCode,this.quizTitle,this.keywords,this.description,this.questionsCount,this.quizTime,this.expiryDate,this.thumbnailLink,0).subscribe(result=>{
      console.log(result);
      if(result.status){
        this.successPresentToast(result.message);
        this.clearForm();
        if(needEdit){
          this.router.navigate(["/admin/quiz/activity/edit"],{queryParams:{id:result.data._id}});
        }
      }else{
        this.errorPresentToast(result.message);
      }
    });

  }

  updateQuestionBank(){
    this.clearError();
    if(this.questionBankCode == "" || this.questionBankCode == undefined || this.questionBankCode == null){
      this.errorPresentToast("Question Bank Code Not Generated");
      return;
    }

    if(this.quizTitle == ""){
      this.titleError = "has-error";
      return;
    }


    if(this.keywords == ""){
      this.keywordsError = "has-error";
      return;
    }

    if(this.thumbnailLink == ""){
      this.thumbnailError = "has-error";
      this.thumbnailChild.nativeElement.focus();
      return;
    }

    if(this.questionsCount == 0){
      this.questionsCountError = "has-error";
      this.questionsCountChild.nativeElement.focus();
      return;
    }

    if(this.quizTime == 0){
      this.quizTimeError = "has-error";
      this.quizTimeChild.nativeElement.focus();
      return;
    }

    if(this.description == ""){
      this.descriptionError = "has-error";
      return;
    }
    console.log(this.thumbnailLink);

    this.api.updateQuestioBank(this.quizTitle,this.keywords,this.description,this.questionsCount,this.quizTime,this.expiryDate,this.thumbnailLink,1,this.qbId).subscribe(result=>{
      console.log(result);
      if(result.status){
        this.successPresentToast(result.message);
        this.clearForm();
      }else{
        this.errorPresentToast(result.message);
      }
    });

  }

  contentType(event:any){
    console.log(event.target.value);
    this.answer = event.target.value;
  }

  addQuestion(){
    this.clearQuestionError();
    if(this.question == ""){
      this.questionError = "has-error";
      return;
    }
    if(this.answer == ""){
      this.answerError = "has-error";
      return;
    }
    console.log(this.answer);
    this.api.createQuestion(this.qbId,this.question,this.optionA,this.optionB,this.optionC,this.optionD,this.answer).subscribe(result=>{
      console.log(result);
      if(result.status){
        this.successPresentToast(result.message);
        this.clearQuestionForm();
      }else{
        this.errorPresentToast(result.message);
      }
    });
  }

  editQuestionById(){
    this.clearQuestionError();
    if(this.question == ""){
      this.questionError = "has-error";
      return;
    }
    if(this.answer == ""){
      this.answerError = "has-error";
      return;
    }
    console.log(this.answer);
    this.api.updateQuestion(this.qbId,this.question,this.optionA,this.optionB,this.optionC,this.optionD,this.answer,this.questionId).subscribe(result=>{
      if(result.status){
        this.successPresentToast(result.message);
        this.clearQuestionForm();
        this.getAllQuestionById();
      }else{
        this.errorPresentToast(result.message);
      }
    });
  }

  deleteQuestions(){
    for(let emp = 0; emp < this.questions.length; emp++){
      if(this.questions[emp].checked == true){
        this.api.deleteQuestion(this.questions[emp]._id).subscribe(()=>{
        })
      }
    }
    setTimeout(() => {
      this.getAllQuestionById();
    }, 300);
  }

  editQuestion(id:any){
    this.add=true;
    this.update = true;
    this.api.singleQuestion(id).subscribe(data=>{
      this.questionId=id;
      this.question = data.data.question;
      this.optionA = data.data.optionA;
      this.optionB = data.data.optionB;
      this.optionC = data.data.optionC;
      this.optionD = data.data.optionD;
      this.answer = data.data.answer;
      if(this.answer == "A"){
        jqeury("input[id=A][value=A]").prop('checked', true);
      }else if(this.answer == "B"){
        jqeury("input[id=B][value=B]").prop('checked', true);
      }else if(this.answer == "C"){
        jqeury("input[id=C][value=C]").prop('checked', true);
      }else{
        jqeury("input[id=D][value=D]").prop('checked', true);
      }

    })
  }

  close(){
    this.add=false;
    this.clearQuestionForm();
  }

  back(){
    this.router.navigate(['/admin/quiz/list']);
  }

  clearError(){
    this.keywordsError = "";
    this.titleError = "";
    this.descriptionError = "";
  }

  clearForm(){
    this.questionBankCode = "";
    this.keywords = "";
    this.expiryDate="";
    this.quizTitle = "";
    this.description = "";
    this.getIncrementalCode();
    jqeury('#tbodyAddQuestion').empty();
    this.rowIdxaddBtnQuestion = 0;
    this.router.navigate(['/admin/quiz/list']);
  }

  clearQuestionForm(){
    this.question="";
    this.optionA="";
    this.optionB="";
    this.optionC="";
    this.optionD="";
    this.questionId="";
    this.answer="";
    this.getAllQuestionById();
  }


  clearQuestionError(){
    this.answerError="";
    this.questionError="";

  }

  selectImportFile(event:any){
    console.log(event);
    this.uploadfile= true;
    this.uploadfilename= event.target.files[0].name;
    this.selectfiles = event.srcElement.files;
    this.targetFiles=event.target;
  }

  allQuestionSelection(event:any){
    if(event.target.checked){
      for(let emp = 0; emp < this.questions.length; emp++){
          this.questions[emp].checked = true;
      }
    }else{
      for(let emp = 0; emp < this.questions.length; emp++){
        this.questions[emp].checked = false;
    }
    }
  }

  importFile(files:any,targetFiles:any){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        // var workbook = XLSX.read(bstr, {type:"binary"});
        // var first_sheet_name = workbook.SheetNames[0];
        // let worksheet = workbook.Sheets[first_sheet_name];
        
        // this.records =  XLSX.utils.sheet_to_json(worksheet,{raw:true});
        for(let i=0;i<this.records.length;i++){
          this.records[i].questionBankId = this.qbId;
        }
    }
    
    fileReader.readAsArrayBuffer(targetFiles.files[0]);
    setTimeout(() => {
      if(this.records.length > 0){
        this.api.createBulkQuestion(this.records).subscribe(res=>{
          if(res.status){
            this.successPresentToast(res.message);
            this.uploadfile=false;
            this.uploadfilename="";
            this.clearQuestionForm();
          } else {
            this.errorPresentToast(res.message);
          }
        });
      } else {
        this.errorPresentToast("CSV contains 0 data.");
      }
    }, 300);
    
    // if (this.isValidCSVFile(files[0])) {  
  
    //   let input = targetFiles;  
    //   let reader = new FileReader();  
    //   reader.readAsText(input.files[0]);  
    //   console.log(reader);
    //   reader.onload = () => {  
    //     let csvData = reader.result;  
    //     let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
    //     let headersRow = this.getHeaderArray(csvRecordsArray);  
  
    //     this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length); 
    //     console.log(this.records); 
    //     if(this.records.length > 0){
    //       this.api.createBulkQuestion(this.records).subscribe(res=>{
    //         if(res.status){
    //           this.successPresentToast(res.message);
    //           this.uploadfile=false;
    //           this.uploadfilename="";
    //           this.clearQuestionForm();
    //         } else {
    //           this.errorPresentToast(res.message);
    //         }
    //       });
    //     } else {
    //       this.errorPresentToast("CSV contains 0 data.");
    //     }
    //   };  
      
  
    //   reader.onerror = function () {  
    //     console.log('error is occured while reading file!');  
    //   };  
  
    // } else {  
    //   this.errorPresentToast("Please import valid .csv file.");
    //   this.fileReset();  
    // }  
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.questionBankId = this.qbId;  
        csvRecord.question = curruntRecord[0].trim();  
        csvRecord.optionA = curruntRecord[1].trim();  
        csvRecord.optionB = curruntRecord[2].trim();  
        csvRecord.optionC = curruntRecord[3].trim();  
        csvRecord.optionD = curruntRecord[4].trim();  
        csvRecord.answer = curruntRecord[5].trim(); 
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }  

  //TODO: [FM-2] Question Bank Code Duplication Validation Needed in API. Code Must not duplicate

}
