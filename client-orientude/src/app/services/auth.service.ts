import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

domain = "http://localhost:3000";

authotoken;

user;

options;


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

loadToken(){
  this.authotoken = localStorage.getItem('token');
}

  constructor(private http: HttpClient) { }

  registerUser(user){
    return this.http.post(this.domain+ '/authentication/register', user)
  }

  checkEmailIsUnique(email){
    return this.http.get(this.domain + '/authentication/checkEmail/' + email)
    }

  checkUsernameIsUnique(username){
      return this.http.get(this.domain + '/authentication/checkUsername/' + username)
   }

   login(user){
     return this.http.post(this.domain +'/authentication/login/', user)
   }

   storeUserData(user, token){
     localStorage.setItem('token', token);
     localStorage.setItem('user', JSON.stringify(user));

     this.authotoken = token;
     this.user = user;

   }

   getProfile(){
     this.createAuthenticationHeader();
     return this.http.get(this.domain +'/authentication/profile/', this.options)
   }
}
