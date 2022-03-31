import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  messageClassType;
  message;

  constructor(public messageService: MessagesService) { }

  ngOnInit(): void {
    this.messageService.classType
    this.messageService.messageText 

   
    
    console.log('info is' + this.messageService.messageText);
  }



}
