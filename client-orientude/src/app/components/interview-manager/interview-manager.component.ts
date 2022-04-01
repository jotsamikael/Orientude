import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interview-manager',
  templateUrl: './interview-manager.component.html',
  styleUrls: ['./interview-manager.component.scss']
})
export class InterviewManagerComponent implements OnInit {

  newPost = false;
  reloading = false;
  constructor() { }

  ngOnInit(): void {
  }

  addNewPost(){
    this.newPost = true;
  }

  reloadPost(){
    this.reloading = true;
//GET INTERVIEWS


    setTimeout(() => {
      this.reloading = false;

    }, 4000);
  }


  draftComment(){
    
  }

}
