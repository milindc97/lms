import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-program-allocation',
  templateUrl: './program-allocation.component.html',
  styleUrls: ['./program-allocation.component.scss']
})
export class ProgramAllocationComponent implements OnInit {
  employeeSearch: FormControl = new FormControl();
  programSearch: FormControl = new FormControl();
  courseSearch: FormControl = new FormControl();
  moduleSearch: FormControl = new FormControl();
  quizSearch: FormControl = new FormControl();
  employeesData:any=[];
  employeesCheckData:any=[];
  emp:any=[];
  programsData:any=[];
  coursesData:any=[];
  modulesData:any=[];
  quizsData:any=[];
  program:any=[];
  course:any=[];
  module:any=[];
  quiz:any=[];
  assignedProgram:any=[];
  programsCheckData:any=[];
  coursesCheckData:any=[];
  modulesCheckData:any=[];
  quizsCheckData:any=[];
  showProgram:any=[];
  showCourse:any=[];
  showModule:any=[];
  showQuiz:any=[];
  effectiveDateProgram = "";
  effectiveDateCourse = "";
  effectiveDateModule = "";
  effectiveDateQuiz = "";

  effectiveDateProgramError = "";
  effectiveDateCourseError = "";
  effectiveDateModuleError = "";
  effectiveDateQuizError = "";

  totalEmp=0;
  assEmp=0;
  deacEmp=0;
  pendingEmp=0;
  selection="multiple";
  constructor(public api:AdminapiService,public toastController:ToastController, private title: Title) {
    this.title.setTitle("Allocation - "+environment.companyName);
   }

