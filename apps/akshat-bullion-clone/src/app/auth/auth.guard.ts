import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserDataService } from '../services/rememberData.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public rememberdata: UserDataService) { }

  canActivate(){
    if (this.rememberdata.userlogin === true) {
      return true
    }
    else {
      return this.router.createUrlTree(['']);
    }
  }
}
