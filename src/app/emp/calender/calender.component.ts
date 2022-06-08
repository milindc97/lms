import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { Platform } from '@ionic/angular';
import { EmpapiService } from 'src/app/_helper/api/empapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  
  Events = [];
  calendarOptions!: CalendarOptions;
  constructor(public api:EmpapiService,public authS:AuthService,public router:Router,public platform:Platform,public title:Title) { 
     this.title.setTitle("Calender - "+environment.companyName);}

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/dashboard']);
    });
    this.api.getAssignedProgramForCalender(this.authS.currentUserValue.id).subscribe(data=>{
      this.Events = data.data;
    })
    console.log(this.calendarOptions);
    setTimeout(() => {
      this.calendarOptions = { 
    headerToolbar:{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
        initialView: 'dayGridMonth',
        events: this.Events,
        contentHeight:700,
        eventClick: (info:any)=> {
          if(info.event.extendedProps.type == "Program"){
            this.router.navigate(['/emp/program']);
          }else if(info.event.extendedProps.type == "Course"){
            this.router.navigate(['/emp/course']);
          }else if(info.event.extendedProps.type == "Module"){
            this.router.navigate(['/emp/module']);
          }else if(info.event.extendedProps.type == "Quiz"){
            this.router.navigate(['/emp/quiz']);
          }
        }
      };
      console.log(this.calendarOptions);
    }, 2500);
  }

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.router.navigate(['/dashboard']);
    });
  }

}
