import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user/user.service';
declare var $: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  authIsLocked = false;
  loading = false;
  submitted = false;
  errorMsg: string="";
  returnUrl: string;
  user = new User();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, private service: UserService) { 
    
    }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authIsLocked = this.route.snapshot.queryParams['locked'];
    if (this.authIsLocked) {
      this.user = this.authenticationService.currentUserValue;
    }
  }

  onLogin() {
    this.submitted = true;
    this.loading = true;
    $("#btn-login").prop('disabled', true);
    this.authenticationService.login(this.user.username, this.user.password).subscribe(
      data => {
        this.errorMsg = "";
            this.loading = false;
            $("#btn-login").prop('disabled', false);

              if (this.returnUrl == '/') {
                this.router.navigateByUrl("/home");
              } else {
                this.router.navigateByUrl(this.returnUrl);
              }
            
      },
      (error: HttpErrorResponse) => { 
        
        this.loading = false;
        $("#btn-login").prop('disabled', false);
        this.errorMsg = "Authentication failed, Please retry!";
      });
  } 

  showHidePassword() {
    if ($(document).find("#password").attr("type") == "password") {
      $(document).find("#password").prop("type", "text");
    } else {
      $(document).find("#password").prop("type", "password");
    }
  }

}
