import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InterviewService } from 'src/app/services/interview.service';

import { AngularEditorConfig} from '@kolkov/angular-editor';



@Component({
  selector: 'app-interview-manager',
  templateUrl: './interview-manager.component.html',
  styleUrls: ['./interview-manager.component.scss']
})
export class InterviewManagerComponent implements OnInit {

  newPost = false;
  reloading = false;
  processing = false;
  messageClass;
  message;


  dataObtained: any;

  emailValid= false;
  emailMessage;
  
  titleValid= false;
  titleMessage;

  bodyValid= false;
  bodyMessage

  userProfile;
  interviews;

  
  constructor(private authService: AuthService, private interviewService : InterviewService) {

    



   }

  ngOnInit(): void {

    this.authService.getProfile().subscribe(res =>{
      this.userProfile = res;
      console.log('username interview is: ' +this.userProfile.user.username);
    
    })

    this.getAllInterviews();
  }

  addNewPost(){
    this.newPost = true;
  }


  getAllInterviews(){
  this.interviewService.getInterviews().subscribe(res =>{
    this.dataObtained = res;
    console.log('scvzve ' +this.dataObtained.interview)
    this.interviews = this.dataObtained.interview;
  })
  }

  reloadPost(){
    this.reloading = true;
    //GET INTERVIEWS
   this.getAllInterviews();

    setTimeout(() => {
      this.reloading = false;

    }, 4000);
  }


  draftComment(){
    
  }


  form = new FormGroup({

    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
    
    body: new FormControl('', [Validators.required, Validators.minLength(21)  , Validators.maxLength(1000)]),

   // createdBy: new FormControl('', [Validators.required,  Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*?[\d])(?=.*?[\W]).{6,15}$/),Validators.maxLength(15)]),
       



  });

  

  get f(){

    return this.form.controls;

  } 



  disableForm(){
    this.form.controls['title'].disable();
    this.form.controls['body'].disable();
   
 
  }
 
 
   
 enableForm(){
    this.form.controls['title'].enable();
    this.form.controls['body'].enable();
 
 }


  onSubmitForm(){
    this.processing = true;
    this.disableForm();

    const interview = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.userProfile.user.username
    }

    this.interviewService.postNewInterview(interview).subscribe(res =>{
      this.dataObtained = res;
       console.log("data ob : " +this.dataObtained.message)
      if(!this.dataObtained.success){

        this.messageClass = 'alert alert-danger';

        this.message = this.dataObtained.message;

        this.processing = false;

        this.enableForm();
      } else{
        
        this.messageClass = 'alert alert-success';

        this.message = this.dataObtained.message;
        
        setTimeout(() => {
          this.newPost = false;

          this.processing = false;

          this.message = false;

          this.form.reset();

          this.enableForm();
          console.log("reached2")
          
        }, 2000);

      }
    })
  }


  goBack(){
    window.location.reload();
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
    }

  
  likeInterview(id){
    this.interviewService.likeInterview(id).subscribe(res=>{
      this.dataObtained = res;
      console.log('message is: ' +this.dataObtained.message);
      
      this.getAllInterviews();
    })
  }


  disLikeInterview(id){
    this.interviewService.disLikeInterview(id).subscribe(res=>{
      this.getAllInterviews();
    })
  }
}

