import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { 
       if (this.authenticationService.currentUserValue) {
         this.router.navigateByUrl("/");
       }
    }

  ngOnInit(): void {
  }

}
