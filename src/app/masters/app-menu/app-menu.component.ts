import { Component, OnInit } from '@angular/core';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnInit {
  programCompleted=0;
  programPending=0;
  courseCompleted=0;
  coursePending=0;
  moduleCompleted=0;
  modulePending=0;
  quizCompleted=0;
  quizPending=0;
  isEmp:boolean=false;
  isAdmin:boolean=false;
  constructor(public authS:AuthService,public api:EmpapiService) {
    if(this.authS.currentUserValue.roles == "ROLE_ADMIN"){
      this.isEmp=false;
      this.isAdmin=true;
    }else{
      this.isEmp=true;
      this.isAdmin=false;
    }
   }

  ngOnInit() {
    this.api.getProgramCompletionStatusByEmp(this.authS.currentUserValue.id).subscribe(data=>{
      this.programPending = data.data.length;
      for(let i=0;i<data.data.length;i++){
        if(data.data[i].score == 100){
          this.programCompleted += 1;
        }
      }
    });
    this.api.getCourseCompletionStatusByEmp(this.authS.currentUserValue.id).subscribe(data=>{
      this.coursePending = data.data.length;
      for(let i=0;i<data.data.length;i++){
        if(data.data[i].score == 100){
          this.courseCompleted += 1;
        }
      }
    });
    this.api.getModuleCompletionStatusByEmp(this.authS.currentUserValue.id).subscribe(data=>{
      this.modulePending = data.data.length;
      for(let i=0;i<data.data.length;i++){
        if(data.data[i].score == 100){
          this.moduleCompleted += 1;
        }
      }
    });
    this.api.quizCountForQuiz(this.authS.currentUserValue.id).subscribe(data=>{
      this.quizPending = data.quizLength;
      this.quizCompleted = data.completedLength;
    });

    
    $('.hide-mobile').click(()=>{
      $('.sidebar-mini').removeClass('sidebar-open');
    })
  }

}
