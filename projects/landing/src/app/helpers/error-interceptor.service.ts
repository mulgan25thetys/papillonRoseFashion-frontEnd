import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  
  constructor(private authenticationService: AuthenticationService,private router:Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          

          if ([0].indexOf(err.status) !== -1) {
            return throwError('Unable to Connect to the Server');
            this.router.navigateByUrl('/generic');
          }

          if ([401].indexOf(err.status) !== -1) {
          }

          if ([403].indexOf(err.status) !== -1) {
            this.authenticationService.logout();
          }

          if ([500].indexOf(err.status) !== -1) {
            return throwError('An server error has been occured!');
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
