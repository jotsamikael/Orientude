import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/messages.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(public authService: AuthService, private router: Router,private messageService: MessagesService) { }

  ngOnInit(): void {

   // console.log('is token expired:' +this.authService.loggedIn());

  }

  Onlogout(){
    this.authService.logout();
    this.messageService.classType = 'alert alert-info p-2';
    this.messageService.messageText = 'You are logged out';
    setTimeout(() => {
      this.messageService.messageText = " "
      this.messageService.classType = ' ';

    }, 2000);

    this.router.navigate(['/']);

  }

}
