import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from 'src/app/_helper/api/adminapi.service';
import { AuthService } from 'src/app/_helper/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-active-wall',
  templateUrl: './active-wall.component.html',
  styleUrls: ['./active-wall.component.scss']
})
export class ActiveWallComponent implements OnInit {
  message:any="";
  allPosts:any=[];
  allPendingPosts:any=[];
  department="";
  images:any=[];
  isfeed1:boolean=true;
  isfeed2:boolean=false;
  isLike:boolean=false;
  data:any=[];
  birthdays:any=[];
  baseURL=environment.baseURL;
  
  constructor(public authS:AuthService,public apiS:AdminapiService,public toastController:ToastController) { }

  ngOnInit(): void {
    $('.feed1').addClass('feedclick');
    this.apiS.userNotification(this.authS.currentUserValue.id).subscribe(data=>{
      this.data = data.data;
      console.log(data);
    });
    this.getData();
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

  clearNotification(){
    this.apiS.clearNotification(this.authS.currentUserValue.id).subscribe(data=>{
      this.getData();
    });
  }
  

  getData(){
    this.allPosts=[];
    this.birthdays=[];
    this.allPendingPosts=[];
    this.apiS.getbirthdays().subscribe(data=>{
      this.birthdays = data.data;
    })
    this.apiS.singleUser(this.authS.currentUserValue.id).subscribe(data=>{
      this.department = data.data.department;
    })
    this.apiS.getAllPendingPost().subscribe(data=>{
      this.allPendingPosts=data.data;
    })
    this.apiS.getAllPost().subscribe(data=>{
      for(let i =0;i<data.data.length;i++){
        data.data[i].isLike=false;
        if(data.data[i].likes != undefined){
        for(let j=0;j<data.data[i].likes.length;j++){
          data.data[i].isLike=false;
          if(this.authS.currentUserValue.id == data.data[i].likes[j].employeeId){
            data.data[i].isLike =true;
          }else{
            data.data[i].isLike=false;
          }
        }
        }else{
          data.data[i].isLike=false;
        }
      }
      console.log(data.data);
      this.allPosts = data.data;
    })
  }

  uploadFile(event:any){
    let file = event.target.files;
    for(let i=0;i<file.length;i++){
      let reader = new FileReader();
      reader.readAsDataURL(file[i]);
      reader.onload = ()=>{
        this.images.push({path: reader.result,id:i});
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    
  }

  approvePost(id:any){
    this.apiS.updatePost(id).subscribe(data=>{
      if(data.status){
        this.successPresentToast(data.message);
        this.getData();
      }else{
        this.errorPresentToast(data.message);
      }
    })
  }
  
  changeFeed1(){
    $('.feed1').addClass('feedclick');
    this.isfeed1=true;
    this.isfeed2=false;
    $('.feed2').removeClass('feedclick');
  }

  changeFeed2(){
    $('.feed2').addClass('feedclick');
    this.isfeed1=false;
    this.isfeed2=true;
    $('.feed1').removeClass('feedclick');
  }

  change(){
    $("#header").show();
    $("#menu").show();
    $("#footer").show();
    $("#help").show();
  }

  createPost(){
    this.apiS.createPost(this.message,this.authS.currentUserValue.id,this.images).subscribe(data=>{
      if(data.status){
        this.successPresentToast(data.message);
        this.message="";
        this.images=[];
        this.getData();

      }else{
        this.errorPresentToast(data.message);
      }
    })
  }

  createPostLikes(id:any){
    this.apiS.createPostLikes(id,this.authS.currentUserValue.id).subscribe(data=>{
      if(data.status){
        this.getData();
      }
    })
  }

  deletePostLikes(id:any){
    this.apiS.deletePostLikes(id,this.authS.currentUserValue.id).subscribe(data=>{
      if(data.status){
        this.getData();
      }
    })
  }

  delete(index:any){
    this.images.splice(index, 1);
  }
}
