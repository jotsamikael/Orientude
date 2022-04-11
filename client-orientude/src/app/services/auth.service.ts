import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

 

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

   logout(){
     this.authotoken = null;
     this.user = null;
     console.log('is token expired:' +this.jwtHelper.isTokenExpired());
     localStorage.clear();
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


   loggedIn(){


    this.authotoken = localStorage.getItem('token')
    
    if(this.authotoken){
      return true;
    }
    else{
      return false;
    }
 

    //console.log('is token expired:' +this.jwtHelper.isTokenExpired());
    //return this.jwtHelper.isTokenExpired();
    
  }


  getPublicProfile(username){
    this.createAuthenticationHeader();
    return this.http.get(this.domain + '/authentication/publicProfile/' +username, this.options)
  }
}
