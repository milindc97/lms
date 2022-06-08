import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(public http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")!));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  userSignIn(email : any, password: any) {
    const data = JSON.stringify({
      "credential": email,
      "password": password
    });

    return this.http.post<any>(`${environment.baseURL}/auth/signin`,data,{headers:{'Content-Type': 'application/json'}})
    .pipe(map(data => {
      localStorage.setItem('currentUser', JSON.stringify(data.data));
      this.currentUserSubject.next(data.data);
      return data.data;
    }));
  }

  updateData(data:any){
    this.currentUserSubject.next(data);
  }

  userForgotPassword(dob: any, mobile:any,password:any) {
    const data = JSON.stringify({
      "dob": dob,
      "mobile": mobile,
      "password":password
    });

    return this.http.post<any>(`${environment.baseURL}/auth/forgot_password`,data,{headers:{'Content-Type': 'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }


  // userSignUp
  userSignUp(firstName: any, lastName: any, email: any, mobile: any, dob: any, password: any) {
    const data = JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "mobile": mobile,
      "dob": dob,
      "password": password,
      "roles" :["user"]
    });
    return this.http.post<any>(`${environment.baseURL}/auth/signup`, data)
    .pipe(map(data => {
      return data;
    }));
  }
  

  
  // refreshToken
  refreshToken(token : any) {
    const data = JSON.stringify({
      "refreshToken": token
    });
    return this.http.post<any>(`${environment.baseURL}/auth/refreshtoken`, data)
    .pipe(map(data => {
      return data;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
    window.location.replace("/");
  }

}
