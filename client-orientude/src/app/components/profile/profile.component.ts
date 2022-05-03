import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username;
  email;
  profile: any;
  loggedInUser: any;
  isAdmin: boolean;

  constructor( public authService: AuthService) { }

  ngOnInit(): void {
     this.authService.getProfile().subscribe( res =>{
        this.profile = res;
        console.log('info is: ' +this.profile.user)

       this.username = this.profile.user.username;
       this.email = this.profile.user.email;
       
     })



     this.authService.getProfile().subscribe( res =>{
      this.loggedInUser = res;
      console.log('user is: ' +this.loggedInUser.user.role)
      if(this.loggedInUser.user.role === "admin"){
        this.isAdmin = true;
      }
      console.log('is admin is:' +this.isAdmin);

   })
  }

  

}

