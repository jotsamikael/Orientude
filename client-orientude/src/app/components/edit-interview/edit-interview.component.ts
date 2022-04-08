import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from 'src/app/services/interview.service';

@Component({
  selector: 'app-edit-interview',
  templateUrl: './edit-interview.component.html',
  styleUrls: ['./edit-interview.component.scss']
})
export class EditInterviewComponent implements OnInit {
  messageClass;
  message;
  processing = false;

  interview:{
    title: string,
    body: string
  }


  currentUrl;
  dataObtained;
  loading = false;


  constructor(private location: Location, 
     private activatedRoute: ActivatedRoute,
      private interviewService: InterviewService,
      private router: Router) { }

  ngOnInit(): void {
   
    this.currentUrl = this.activatedRoute.snapshot.params;

    this.interviewService.getSingleInterview(this.currentUrl.id).subscribe(res=>{

      this.dataObtained = res;

      if(!this.dataObtained.success){
        this.message = this.dataObtained.message;
        this.messageClass = 'alert alert-danger'
      } 

      else {

      this.interview = this.dataObtained.interview;
      this.loading = false;
     
      }
    })
  }


  updateInterview(){
    this.processing = true;
    
    //update interview
    this.interviewService.updateInterview(this.interview).subscribe( res =>{
      this.dataObtained = res;

      if(!this.dataObtained){

        this.message = this.dataObtained.message;

        this.messageClass = 'alert alert-danger';

        this.processing = false;
      } else{
       this.messageClass = 'alert alert-success';
       this.message = this.dataObtained.message;

       setTimeout(() => {
         this.router.navigate(['/interview'])
       }, 2000);
      }
    })
  }

  goBack(){
   this.location.back();
  }
}
