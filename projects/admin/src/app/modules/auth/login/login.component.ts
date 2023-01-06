import { UserService } from './../../../services/user/user.service';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2'; 
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authIsLocked = false;
  loading = false;
  submitted = false;
  returnUrl: string;
  user = new User();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,private service:UserService) { }

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
            this.loading = false;
            $("#btn-login").prop('disabled', false);

            if ((data?.roles.indexOf("ROLE_ADMIN") !== -1
              || data?.roles.indexOf("ROLE_AGENT") !== -1
            )) {
        
              if (this.returnUrl == '/') {
                this.showAlert(this.user.username, '/dashboard');
              } else {
                 this.showAlert(this.user.username, this.returnUrl);
              }
            } 
            
      },
      (error: HttpErrorResponse) => { 
            this.loading = false;
              $("#btn-login").prop('disabled', false);
                this.loading = false;
            });
  }
  
  showAlert(username:String,navigateUrl:String){
    swal.fire({
      title: 'Connecté(e) !',
      text: "Bienvenu(e) "+username+" !",
      icon: 'success',
      showConfirmButton: false,
      timer: 2000
    }).then(() =>{
      this.router.navigate([navigateUrl]);
    })
  }

  showHidePassword() {
    if ($(document).find("#password").attr("type") == "password") {
      $(document).find("#password").prop("type", "text");
    } else {
      $(document).find("#password").prop("type", "password");
    }
  }
} 
