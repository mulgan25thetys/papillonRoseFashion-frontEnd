import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  
  constructor(private authenticationService: AuthenticationService,private router:Router,private toastr:ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          
          if ([401].indexOf(err.status) !== -1) {
            this.toastr.error("Authentication failed! Please try again", "Authentification");
          }

          if ([403].indexOf(err.status) !== -1) {
            this.toastr.error("You are not authorized to access this resource.", "Authentification");
            this.authenticationService.logout();
          }

          if ([500].indexOf(err.status) !== -1) {
           // this.router.navigateByUrl('/internal-server-error');
            this.toastr.warning("An internal server error occurred", "Internal server error");
          }

          if ([504].indexOf(err.status) !== -1) {
            if (this.authenticationService.currentUserValue) {
              localStorage.removeItem('currentUser');

              this.authenticationService.currentUser = null; 
              location.reload();
              this.router.navigateByUrl('/dashboard');
            }
          }

            const error = err.error?.message || err.statusText;
            return throwError(error);
        }))
    }
}
