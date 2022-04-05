import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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






  constructor(private location: Location) { }

  ngOnInit(): void {
  }


  updateInterview(){
    //update interview
  }

  goBack(){
   this.location.back();
  }
}
