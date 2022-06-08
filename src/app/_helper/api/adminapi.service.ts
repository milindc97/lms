import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(public http: HttpClient, public userS: UserService) {
    
  }

 /*********************************   Question Bank   ***********************************/

 // createQuestioBank
 createQuestioBank(code: any, title: any, keywords: any, description: any, questionCount: any, quizTime: any,expiryDate:any ,thumbnail:any, status: any) {

   const data = JSON.stringify({
     "code": code,
     "title": title,
     "keywords": keywords,
     "description": description,
     "questionsCount": questionCount,
     "quizTime": quizTime,
     "expiryDate":expiryDate,
     "status": status,
     "thumbnail":thumbnail
   });
   return this.http.post<any>(`${environment.baseURL}/question-bank/create`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // updateQuestioBank
 updateQuestioBank(title: any, keywords: any, description: any, questionCount: any, quizTime: any,expiryDate:any ,thumbnail:any, status: any, id: any) {
   const data = JSON.stringify({
     "title": title,
     "keywords": keywords,
     "description": description,
     "questionsCount": questionCount,
     "quizTime": quizTime,
     "expiryDate":expiryDate,
     "thumbnail":thumbnail
   });
   return this.http.put<any>(`${environment.baseURL}/question-bank/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // getSingleQuestionBank
 getSingleQuestionBank(id: any) {
   return this.http.get<any>(`${environment.baseURL}/question-bank/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // deleteQuestionBank
 deleteQuestionBank(id: any) {
   return this.http.delete<any>(`${environment.baseURL}/question-bank/` + id,)
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

  // getAllActiveQuestionBank
  getAllActiveQuestionBank() {
   return this.http.get<any>(`${environment.baseURL}/question-bank-active`)
     .pipe(map(data => {
       return data;
     }));
 }


  // getAllActiveQuestionBank
  getAllInactiveQuestionBank() {
   return this.http.get<any>(`${environment.baseURL}/question-bank-inactive`)
     .pipe(map(data => {
       return data;
     }));
 }

 // getIncrementalCodeQuestionBank
 getIncrementalCodeQuestionBank() {
   return this.http.post<any>(`${environment.baseURL}/question-bank/incremental-code`, "")
     .pipe(map(data => {
       return data;
     }));
 }

 // updateStatusQuestioBank
 updateStatusQuestioBank(id: any, status: string) {
   const data = JSON.stringify({
     status: status
   });
   return this.http.put<any>(`${environment.baseURL}/question-bank/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }


 /*********************************   Question   ***********************************/

 // createQuestion
 createQuestion(questionBankId: any, question: any, optionA: any, optionB: any, optionC: any, optionD: any, answer: any,) {
   const data = JSON.stringify({
     "questionBankId": questionBankId,
     "question": question,
     "optionA": optionA,
     "optionB": optionB,
     "optionC": optionC,
     "optionD": optionD,
     "answer": answer
   });
   return this.http.post<any>(`${environment.baseURL}/question/create/single`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // updateQuestion
 updateQuestion(questionBankId: any, question: any, optionA: any, optionB: any, optionC: any, optionD: any, answer: any, id: any) {
   const data = JSON.stringify({
     "questionBankId": questionBankId,
     "question": question,
     "optionA": optionA,
     "optionB": optionB,
     "optionC": optionC,
     "optionD": optionD,
     "answer": answer
   });
   return this.http.put<any>(`${environment.baseURL}/question/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }
 //getSingleQuestion
 singleQuestion(id: any) {
   return this.http.get<any>(`${environment.baseURL}/singleQuestion/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }


 // getAllQuestion
 getAllQuestion(id: any) {
   return this.http.get<any>(`${environment.baseURL}/question/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // deleteQuestion
 deleteQuestion(id: any) {
   return this.http.delete<any>(`${environment.baseURL}/question/delete/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // createBulkQuestion
 createBulkQuestion(questions: any) {
   const data = JSON.stringify({
     "questions": questions
   });
   return this.http.post<any>(`${environment.baseURL}/question/create/bulk`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }



 /*********************************   Module   ***********************************/

 // createModule
 createModule(code: any, title: any, keywords: any, description: any, youtubes: any, documents: any, thumbnail: any, quizArr: any,reward:any,expiryDate:any ,moduleWatchTime:any, status: any) {
   const data = JSON.stringify({
     "code": code,
     "title": title,
     "keywords": keywords,
     "description": description,
     "youtubes":youtubes,
     "documents":documents,
     "thumbnail": thumbnail,
     "quiz": quizArr,
     "rewardPoints":reward,
     "expiryDate":expiryDate,
     "moduleWatchTime":moduleWatchTime,
     "status": status
   });
   return this.http.post<any>(`${environment.baseURL}/module/create`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // updateModule
 updateModule(code: any, title: any, keywords: any, description: any, youtubes: any, documents: any, thumbnail: any, quizArr: any, status: any,reward:any,expiryDate:any,moduleWatchTime:any, id: any) {
   const data = JSON.stringify({
     "code": code,
     "title": title,
     "keywords": keywords,
     "description": description,
     "youtubes":youtubes,
     "documents":documents,
     "thumbnail": thumbnail,
     "quiz": quizArr,
     "rewardPoints":reward,
     "expiryDate":expiryDate,
     "moduleWatchTime":moduleWatchTime,
     "status": status
   });
   return this.http.put<any>(`${environment.baseURL}/module/update-module/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // singleModule
 singleModule(id: any) {
   return this.http.get<any>(`${environment.baseURL}/module/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // deleteModule
 deleteModule(id: any) {
   return this.http.delete<any>(`${environment.baseURL}/module/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // allModules
 allModules() {
   return this.http.get<any>(`${environment.baseURL}/module`,)
     .pipe(map(data => {
       return data;
     }));
 }

 // allModulesWatches
 allModulesWatches() {
   return this.http.get<any>(`${environment.baseURL}/modulewatches`,)
     .pipe(map(data => {
       return data;
     }));
 }

  // allModulesWatchesByEmp
  allModulesWatchesByEmp(id:any) {
   return this.http.get<any>(`${environment.baseURL}/modulewatches/`+id)
     .pipe(map(data => {
       return data;
     }));
 }

 // allActiveModules
 allActiveModules() {
   return this.http.get<any>(`${environment.baseURL}/module-active`,)
     .pipe(map(data => {
       return data;
     }));
 }
 // allInactiveModules
 allInactiveModules() {
   return this.http.get<any>(`${environment.baseURL}/module-inactive`,)
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
 updateStatusModule(id: any, status: string) {
   const data = JSON.stringify({
     status: status
   });
   return this.http.put<any>(`${environment.baseURL}/module/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }


 /*********************************   Courses   ***********************************/

 // createCourse
 createCourse(code: any, title: any, keywords: any, description: any, thumbnail: any, moduleArr: any,expiryDate:any , status: any) {
   const data = JSON.stringify({
     "code": code,
     "title": title,
     "keywords": keywords,
     "description": description,
     "thumbnail": thumbnail,
     "modules": moduleArr,
     "expiryDate":expiryDate,
     "status": status
   });
   return this.http.post<any>(`${environment.baseURL}/courses/create`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // updateCourse
 updateCourse(code: any, title: any, keywords: any, description: any, thumbnail: any, moduleArr: any,expiryDate:any , status: any, id: any) {
   const data = JSON.stringify({
     "code": code,
     "title": title,
     "keywords": keywords,
     "description": description,
     "thumbnail": thumbnail,
     "modules": moduleArr,
     "expiryDate":expiryDate,
     "status": status
   });
   return this.http.put<any>(`${environment.baseURL}/courses/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // singleCourse
 singleCourse(id: any) {
   return this.http.get<any>(`${environment.baseURL}/courses/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // deleteCourses
 deleteCourses(id: any) {
   return this.http.delete<any>(`${environment.baseURL}/courses/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // allCourse
 allCourse() {
   return this.http.get<any>(`${environment.baseURL}/courses`,)
     .pipe(map(data => {
       return data;
     }));
 }

 // allActiveCourse
 allActiveCourse() {
   return this.http.get<any>(`${environment.baseURL}/courses-active`,)
     .pipe(map(data => {
       return data;
     }));
 }

  // allInactiveCourse
  allInactiveCourse() {
   return this.http.get<any>(`${environment.baseURL}/courses-inactive`,)
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
 updateStatusCourse(id: any, status: string) {
   const data = JSON.stringify({
     status: status
   });
   return this.http.put<any>(`${environment.baseURL}/courses/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }


 /*********************************   Policy   ***********************************/

 // createPolicy
 createPolicy(icon: any, name: any, percentage: any) {
   const data = JSON.stringify({
     "icon": icon,
     "name": name,
     "percentage": percentage
   });
   return this.http.post<any>(`${environment.baseURL}/policy/create`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }


 // createPolicy
 updateMessageConfig(message: any) {
   const data = JSON.stringify({
     "message": message
   });
   return this.http.post<any>(`${environment.baseURL}/config/create`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

   // singleMessageConfig
   singleMessageConfig() {
     return this.http.get<any>(`${environment.baseURL}/config`,)
       .pipe(map(data => {
         return data;
       }));
   }

 // updatePolicy
 updatePolicy(icon: any, name: any, percentage: any, id: any) {
   const data = JSON.stringify({
     "icon": icon,
     "name": name,
     "percentage": percentage
   });
   return this.http.put<any>(`${environment.baseURL}/policy/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // singlePolicy
 singlePolicy(id: any) {
   return this.http.get<any>(`${environment.baseURL}/policy/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // deletePolicy
 deletePolicy(id: any) {
   return this.http.delete<any>(`${environment.baseURL}/policy/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // allPolicy
 allPolicy() {
   return this.http.get<any>(`${environment.baseURL}/policy`,)
     .pipe(map(data => {
       return data;
     }));
 }



 /*********************************   Program   ***********************************/

 // createProgram
 createProgram(code: any, title: any, keywords: any, description: any, thumbnail: any, coursesArr: any, moduleArr: any,expiryDate:any , status: any) {
   const data = JSON.stringify({
     "code": code,
     "title": title,
     "keywords": keywords,
     "description": description,
     "thumbnail": thumbnail,
     "courses": coursesArr,
     "modules": moduleArr,
     "expiryDate":expiryDate,
     "status": status
   });
   return this.http.post<any>(`${environment.baseURL}/program/create`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // updateProgram
 updateProgram(code: any, title: any, keywords: any, description: any, thumbnail: any, coursesArr: any, moduleArr: any,expiryDate:any , status: any, id: any) {
   const data = JSON.stringify({
     "code": code,
     "title": title,
     "keywords": keywords,
     "description": description,
     "thumbnail": thumbnail,
     "courses": coursesArr,
     "modules": moduleArr,
     "expiryDate":expiryDate,
     "status": status
   });
   return this.http.put<any>(`${environment.baseURL}/program/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // singleProgram
 singleProgram(id: any) {
   return this.http.get<any>(`${environment.baseURL}/program/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // deleteProgram
 deleteProgram(id: any) {
   return this.http.delete<any>(`${environment.baseURL}/program/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // allProgram
 allProgram() {
   return this.http.get<any>(`${environment.baseURL}/program`,)
     .pipe(map(data => {
       return data;
     }));
 }

 // allActiveProgram
 allActiveProgram() {
   return this.http.get<any>(`${environment.baseURL}/program-active`,)
     .pipe(map(data => {
       return data;
     }));
 }

 // allActiveProgram
 allInactiveProgram() {
   return this.http.get<any>(`${environment.baseURL}/program-inactive`,)
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
 updateStatusProgram(id: any, status: string) {
   const data = JSON.stringify({
     status: status
   });
   return this.http.put<any>(`${environment.baseURL}/program/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
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

 //getAllPendingPost
 getAllPendingPost() {
   return this.http.get<any>(`${environment.baseURL}/postpending`).pipe(map(data=>{
     return data;
   }));
 }
 
 updatePost(id:any) {
   return this.http.put<any>(`${environment.baseURL}/post/update/`+ id, {headers:{'Content-Type':'application/json'}})
   .pipe(map(data => {
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
 
 /*********************************   Consolidate   ***********************************/

 // ModuleConsolidate
 moduleConsolidate(id: any) {
   return this.http.get<any>(`${environment.baseURL}/consolidate/module/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // CourseConsolidate
 courseConsolidate(id: any) {
   return this.http.get<any>(`${environment.baseURL}/consolidate/course/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // ProgramConsolidate
 programConsolidate(id: any) {
   return this.http.get<any>(`${environment.baseURL}/consolidate/program/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }


 //Files Handling

 uploadFile(filedata: any) {
   return this.http.post<any>(`${environment.baseURL}/upload/`, filedata)
     .pipe(map(data => {
       return data;
     }));
 }

 downloadFile(filename: any) {
   return this.http.get<any>(`${environment.baseURL}/retrieve/` + filename).subscribe(data => {
     console.log(data);
   });
 }

 //Files Handling End

 //Overall Snapshot
 getOverallSnapshot() {
   return this.http.get<any>(`${environment.baseURL}/overall-snapshot`).pipe(map(data => {
     return data;
   }));
 }

 /*********************************   QuizScore   ***********************************/
 //Overall Snapshot
 getTop20Employee() {
   return this.http.get<any>(`${environment.baseURL}/top20Emp`).pipe(map(data => {
     return data;
   }));
 }

 //Month and Year Count
 getMonthAndYearWiseCount() {
   return this.http.get<any>(`${environment.baseURL}/monthAndYearCount`).pipe(map(data => {
     return data;
   }));
 }


 // allQuizScoreByEmployee
 allQuizScoreByEmployee(id: any) {
   return this.http.get<any>(`${environment.baseURL}/quizScore/employee/all/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }


 // getAllQuizScore
 getAllQuizScore() {
   return this.http.get<any>(`${environment.baseURL}/quizScore`)
     .pipe(map(data => {
       return data;
     }));
 }
 // getAllQuizScoreByScore
 getAllQuizScoreByScore(score: any) {
   const data = JSON.stringify({
     "score": score
   });
   return this.http.post<any>(`${environment.baseURL}/quizScoreByScore`,data,{headers:{'Content-Type':'application/json'}})
     .pipe(map(data => {
       return data;
     }));
 }

 // getOverallScore
 getWeeklyData(id: any) {
   return this.http.get<any>(`${environment.baseURL}/weekData/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 // getOverallScore
 getOverallScore(id: any) {
   return this.http.get<any>(`${environment.baseURL}/quizScore/overallScore/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }



 // getTopEmployee
 getTopEmployee() {
   return this.http.get<any>(`${environment.baseURL}/topEmp`,)
     .pipe(map(data => {
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
 updateUser(firstName: any, lastName: any, salutation: any, email: any, mobile: any, dob: any, gender: any, department: any, id: any) {
   const data = JSON.stringify({
     "firstName": firstName,
     "lastName": lastName,
     "salutation": salutation,
     "email": email,
     "mobile": mobile,
     "dob": dob,
     "gender": gender,
     "department": department
   });
   return this.http.put<any>(`${environment.baseURL}/user/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
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

 // All Users Data
 getAllUsersByStatus(status:any) {
   const data = JSON.stringify({
   status:status
   });
   return this.http.post<any>(`${environment.baseURL}/user/status`,data, { headers: { 'Content-Type': 'application/json' }} )
     .pipe(map(data => {
       return data;
     }));
 }


 // All Total Employees Count
 getTotalEmployeesCount() {
   return this.http.get<any>(`${environment.baseURL}/user/emp/count`)
     .pipe(map(data => {
       return data;
     }));
 }

 //Single User
 singleUser(id: any) {
   return this.http.get<any>(`${environment.baseURL}/user/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }


 // Update Status
 updateStatusUser(id: any, status: string) {
   const data = JSON.stringify({
     status: status
   });
   return this.http.put<any>(`${environment.baseURL}/user/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
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


 /*********************************   ProgramAllocation   ***********************************/


 //getProgramAllocation
 getProgramAllocation() {
   return this.http.get<any>(`${environment.baseURL}/getProgramAllocation`)
     .pipe(map(data => {
       return data;
     }));
 }

 //getCourseAllocation
 getCourseAllocation() {
   return this.http.get<any>(`${environment.baseURL}/getCourseAllocation`)
     .pipe(map(data => {
       return data;
     }));
 }

 //getCourseAllocation
 getCourseAllocationByCourse(id:any) {
   return this.http.get<any>(`${environment.baseURL}/getCourseAllocationByCourse/`+id)
     .pipe(map(data => {
       return data;
     }));
 }

 //getModuleAllocation
 getModuleAllocation() {
   return this.http.get<any>(`${environment.baseURL}/getModuleAllocation`)
     .pipe(map(data => {
       return data;
     }));
 }

 //getQuizAllocation
 getQuizAllocation() {
   return this.http.get<any>(`${environment.baseURL}/getQuizAllocation`)
     .pipe(map(data => {
       return data;
     }));
 }

 //getQuizAllocation
 getQuizAllocationByQuiz(id:any) {
   return this.http.get<any>(`${environment.baseURL}/getQuizAllocationByQuiz/`+id)
     .pipe(map(data => {
       return data;
     }));
 }

 // programAllocation
 assignBulkProgram(assignedPrograms: any) {
   const data = JSON.stringify({
     "assignedPrograms": assignedPrograms
   });
   return this.http.post<any>(`${environment.baseURL}/programAllocation/create/bulk`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 //getProgramCompletionStatusByEmp
 getProgramCompletionStatusByEmp(id: any) {
   return this.http.get<any>(`${environment.baseURL}/getProgramCompletionStatusByEmp/` + id)
     .pipe(map(data => {
       return data;
     }));
 }

 //sendNotificationToAssEmp
 sendNotificationToAssEmp(id: any) {
   return this.http.get<any>(`${environment.baseURL}/sendNotificationToAssEmp/` + id)
     .pipe(map(data => {
       return data;
     }));
 }

 // gettodayassignedProgram
 getTodayAssignedProgram(id: any) {
   return this.http.get<any>(`${environment.baseURL}/todayAssignedProgram/` + id)
     .pipe(map(data => {
       return data;
     }));
 }

  // getProgramActivity
  getProgramActivity() {
   return this.http.get<any>(`${environment.baseURL}/getProgramActivity`)
     .pipe(map(data => {
       return data;
     }));
 }

 // deleteAllocation
 deleteAllocation(id: any) {
   return this.http.delete<any>(`${environment.baseURL}/allocation/` + id,)
     .pipe(map(data => {
       return data;
     }));
 }

 /*********************************   UserRequests   ***********************************/
  // getAllUserRequests
  getAllUserRequests() {
   return this.http.get<any>(`${environment.baseURL}/userRequests/all`)
     .pipe(map(data => {
       return data;
     }));
 }
  // getAllUserRequests
  getPendingUserRequests() {
   return this.http.get<any>(`${environment.baseURL}/userRequests/pending`)
     .pipe(map(data => {
       return data;
     }));
 }
  // getAllUserRequests
  getSuccessUserRequests() {
   return this.http.get<any>(`${environment.baseURL}/userRequests/success`)
     .pipe(map(data => {
       return data;
     }));
 }
  // getAllUserRequests
  getRejectedUserRequests() {
   return this.http.get<any>(`${environment.baseURL}/userRequests/rejected`)
     .pipe(map(data => {
       return data;
     }));
 }

  // countByStatus
  getCountByStatus() {
   return this.http.get<any>(`${environment.baseURL}/userRequests/count`)
     .pipe(map(data => {
       return data;
     }));
 }

 // getOldUserRequests
 getOldUserRequests() {
   return this.http.get<any>(`${environment.baseURL}/userRequests/old`)
     .pipe(map(data => {
       return data;
     }));
 }

  // Update User Requests
  updateStatusUserRequests(id: any, status: any,remark:any) {
   const data = JSON.stringify({
     status: status,
     remark:remark
   });
   return this.http.put<any>(`${environment.baseURL}/userRequests/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }


 /*********************************   Support Request   ***********************************/

  // getAllSupportRequests
  getAllSupportRequests() {
   return this.http.get<any>(`${environment.baseURL}/support`)
     .pipe(map(data => {
       return data;
     }));
 }

 // getAllSupportRequests
 getAllSupportTransaction(id:any) {
   return this.http.get<any>(`${environment.baseURL}/supportTransaction/`+id)
     .pipe(map(data => {
       return data;
     }));
 }

  // updateSupportRequestStatus
  updateSupportTransactionStatus(id: any, status: any) {
   const data = JSON.stringify({
     status: status
   });
   return this.http.put<any>(`${environment.baseURL}/supportTransaction/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

  // updateSupportRequestStatus
  updateSupportRequestStatus(id: any,remark:any, status: any) {
   const data = JSON.stringify({
     status: status,
     remark:remark
   });
   return this.http.put<any>(`${environment.baseURL}/support/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

  // sendSupportEmail
  sendSupportEmail(id:any,file:any,subject: any, message: any, email:any,empId:any,salutation:any,firstName:any,lastName:any) {
   const data = JSON.stringify({
     "id":id,
     "subject": subject,
     "file":file,
     "message": message,
     "email": email,
     "employeeId":empId,
     "salutation":salutation,
     "firstName":firstName,
     "lastName":lastName
   });
   return this.http.post<any>(`${environment.baseURL}/support/mail`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }



 /*********************************   Notification   ***********************************/

 // Create Notification
 createNotification(title: any, message: any, segment: any, segmentId: any,image:any) {
   const data = JSON.stringify({
     "title": title,
     "message": message,
     "segment": segment,
     "segmentId": segmentId,
     "image": image
   });
   return this.http.post<any>(`${environment.baseURL}/notification/create`, data, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // Api Log
 apiLog() {
   return this.http.get<any>(`${environment.baseURL}/api-log-report`)
     .pipe(map(data => {
       return data;
     }));
 }

 // User Notification
 userNotification(userId: any) {
   return this.http.get<any>(`${environment.baseURL}/user/notification/` + userId, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 // Clear Notification
 clearNotification(userId: any) {
   return this.http.get<any>(`${environment.baseURL}/user/notification/clear/` + userId, { headers: { 'Content-Type': 'application/json' } })
     .pipe(map(data => {
       return data;
     }));
 }

 //Get All Notification
 getAllNotification() {
   return this.http.get<any>(`${environment.baseURL}/notification`)
     .pipe(map(data => {
       return data;
     }));
 }

}
