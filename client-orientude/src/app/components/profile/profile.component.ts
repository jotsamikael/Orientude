import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;
  profile: any;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
     this.authService.getProfile().subscribe( res =>{
        this.profile = res;
       this.user = this.profile.user;
       
     })
  }

}