  ngOnInit(): void {
    this.getData();
    this.employeeSearch.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.employeeFilter(value);
    });
    this.programSearch.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.programFilter(value);
    });
    this.courseSearch.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.courseFilter(value);
    });
    this.moduleSearch.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.moduleFilter(value);
    });
    this.quizSearch.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.quizFilter(value);
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
    this.employeesData = [];
    this.programsData=[];
    this.coursesData=[];
    this.modulesData=[];
    this.quizsData=[];
    this.api.getAllUsers().subscribe(data=>{
      this.employeesData = data.data;
      this.emp = this.employeesData;
    });
    this.api.getTotalEmployeesCount().subscribe(data=>{
      this.totalEmp =  data.totalEmp;
      this.assEmp = data.assignedEmp;
      this.pendingEmp = data.pendingEmp;
      this.deacEmp = data.deactiveEmp;
    });
    this.api.allActiveProgram().subscribe(data=>{
      // this.programsData= data.data;
      // this.program = this.programsData;
      console.log(data.data);
      
      for(let i = 0; i<data.data.length;i++){
        this.api.programConsolidate(data.data[i]._id).subscribe(pD=>{
          // console.log(pD);
          this.programsData.push(pD);
          
        });

        if(i == (data.data.length -1)){
          this.program = this.programsData;
          
        }
          
      }
      
    });
    this.api.allActiveCourse().subscribe(data=>{
      console.log(data.data);
      this.coursesData = data.data;
      this.course = this.coursesData;
    });
    this.api.allActiveModules().subscribe(data=>{
      console.log(data.data);
      this.modulesData = data.data;
      this.module = this.modulesData;
    });
    this.api.getAllActiveQuestionBank().subscribe(data=>{
      console.log(data.data);
      this.quizsData = data.data;
      this.quiz = this.quizsData;
    });
  }

  allEmployeeSelection(event:any){
    console.log(event.target.checked);
    if(event.target.checked){
      for(let emp = 0; emp < this.employeesData.length; emp++){
          this.employeesData[emp].checked = true;
      }
    }else{
      for(let emp = 0; emp < this.employeesData.length; emp++){
        this.employeesData[emp].checked = false;
    }
    }
  }

  checkEmployee(index:any){
    if(this.selection == "single"){
      this.employeesData[index].checked = true;
      for(let emp = 0; emp < this.employeesData.length; emp++){
        if(emp != index){
          this.employeesData[emp].checked = false;
        }
      }
    }else{
      this.employeesData[index].checked = true;
    }
  }

  checkProgram(index:any){
    this.programsData[index].checked = true;
  }

  checkCourse(index:any){
    this.coursesData[index].checked = true;
  }

  checkModule(index:any){
    this.modulesData[index].checked = true;
  }

  checkQuiz(index:any){
    this.quizsData[index].checked = true;
  }

  selectionChange(){
    this.api.getAllUsers().subscribe(data=>{
      this.employeesData = data.data;
      this.emp = this.employeesData;
    });
  }
  
  assignProgram(){

    if(this.effectiveDateProgram == ""){
      this.effectiveDateProgramError = "has-error";
      return;
    }

    this.employeesData.map((emp:any)=>{
      if(emp.checked){
        this.employeesCheckData.push({id:emp._id});
      }
    });

    this.programsData.map((program:any)=>{
      if(program.checked){
        this.programsCheckData.push({id:program.program._id});
      }
    });
    
    for(let prg=0;prg<this.programsCheckData.length;prg++){
      for(let emp=0;emp<this.employeesCheckData.length;emp++){
        this.assignedProgram.push({uniqueId:this.programsCheckData[prg].id,employeeId:this.employeesCheckData[emp].id,type:"Program",createdAt:this.effectiveDateProgram});
      }
    }
    console.log(this.assignedProgram);
    if(this.assignedProgram.length > 0){
      this.api.assignBulkProgram(this.assignedProgram).subscribe(res=>{
        if(res.status){
          this.successPresentToast(res.message);
          this.assignedProgram=[];
          this.employeesCheckData=[];
          this.programsCheckData=[];
          this.getData();
        } else {
          this.errorPresentToast(res.message);
        }
      });
    }

  }
  
  assignCourse(){

    if(this.effectiveDateCourse == ""){
      this.effectiveDateCourseError = "has-error";
      return;
    }

    this.employeesData.map((emp:any)=>{
      if(emp.checked){
        this.employeesCheckData.push({id:emp._id});
      }
    });

    this.coursesData.map((course:any)=>{
      if(course.checked){
        this.coursesCheckData.push({id:course._id});
      }
    });
    
    for(let cour=0;cour<this.coursesCheckData.length;cour++){
      for(let emp=0;emp<this.employeesCheckData.length;emp++){
        this.assignedProgram.push({uniqueId:this.coursesCheckData[cour].id,employeeId:this.employeesCheckData[emp].id,type:"Course",createdAt:this.effectiveDateCourse});
      }
    }
    
    if(this.assignedProgram.length > 0){
      this.api.assignBulkProgram(this.assignedProgram).subscribe(res=>{
        if(res.status){
          this.successPresentToast("Course Assign Successfully");
          this.assignedProgram=[];
          this.employeesCheckData=[];
          this.coursesCheckData=[];
          this.getData();
        } else {
          this.errorPresentToast(res.message);
        }
      });
    }
  }

  assignModule(){

    if(this.effectiveDateModule == ""){
      this.effectiveDateModuleError = "has-error";
      return;
    }

    this.employeesData.map((emp:any)=>{
      if(emp.checked){
        this.employeesCheckData.push({id:emp._id});
      }
    });

    this.modulesData.map((mod:any)=>{
      if(mod.checked){
        this.modulesCheckData.push({id:mod._id});
      }
    });
    
    for(let mod=0;mod<this.modulesCheckData.length;mod++){
      for(let emp=0;emp<this.employeesCheckData.length;emp++){
        this.assignedProgram.push({uniqueId:this.modulesCheckData[mod].id,employeeId:this.employeesCheckData[emp].id,type:"Module",createdAt:this.effectiveDateModule});
      }
    }
    
    if(this.assignedProgram.length > 0){
      this.api.assignBulkProgram(this.assignedProgram).subscribe(res=>{
        if(res.status){
          this.successPresentToast("Module Assign Successfully");
          this.assignedProgram=[];
          this.employeesCheckData=[];
          this.modulesCheckData=[];
          this.getData();
        } else {
          this.errorPresentToast(res.message);
        }
      });
    }
  }

  assingQuiz(){

    if(this.effectiveDateQuiz == ""){
      this.effectiveDateQuizError = "has-error";
      return;
    }

    this.employeesData.map((emp:any)=>{
      if(emp.checked){
        this.employeesCheckData.push({id:emp._id});
      }
    });

    this.quizsData.map((qu:any)=>{
      if(qu.checked){
        this.quizsCheckData.push({id:qu._id});
      }
    });
    
    for(let qu=0;qu<this.quizsCheckData.length;qu++){
      for(let emp=0;emp<this.employeesCheckData.length;emp++){
        this.assignedProgram.push({uniqueId:this.quizsCheckData[qu].id,employeeId:this.employeesCheckData[emp].id,type:"Quiz",createdAt:this.effectiveDateQuiz});
      }
    }
    
    if(this.assignedProgram.length > 0){
      this.api.assignBulkProgram(this.assignedProgram).subscribe(res=>{
        if(res.status){
          this.successPresentToast("Quiz Assign Successfully");
          this.assignedProgram=[];
          this.employeesCheckData=[];
          this.quizsCheckData=[];
          this.getData();
        } else {
          this.errorPresentToast(res.message);
        }
      });
    }
  }

  employeeFilter(val:any) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.employeesData = this.emp;
    }
    const columns = Object.keys(this.emp[0]);
    if (!columns.length) {
      return;
    }
    const rows = this.emp.filter((d:any)=> {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
      return;
    });
    this.employeesData = rows;
    return;
  }


  programFilter(val:any) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.programsData = this.program;
    }
    const columns = Object.keys(this.program[0].program);
    if (!columns.length) {
      return;
    }
    
    const rows = this.program.filter((d:any)=> {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d.program[column] && d.program[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
      return;
    });
    this.programsData = rows;
    return;
  }
    
  courseFilter(val:any) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.coursesData = this.course;
    }
    console.log(this.course);
    const columns = Object.keys(this.course[0]);
    console.log(columns);
    if (!columns.length) {
      return;
    }
    
    const rows = this.course.filter((d:any)=> {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
      return;
    });
    this.coursesData = rows;
    return;
  }

  moduleFilter(val:any){
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.modulesData = this.module;
    }
    const columns = Object.keys(this.module[0]);
    if (!columns.length) {
      return;
    }
    
    const rows = this.module.filter((d:any)=> {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
      return;
    });
    this.modulesData = rows;
    return;
  }

  quizFilter(val:any) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.quizsData = this.quiz;
    }
    const columns = Object.keys(this.quiz[0]);
    if (!columns.length) {
      return;
    }
    
    const rows = this.quiz.filter((d:any)=> {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
      return;
    });
    this.quizsData = rows;
    return;
  }

  showData(item:any,type:any){
    if(type == "Program"){
      this.showProgram =item;
    }else if(type == "Course"){
      this.showCourse= item;
    }else if(type == "Module"){
      this.showModule = item;
    }else if(type == "Quiz"){
      this.showQuiz = item;
    }
  }
}
