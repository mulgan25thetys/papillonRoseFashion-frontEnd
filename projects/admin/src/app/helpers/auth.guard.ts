import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
          private router: Router,
          private authenticationService: AuthenticationService
      ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;

      if (currentUser) {
          // logged in so return true
        if (route.data.roles) {
          for (let i = 0; i < currentUser.roles.length; i++) {
            if (route.data.roles.indexOf(currentUser.roles[i]) === -1) {
              this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
                return false; 
            }
          }  
        }
          return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
  
}
