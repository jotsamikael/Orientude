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

}