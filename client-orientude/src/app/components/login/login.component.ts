import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataObtained: any;

  emailValid= false;
  emailMessage;
  
  usernameValid= false;
  usernameMessage;
  
  message;
  messageClass;

  previousURL;
  
  processing = false;
  
    form = new FormGroup({
  
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      
  
  
      password: new FormControl('', [Validators.required,  Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*?[\d])(?=.*?[\W]).{6,15}$/),Validators.maxLength(15)]),
           
  
    });
  
    
  
    get f(){
  
      return this.form.controls;
  
    } 
  
    constructor( private authService: AuthService, private router: Router, private authguard: AuthGuard) { 
    }
  

   disableForm(){
     this.form.controls['username'].disable();
     this.form.controls['password'].disable();
  
   }
  
  
    
  enableForm(){
     this.form.controls['username'].enable();
     this.form.controls['password'].enable();
  
  }
  

            onSubmitForm(){
                this.processing = true;

                this.disableForm()

                const user = {
                  username: this.form.get('username').value,

                  password: this.form.get('password').value
  
                }
                this.authService.login(user).subscribe( res =>{

                  this.dataObtained = res

                  if(!this.dataObtained.success){

                    this.messageClass = 'alert alert-danger';

                    this.message = this.dataObtained.message;

                    this.processing = false;

                    this.enableForm();

                  } else{

                    this.messageClass = 'alert alert-success';

                    this.message = this.dataObtained.message;

                    this.authService.storeUserData(this.dataObtained.user, this.dataObtained.token);

                    setTimeout(() => {

                      if(this.previousURL){
                        this.router.navigate([this.previousURL])
                      } 
                      else{
                        
                        this.router.navigate(['/profile'])
                      }
                    }, 1500);
                  }
                } )
  
  
          }
  

  ngOnInit(): void {
   if(this.authguard.redirectURL){
     this.messageClass = 'alert alert-danger';
     this.message = 'You must be logged to view this page';
     this.previousURL = this.authguard.redirectURL;

     this.authguard.redirectURL = undefined;
   }
  }

}
