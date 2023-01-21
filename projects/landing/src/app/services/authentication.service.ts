import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { ValidationRequest } from '../utils/validationRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    apiUrl : string = environment.apiURL+"/prf/auth/";

  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
 
    login(username: string, password: string) {
      
        return this.http.post<any>(this.apiUrl+"login", { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    } 

    confirm() {
        this.router.navigate(['/']);
    }

  isClient() {
        let isClient = false;
        for (let i = 0; i < this.currentUserValue?.roles.length; i++) {
            if (this.currentUserValue.roles[i].name === "ROLE_CLIENT") {
                isClient = true;
            }
        }
        return isClient;
  }
  isSuperAdmin() {
        let isSuperAdmin = false;
        for (let i = 0; i < this.currentUserValue?.roles.length; i++) {
            if (this.currentUserValue.roles[i].name === "ROLE_ADMIN") {
                isSuperAdmin = true;
            }
        }
        return isSuperAdmin;
  }

  isClientManager() {
        let manager = false;
        for (let i = 0; i < this.currentUserValue?.roles.length; i++) {
            if (this.currentUserValue.roles[i].name === "ROLE_AGENT") {
                manager = true;
            }
        }
        return manager;
  }
   
  isAdmin() {
      let isAdmin = false;
      
      for (let i = 0; i < this.currentUserValue?.roles.length; i++) {
          if (   this.currentUserValue.roles[i].name === "ROLE_ADMIN"
              || this.currentUserValue.roles[i].name === "ROLE_AGENT") {
              isAdmin = true;
          }
      }
      return isAdmin;
  }

  updateCurrentUSerAccount(user:User){
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
  }

  confirmAccount(): Observable<any>{
    return this.http.get<any>(this.apiUrl+"confirm");
  }

  forgotPassword(user:User): Observable<any>{
    return this.http.post<User>(this.apiUrl+"forgot-password",user)
  }

  validCode(validationRequest:ValidationRequest): Observable<any>{
    return this.http.put<User>(this.apiUrl+"code-validation",validationRequest,)
  }

  resetPassword(user:User): Observable<any>{
    return this.http.put<User>(this.apiUrl+"reset-password",user)
  }
    
  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
     
      this.router.navigate(['/']);
      //location.reload();
  }
}