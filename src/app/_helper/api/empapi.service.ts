import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmpapiService {

  constructor(public http: HttpClient, public userS: UserService) { }

  /*********************************   Question Bank   ***********************************/

  // createQuestioBank
  createQuestioBank(code : any, title : any, keywords : any, description : any,status:any) {
    
    const data = JSON.stringify({
      "code": code,
      "title": title,
      "keywords": keywords,
      "description": description,
      "status": status
    });
    return this.http.post<any>(`${environment.baseURL}/question-bank/create`, data,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // updateQuestioBank
  updateQuestioBank(title : any, keywords : any, description : any,status:any, id : any) {
    const data = JSON.stringify({
      "title": title,
      "keywords": keywords,
      "description": description,
      "status" : status
    });
    return this.http.put<any>(`${environment.baseURL}/question-bank/update/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // getSingleQuestionBank
  getSingleQuestionBank(id : any) {
    return this.http.get<any>(`${environment.baseURL}/question-bank/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // deleteQuestionBank
  deleteQuestionBank(id : any) {
    return this.http.delete<any>(`${environment.baseURL}/question-bank/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // getAllQuestionBank
  getAllQuestionBank() {
    return this.http.get<any>(`${environment.baseURL}/question-bank`)
    .pipe(map(data => {
      return data;
    }));
  }

  // getIncrementalCodeQuestionBank
  getIncrementalCodeQuestionBank() {
    return this.http.post<any>(`${environment.baseURL}/question-bank/incremental-code`,"")
    .pipe(map(data => {
      return data;
    }));
  }

  // updateStatusQuestioBank
  updateStatusQuestioBank(id : any,status:string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/question-bank/update/status/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }


   /*********************************   UserRequests   ***********************************/

  // createUserRequests
  createUserRequests(employeeCode : any, salutation : any, firstName : any,lastName:any, email : any, password : any, mobile : any,dob:any,gender:any,department:any,state:any,cluster:any,branch:any,
    designation:any) {
    const data = JSON.stringify({
      "employeeCode": employeeCode,
      "salutation": salutation,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "mobile": mobile,
      "dob": dob,
      "gender": gender,
      "department":department,
      "state":state,
      "cluster":cluster,
      "branch":branch,
      "designation":designation
    });
    return this.http.post<any>(`${environment.baseURL}/userRequests/create`, data,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }


  /*********************************   QuizScore   ***********************************/

  // createQuizScore
  createQuizScore(programId : any, quizId : any, moduleId : any,employeeId:any, score : any, wrongAns : any, totalQuestion : any,correctAns:any,skipAns:any,questionArray:any,examTime:any) {
    const data = JSON.stringify({
      "programId": programId,
      "quizId": quizId,
      "moduleId": moduleId,
      "employeeId":employeeId,
      "score": score,
      "wrongAnswer": wrongAns,
      "totalQuestion" : totalQuestion,
      "correctAnswer" : correctAns,
      "skipAnswer" : skipAns,
      "questionArray":questionArray,
      "examTime":examTime
    });
    return this.http.post<any>(`${environment.baseURL}/quizScore/create`, data,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // updateQuizScore
  updateQuizScore(programId : any, quizId : any, moduleId : any,employeeId:any, score : any, wrongAns : any, totalQuestion : any,correctAns:any,skipAns:any,questionArray:any,examTime:any, id : any) {
    const data = JSON.stringify({
      "programId": programId,
      "quizId": quizId,
      "moduleId": moduleId,
      "employeeId":employeeId,
      "score": score,
      "wrongAnswer": wrongAns,
      "totalQuestion" : totalQuestion,
      "correctAnswer" : correctAns,
      "skipAnswer" : skipAns,
      "questionArray":questionArray,
      "examTime":examTime
    });
    return this.http.put<any>(`${environment.baseURL}/quizScore/update/`+ id, data,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  //updateRating
  updateRating(rating:any, id : any) {
    const data = JSON.stringify({
      "rating": rating
    });
    return this.http.put<any>(`${environment.baseURL}/quizScore/rating/`+ id, data,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // singleQuizScore
  singleQuizScore(id : any) {
    return this.http.get<any>(`${environment.baseURL}/quizScore/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // singleQuizScoreByProgram
  singleQuizScoreByProgram(id : any) {
    return this.http.get<any>(`${environment.baseURL}/quizScore/program/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // singleQuizScoreByModule
  singleQuizScoreByModule(id : any) {
    return this.http.get<any>(`${environment.baseURL}/quizScore/module/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }
    // getOverallScore
    getOverallScore(id : any) {
      return this.http.get<any>(`${environment.baseURL}/quizScore/overallScore/`+ id, )
      .pipe(map(data => {
        return data;
      }));
    }
  

    // getOverallScore
    getWeeklyData(id : any) {
      return this.http.get<any>(`${environment.baseURL}/weekData/`+ id, )
      .pipe(map(data => {
        return data;
      }));
    }

  // singleQuizScoreByEmployee
  singleQuizScoreByEmployee(id : any) {
    return this.http.get<any>(`${environment.baseURL}/quizScore/employee/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // allQuizScoreByEmployee
  allQuizScoreByEmployee(id : any) {
    return this.http.get<any>(`${environment.baseURL}/quizScore/employee/all/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // singleQuizScoreByQuiz
  singleQuizScoreByQuiz(id : any) {
    return this.http.get<any>(`${environment.baseURL}/quizScore/quiz/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

   // singleQuizScoreByQuizAndEmp
   singleQuizScoreByQuizEmp(quizId : any,empId:any) {
    return this.http.get<any>(`${environment.baseURL}/quizScore/quizEmp/`+ quizId+'/'+empId )
    .pipe(map(data => {
      return data;
    }));
  }


  // deleteQuizScore
  deleteQuizScore(id : any) {
    return this.http.delete<any>(`${environment.baseURL}/quizScore/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // allQuizScore
  allQuizScore() {
    return this.http.get<any>(`${environment.baseURL}/quizScore`, )
    .pipe(map(data => {
      return data;
    }));
  }


  // getTopEmployee
  getTopEmployee() {
    return this.http.get<any>(`${environment.baseURL}/topEmp`, )
    .pipe(map(data => {
      return data;
    }));
  }


  
  /*********************************   Question   ***********************************/

  // createQuestion
  createQuestion(questionBankId : any, question : any, optionA : any, optionB : any, optionC : any, optionD : any, answer : any,) {
    const data = JSON.stringify({
      "questionBankId": questionBankId,
      "question": question,
      "optionA": optionA,
      "optionB": optionB,
      "optionC": optionC,
      "optionD": optionD,
      "answer": answer
    });
    return this.http.post<any>(`${environment.baseURL}/question/create/single`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // updateQuestion
  updateQuestion(questionBankId : any, question : any, optionA : any, optionB : any, optionC : any, optionD : any, answer : any, id : any) {
    const data = JSON.stringify({
      "questionBankId": questionBankId,
      "question": question,
      "optionA": optionA,
      "optionB": optionB,
      "optionC": optionC,
      "optionD": optionD,
      "answer": answer
    });
    return this.http.put<any>(`${environment.baseURL}/question/update/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }
  //getSingleQuestion
  singleQuestion(id : any) {
    return this.http.get<any>(`${environment.baseURL}/singleQuestion/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }


  // getAllQuestion
  getAllQuestion(id : any) {
    return this.http.get<any>(`${environment.baseURL}/question/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // deleteQuestion
  deleteQuestion(id : any) {
    return this.http.delete<any>(`${environment.baseURL}/question/delete/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // createBulkQuestion
  createBulkQuestion(questions:any) {
    const data = JSON.stringify({
      "questions": questions
    });
    return this.http.post<any>(`${environment.baseURL}/question/create/bulk`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }



  /*********************************   Module   ***********************************/

  // createModule
  createModule(code : any, title : any, keywords : any, description : any, type : any, url : any, thumbnail : any, quizArr : any,status:any) {
    const data = JSON.stringify({
      "code": code,
      "title": title,
      "keywords": keywords,
      "description": description,
      "content": {
          "type": type,
          "url": url
      },
      "thumbnail": thumbnail,
      "quiz" : quizArr,
      "status":status
    });
    return this.http.post<any>(`${environment.baseURL}/module/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // updateModule
  updateModule(code : any, title : any, keywords : any, description : any, type : any, url : any, thumbnail : any, quizArr : any,status:any, id : any) {
    const data = JSON.stringify({
      "code": code,
      "title": title,
      "keywords": keywords,
      "description": description,
      "content": {
          "type": type,
          "url": url
      },
      "thumbnail": thumbnail,
      "quiz" : quizArr,
      "status" :status
    });
    return this.http.put<any>(`${environment.baseURL}/module/update/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // singleModule
  singleModule(id : any) {
    return this.http.get<any>(`${environment.baseURL}/module/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // deleteModule
  deleteModule(id : any) {
    return this.http.delete<any>(`${environment.baseURL}/module/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // allModules
  allModules() {
    return this.http.get<any>(`${environment.baseURL}/module`, )
    .pipe(map(data => {
      return data;
    }));
  }

  // getIncrementalCodeModule
  getIncrementalCodeModule() {
    return this.http.post<any>(`${environment.baseURL}/module/incremental-code`, "")
    .pipe(map(data => {
      return data;
    }));
  }


  // updateStatusModule
  updateStatusModule(id : any,status:string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/module/update/status/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

   // createModulesWatch
   createModulesWatch(moduleId : any, employeeId : any,moduleWatchTime:any) {
    const data = JSON.stringify({
      "moduleId":moduleId,
      "employeeId":employeeId,
      "moduleWatchTime":moduleWatchTime
    });
    return this.http.post<any>(`${environment.baseURL}/modulesWatch/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }


  // getIncrementalCodeCourses
  getModulesWatchesByEmpAndModule(empId:any,moduleId:any) {
    return this.http.get<any>(`${environment.baseURL}/modulewatches-emp-module/`+empId+`/`+moduleId)
    .pipe(map(data => {
      return data;
    }));
  }

  /*********************************   Courses   ***********************************/

  // createCourse
  createCourse(code : any, title : any, keywords : any, description : any, thumbnail : any, moduleArr : any,quizArr:any,status:any) {
    const data = JSON.stringify({
      "code": code,
      "title": title,
      "keywords": keywords,
      "description": description,
      "thumbnail": thumbnail,
      "modules" : moduleArr,
      "quiz" : quizArr,
      "status" :status
    });
    return this.http.post<any>(`${environment.baseURL}/courses/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // updateCourse
  updateCourse(code : any, title : any, keywords : any, description : any, thumbnail : any, moduleArr : any,quizArr:any,status:any, id : any) {
    const data = JSON.stringify({
      "code": code,
      "title": title,
      "keywords": keywords,
      "description": description,
      "thumbnail": thumbnail,
      "modules" : moduleArr,
      "quiz" : quizArr,
      "status" : status
    });
    return this.http.put<any>(`${environment.baseURL}/courses/update/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // singleCourse
  singleCourse(id : any) {
    return this.http.get<any>(`${environment.baseURL}/courses/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // deleteCourses
  deleteCourses(id : any) {
    return this.http.delete<any>(`${environment.baseURL}/courses/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // allCourse
  allCourse() {
    return this.http.get<any>(`${environment.baseURL}/courses`, )
    .pipe(map(data => {
      return data;
    }));
  }

  // getIncrementalCodeCourses
  getIncrementalCodeCourses() {
    return this.http.post<any>(`${environment.baseURL}/courses/incremental-code`, "")
    .pipe(map(data => {
      return data;
    }));
  }

  // updateStatusCourses
  updateStatusCourse(id : any,status:string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/courses/update/status/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }




  /*********************************   Program   ***********************************/

  // createProgram
  createProgram(code : any, title : any, keywords : any, description : any, thumbnail : any, coursesArr : any,moduleArr:any,status:any) {
    const data = JSON.stringify({
      "code": code,
      "title": title,
      "keywords": keywords,
      "description": description,
      "thumbnail": thumbnail,
      "courses" : coursesArr,
      "modules" : moduleArr,
      "status" : status
    });
    return this.http.post<any>(`${environment.baseURL}/program/create`, data,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // updateProgram
  updateProgram(code : any, title : any, keywords : any, description : any, thumbnail : any, coursesArr : any,moduleArr:any,status:any, id : any) {
    const data = JSON.stringify({
      "code": code,
      "title": title,
      "keywords": keywords,
      "description": description,
      "thumbnail": thumbnail,
      "courses" : coursesArr,
      "modules" : moduleArr,
      "status" :status
    });
    return this.http.put<any>(`${environment.baseURL}/program/update/`+ id, data,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // singleProgram
  singleProgram(id : any) {
    return this.http.get<any>(`${environment.baseURL}/program/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }
  // singleProgram
  singleProgramByCode(code : any) {
    return this.http.get<any>(`${environment.baseURL}/program/code/`+ code, )
    .pipe(map(data => {
      return data;
    }));
  }

  // deleteProgram
  deleteProgram(id : any) {
    return this.http.delete<any>(`${environment.baseURL}/program/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // allProgram
  allProgram() {
    return this.http.get<any>(`${environment.baseURL}/program`, )
    .pipe(map(data => {
      return data;
    }));
  }

  // getIncrementalCodeProgram
  getIncrementalCodeProgram() {
    return this.http.post<any>(`${environment.baseURL}/program/incremental-code`, "")
    .pipe(map(data => {
      return data;
    }));
  }

  // updateStatusCourses
  updateStatusProgram(id : any,status:string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/program/update/status/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  /*********************************   Consolidate   ***********************************/

   // ModuleConsolidate
  moduleConsolidate(id : any) {
    return this.http.get<any>(`${environment.baseURL}/consolidate/module/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  // CourseConsolidate
  courseConsolidate(id : any) {
    return this.http.get<any>(`${environment.baseURL}/consolidate/course/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }


  //Files Handling

  uploadFile(filedata:any) {
    return this.http.post<any>(`${environment.baseURL}/upload/`, filedata)
    .pipe(map(data => {
      return data;
    }));
  }

  downloadFile(filename:any) {
    return this.http.get<any>(`${environment.baseURL}/retrieve/`+filename).subscribe(data=>{
      console.log(data);
    });
  }


  //Create Certificate
  createCertificate(salutation : any, firstName : any,lastName:any,department:any) {
    const data = JSON.stringify({
      "salutation": salutation,
      "firstName": firstName,
      "lastName": lastName,
      "department":department
    });
    return this.http.post<any>(`${environment.baseURL}/create-certificate`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  downloadCertificateFile(filename:any) {
    return this.http.get<any>(`${environment.baseURL}/retrieve/certificate/`+filename).subscribe(data=>{
      console.log(data);
    });
  }

  //Files Handling End

  //Overall Snapshot
  getOverallSnapshot() {
    return this.http.get<any>(`${environment.baseURL}/overall-snapshot`).pipe(map(data=>{
      return data;
    }));
  }

  /*********************************   Support Request   ***********************************/

  // createCertificateData
  createCertificateData(quizId : any, quizScoreId : any,employeeId:any,certificate:any,url:any) {
    const data = JSON.stringify({
      "quizId": quizId,
      "quizScoreId": quizScoreId,
      "certificate": certificate,
      "employeeId":employeeId,
      "url":url
    });
    return this.http.post<any>(`${environment.baseURL}/certificates/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  //Overall Snapshot
  getAllCertificates(id:any) {
    return this.http.get<any>(`${environment.baseURL}/certificatesEmp/`+id).pipe(map(data=>{
      return data;
    }));
  }

  //Overall Snapshot
  getSingleCertificate(id:any) {
    return this.http.get<any>(`${environment.baseURL}/certificates/`+id).pipe(map(data=>{
      return data;
    }));
  }

   //Overall Snapshot
   getSingleCertificateByQuizAndEmpId(quizScoreid:any,empId:any) {
    return this.http.get<any>(`${environment.baseURL}/certificates/quizEmp/`+quizScoreid+"/"+empId).pipe(map(data=>{
      return data;
    }));
  }

   /*********************************   Post   ***********************************/

  // createPost
  createPost(message : any,employeeId:any,images:any) {
    const data = JSON.stringify({
      "message": message,
      "employeeId":employeeId,
      "images":images
    });
    return this.http.post<any>(`${environment.baseURL}/post/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  updatePost(id:any) {
    return this.http.put<any>(`${environment.baseURL}/post/update/`+ id, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // createPostLikes
  createPostLikes(postId:any,employeeId : any) {
    const data = JSON.stringify({
      "postId": postId,
      "employeeId":employeeId
    });
    return this.http.post<any>(`${environment.baseURL}/postlikes/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }


  //getAllPost
  getAllPost() {
    return this.http.get<any>(`${environment.baseURL}/postactive`).pipe(map(data=>{
      return data;
    }));
  }

  // deleteModule
  deletePostLikes(pid : any,eid:any) {
    return this.http.delete<any>(`${environment.baseURL}/postlikes/`+ pid+'/'+ eid)
    .pipe(map(data => {
      return data;
    }));
  }



  /*********************************   Support Request   ***********************************/

  // createSupportRequest
  createSupportRequest(subject : any, message : any,file:any,employeeId:any) {
    const data = JSON.stringify({
      "subject": subject,
      "message": message,
      "file": file,
      "employeeId":employeeId
    });
    return this.http.post<any>(`${environment.baseURL}/support/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }


  //getAllSupportByEmp
  getAllSupportByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/support/emp/`+id).pipe(map(data=>{
      return data;
    }));
  }


/*********************************   Users   ***********************************/


//getAllSupportByEmp
getbirthdays() {
  return this.http.get<any>(`${environment.baseURL}/userbirthday`).pipe(map(data=>{
    return data;
  }));
}


  // updateUser
  updateUser(firstName : any, lastName : any, salutation : any, email : any, mobile : any, dob : any,gender:any,profilephoto:any, id : any) {
    const data = JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "salutation": salutation,
      "email": email,
      "mobile": mobile,
      "dob" : dob,
      "gender" : gender,
      "profilephoto":profilephoto
    });
    return this.http.put<any>(`${environment.baseURL}/user/update/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // All Users Data
  getAllUsers() {
    return this.http.get<any>(`${environment.baseURL}/user/all`)
    .pipe(map(data => {
      return data;
    }));
  }

  //Single User
  singleUser(id : any) {
    return this.http.get<any>(`${environment.baseURL}/user/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }
  

  // Update Status
  updateStatusUser(id : any,status:string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/user/update/status/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // Sync Employee
  syncEmployee() {
    return this.http.get<any>(`${environment.baseURL}/employee-sync`)
    .pipe(map(data => {
      return data;
    }));
  }

  /*********************************   Policy   ***********************************/
     // getSinglePolicyByPer
     getSinglePolicyByPer(percentage:any) {
      return this.http.get<any>(`${environment.baseURL}/policy/per/`+percentage)
      .pipe(map(data => {
        return data;
      }));
    }
  
    // getTopMessageConfig
    getTopMessage() {
      return this.http.get<any>(`${environment.baseURL}/config`)
      .pipe(map(data => {
        return data;
      }));
    }



  /*********************************   Courses   ***********************************/

  // programAllocation
  assignBulkProgram(assignedPrograms:any) {
    const data = JSON.stringify({
      "assignedPrograms": assignedPrograms
    });
    return this.http.post<any>(`${environment.baseURL}/programAllocation/create/bulk`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // getassignedProgram
  getAssignedProgram(id:any) {
      return this.http.get<any>(`${environment.baseURL}/programAllocation/`+ id )
      .pipe(map(data => {
        return data;
      }));
    }

  // getassignedProgramForCalender
  getAssignedProgramForCalender(id:any) {
    return this.http.get<any>(`${environment.baseURL}/programAllocation/calender/`+ id )
    .pipe(map(data => {
      return data;
    }));
  }


     // gettodayassignedProgram
  getTodayAssignedProgram(id:any) {
    return this.http.get<any>(`${environment.baseURL}/todayAssignedProgram/`+id)
    .pipe(map(data => {
      return data;
    }));
  }

  quizCountForProgram(id:any) {
    return this.http.get<any>(`${environment.baseURL}/quizCountForProgram/`+id)
    .pipe(map(data => {
      return data;
    }));
  }

  quizCountForCourse(id:any) {
    return this.http.get<any>(`${environment.baseURL}/quizCountForCourse/`+id)
    .pipe(map(data => {
      return data;
    }));
  }

  quizCountForModule(id:any) {
    return this.http.get<any>(`${environment.baseURL}/quizCountForModule/`+id)
    .pipe(map(data => {
      return data;
    }));
  }

  quizCountForQuiz(id:any) {
    return this.http.get<any>(`${environment.baseURL}/quizCountForQuiz/`+id)
    .pipe(map(data => {
      return data;
    }));
  }

  getProgramCompletionStatusByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/getProgramCompletionStatusByEmp/`+id)
    .pipe(map(data => {
      return data;
    }));
  }

  getCourseCompletionStatusByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/getCourseCompletionStatusByEmp/`+id)
    .pipe(map(data => {
      return data;
    }));
  }

  getModuleCompletionStatusByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/getModuleCompletionStatusByEmp/`+id)
    .pipe(map(data => {
      return data;
    }));
  }

  getQuizCompletionStatusByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/getQuizCompletionStatusByEmp/`+id)
    .pipe(map(data => {
      return data;
    }));
  }





  // User Notification
  userNotification(userId:any) {
    return this.http.get<any>(`${environment.baseURL}/user/notification/`+userId,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

    // Create Notification For Admin
    createNotification(title: any, message: any, segment: any, segmentId: any) {
      const data = JSON.stringify({
        "title": title,
        "message": message,
        "segment": segment,
        "segmentId": segmentId
      });
      return this.http.post<any>(`${environment.baseURL}/notification-admin/create`, data, { headers: { 'Content-Type': 'application/json' } })
        .pipe(map(data => {
          return data;
        }));
    }

  // Clear Notification
  clearNotification(userId:any) {
    return this.http.get<any>(`${environment.baseURL}/user/notification/clear/`+userId,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // Clear Notification
  clearNotificationById(id:any) {
    return this.http.delete<any>(`${environment.baseURL}/user/notification/`+id,)
    .pipe(map(data => {
      return data;
    }));
  }
   //Get All Notification
   getAllNotification(id:any) {
    return this.http.get<any>(`${environment.baseURL}/notification/user/`+id)
      .pipe(map(data => {
        return data;
      }));
  }


  //Search

  searchProgram(empId:any,search:any){
    const data = JSON.stringify({
      "search": search,
      "employeeId": empId
    });
    return this.http.post<any>(`${environment.baseURL}/search-program-employee`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  searchCourse(empId:any,search:any){
    const data = JSON.stringify({
      "search": search,
      "employeeId": empId
    });
    return this.http.post<any>(`${environment.baseURL}/search-course-employee`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  searchModule(empId:any,search:any){
    const data = JSON.stringify({
      "search": search,
      "employeeId": empId
    });
    return this.http.post<any>(`${environment.baseURL}/search-module-employee`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  searchQuiz(empId:any,search:any){
    const data = JSON.stringify({
      "search": search,
      "employeeId": empId
    });
    return this.http.post<any>(`${environment.baseURL}/search-quiz-employee`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }
}
