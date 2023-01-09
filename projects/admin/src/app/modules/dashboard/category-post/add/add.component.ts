import { Category } from './../../../../models/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'projects/admin/src/app/services/blog/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  hasError: Boolean = false;
  errorTitle: any;
  errorMessage: any;
  category = new Category();

  constructor(private cateServe:CategoryService,private router:Router) { }

  ngOnInit(): void {
    this.category.posts = [];
  }

  addCategory() {
    this.cateServe.addCategory(this.category).subscribe(
      () => {
        this.router.navigate(['/dashboard/categories-posts/lists']);
      }, (error: HttpErrorResponse) => {
        this.hasError = true;
        this.errorTitle = "Adding category";
        if (error.status == 500) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = error;
        }
      }
    )
  }
}
