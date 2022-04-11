import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from 'src/app/services/interview.service';

@Component({
  selector: 'app-delete-interview',
  templateUrl: './delete-interview.component.html',
  styleUrls: ['./delete-interview.component.scss']
})
export class DeleteInterviewComponent implements OnInit {


  messageClass;
  message;
  foundInterview;
  processing = false;
  dataobtained;
  currentUrl;
  interview;
  title: any;
  body: any;
  createdBy: any;
  createdAt: any;

  constructor(private activatedRoute: ActivatedRoute, private router : Router, private interviewService: InterviewService) { }

  ngOnInit(): void {
    this.currentUrl = this.activatedRoute.snapshot.params;

    this.interviewService.getSingleInterview(this.currentUrl.id).subscribe(res =>{
      this.dataobtained = res;
      
      console.log("zqfczef is" +this.dataobtained.interview.title)

      if(!this.dataobtained.success){
        this.message = this.dataobtained.message;
        this.messageClass = 'alert alert-danger';
      } else{
         
             this.title = this.dataobtained.interview.title,
             this.body = this.dataobtained.interview.body,
             this.createdBy = this.dataobtained.interview.createdBy,
            this.createdAt = this.dataobtained.interview.createdAt,
          
          this.foundInterview = true;
          console.log("found is" +this.foundInterview);

      }
    })
  }
  


  deleteInterview(){

 this.processing = true;

 this.interviewService.deleteInterview(this.currentUrl.id).subscribe(res=>{
   this.dataobtained =res;
   if(!this.dataobtained.success){
     this.message = this.dataobtained.message;
     this.messageClass = 'alert alert-danger';
    }
     else{
      this.message = this.dataobtained.message;

      this.messageClass = 'alert alert-success';
      setTimeout(() => {
        this.router.navigate(['/interview'])
      }, 2000);
     }
   
 })
}

}