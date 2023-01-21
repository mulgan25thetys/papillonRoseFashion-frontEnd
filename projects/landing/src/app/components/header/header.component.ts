import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CategoryService } from '../../services/blog/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: Boolean = false;

  categories : Category[] = [];

  constructor(private auth: AuthenticationService,private cateServe:CategoryService) { 
    if (this.auth.currentUserValue) {
      this.isLogged = true;
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.cateServe.getCategories().subscribe(
      res => {
        this.categories = res;
        
      }
    )
  }

  OnLogout() {
    this.isLogged = false;
    this.auth.logout();
  }
}
