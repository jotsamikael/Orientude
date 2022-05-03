import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { SchoolsService } from '../services/schools.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  messageClassType;
  message;

  dataObtained;
  schools;
  school;

  orderHeader: String = '';


  constructor(public messageService: MessagesService, private schoolsService: SchoolsService) { }

  ngOnInit(): void {
    this.messageService.classType
    this.messageService.messageText 

     this.schoolsService.getAllSchools().subscribe(res=>{
     this.dataObtained = res;
     this.schools =   this.dataObtained.school;
    
   })
    
  }

sort(headerName: String){
  this.orderHeader = headerName;

}

}
