import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  domain = "http://localhost:3000";
  options;
  authotoken;

  constructor(private http: HttpClient) { }

  

  loadToken(){
    this.authotoken = localStorage.getItem('token');
  }

  createAuthenticationHeader(){
    this.loadToken()
    let headers = new HttpHeaders({
      
     'Content-type': 'application/json',
     'authorization': this.authotoken 
    
    });
  
    this.options = {
      headers: headers
    }
  }


getInterviews(){
  this.createAuthenticationHeader();
  return this.http.get(this.domain + '/interviewRoute/getInterviews/', this.options)
 }


 postNewInterview(interview){
   this.createAuthenticationHeader();
   return this.http.post(this.domain + '/interviewRoute/newInterview/', interview, this.options )
 }

 getSingleInterview(id){
   this.createAuthenticationHeader();
   return this.http.get(this.domain+ '/interviewroute/singleinterview/'+id,  this.options)
 }


 updateInterview(interview){
   this.createAuthenticationHeader();
   return this.http.put(this.domain + '/interviewroute/updateinterview/', interview, this.options);
 }


 deleteInterview(id){
  this.createAuthenticationHeader();
   return this.http.delete(this.domain+ '/interviewroute/deleteInterview/'+id, this.options)
 }

 likeInterview(id){
   const interviewData = {id: id}
   return this.http.put(this.domain+ '/interviewroute/likeInterview/',interviewData,this.options);
 }
 

 disLikeInterview(id){
  const interviewData = {id: id}
  return this.http.put(this.domain+ '/interviewroute/likeInterview/',interviewData,this.options);
}

comment(id, comment){
  const interviewData = {id: id, comment: comment}
  this.createAuthenticationHeader();
 return this.http.post(this.domain + '/interviewroute/comment/', interviewData, this.options)

}


}