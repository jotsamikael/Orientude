import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
redirectURL;


    constructor(private authService: AuthService, private router: Router) { }


    canActivate(router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot){

        if(this.authService.loggedIn()){
            this.router.navigate(['/'])
            return false;
        } else {
            return true;
        }
    }
  }