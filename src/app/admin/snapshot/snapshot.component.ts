import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss']
})
export class SnapshotComponent implements OnInit {
  courseCount=0;
  programCount=0;
  moduleCount=0;
  qbCount=0;
  constructor(private api: AdminapiService, private router: Router) { }


  //TODO: [FM-7] Add Counts on snapshots
  ngOnInit(): void {
    this.getSnapshotData();
  }
  getSnapshotData(){
    this.api.getOverallSnapshot().subscribe(data=>{
      console.log(data);
      this.courseCount = data.course;
      this.programCount = data.program;
      this.moduleCount = data.module;
      this.qbCount = data.qb;
    })
  }

  openLink(link:String){
    this.router.navigate([link]);
  }

}
