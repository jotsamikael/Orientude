import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  currentUrl;
  dataObtained;
  user;
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getPublicProfile(this.currentUrl.username).subscribe(res=>{
    this.dataObtained = res;
    this.user = this.dataObtained.user;

     console.log('username ix:' +this.user.username);
    })
  }

}
