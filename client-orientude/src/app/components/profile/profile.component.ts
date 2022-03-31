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

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
     this.authService.getProfile().subscribe( res =>{
        this.profile = res;
        console.log('info is: ' +this.profile.user)

       this.username = this.profile.user.username;
       this.email = this.profile.user.email;
       
     })
  }

  

}

