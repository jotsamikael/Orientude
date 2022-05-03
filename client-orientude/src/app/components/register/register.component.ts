import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

check = false;

dataObtained: any;

emailValid= false;
emailMessage;

usernameValid= false;
usernameMessage;

message;
messageClass;

processing = false;

  form = new FormGroup({

    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    

    email: new FormControl('', [Validators.required, Validators.email, , Validators.maxLength(30)]),
    
   role: new FormControl(),

    password: new FormControl('', [Validators.required,  Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*?[\d])(?=.*?[\W]).{6,15}$/),Validators.maxLength(15)]),
       
    confirmPassword: new FormControl('', [Validators.required]),



  }, this.passwordMatchValidator);

  

  get f(){

    return this.form.controls;

  } 

  constructor( private authService: AuthService, private router:Router) { 
  }

   passwordMatchValidator(g: FormGroup) {
     const pass = g.controls.password.value;
     const passConf = g.controls.confirmPassword.value;

    return g.get(pass) === g.get(passConf)
       ? null : {'mismatch': true};
 }



 disableForm(){
   this.form.controls['username'].disable();
   this.form.controls['email'].disable();
   this.form.controls['role'].disable();
   this.form.controls['password'].disable();
   this.form.controls['confirmPassword'].disable();

 }


  
enableForm(){
   this.form.controls['username'].enable();
   this.form.controls['email'].enable();
   this.form.controls['role'].enable();
   this.form.controls['password'].enable();
   this.form.controls['confirmPassword'].enable();

}

  checked(){
        if(this.check==false)
        this.check = true;
        else
        this.check = false;
         }

            onSubmitForm(){
              this.processing = true;
              this.disableForm()
              const user = {
                username: this.form.get('username').value,
                email: this.form.get('email').value,
                role: this.form.get('role').value,

                password: this.form.get('password').value

              }

            this.authService.registerUser(user).subscribe(data =>{

              this.dataObtained = data;

            if(!this.dataObtained.success){
              this.processing = false;
              this.enableForm()
              this.messageClass = "alert alert-danger"
              this.message = this.dataObtained.message;

            } else{
              this.messageClass = "alert alert-success"
              this.message = this.dataObtained.message;
              setTimeout(() => {
               
                this.router.navigate(['/login']);
                
              }, 1500);
            }
            })

        }



     

        checkEmailIsUnique(){
          const email =  this.form.get('email').value;

          return this.authService.checkEmailIsUnique(email).subscribe(res => {

            this.dataObtained = res;

            if(!this.dataObtained.success){
              this.emailValid = false;
              this.emailMessage = this.dataObtained.message;
            } else{
              this.emailValid = true;
              this.emailMessage = this.dataObtained.message;
            }
          });

        }

        checkUsernameIsUnique(){
          const username =  this.form.get('username').value;

          console.log("it is:" +username)
          
          return this.authService.checkUsernameIsUnique(username).subscribe(res =>{
            this.dataObtained = res;
            console.log('data is:' + this.dataObtained.message)

            if(!this.dataObtained.message){
              this.usernameValid = false;
              this.usernameMessage = "Username is required";
            } else{
            if(!this.dataObtained.success){

              this.usernameValid = false;
              this.dataObtained.message;

            } else{
              this.usernameValid = true;
               this.dataObtained.message;
            }
          }
            
          })
        }
  ngOnInit(): void {

  }

}
