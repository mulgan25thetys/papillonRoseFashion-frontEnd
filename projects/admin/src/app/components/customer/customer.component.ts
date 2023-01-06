import { Component, OnInit } from '@angular/core';
import { User } from 'projects/admin/src/app/models/user';
import { AuthenticationService } from 'projects/admin/src/app/services/authentication.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: User;
  roleName: any;
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
    if (this.auth.currentUserValue != null) {
      this.customer = this.auth.currentUserValue;
      this.roleName = this.customer.roles[0].split("_")[1];
    }
  }
  
  getProfile(url:String) {
    return "url("+url+")";
  }

  onLogout() {
    this.auth.logout();
  }
}
