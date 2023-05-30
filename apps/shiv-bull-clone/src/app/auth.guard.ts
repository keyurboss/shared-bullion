import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { loginServices } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public rememberdata: loginServices, private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (this.rememberdata.isUserLogin === true) {
        console.log();
        return true;
        
          }
            else {
            return this.router.createUrlTree(['']);
            }
        
  }
  
}


// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { loginServices } from './services/login.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(public router: Router, public rememberdata: loginServices) { }
//   canActivate(
//     router: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       return true;
//   //   if (this.rememberdata.isUserLogin === true) {
//   // console.log();
    
//   //   }
//   //     else {
//   //     return this.router.createUrlTree(['']);
//   //     }
//   }
  
// }
