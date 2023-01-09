import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category } from 'projects/admin/src/app/models/category';
import { CategoryService } from 'projects/admin/src/app/services/blog/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  hasError: Boolean = false;
  errorTitle: any;
  errorMessage: any;

  id: any;
  category = new Category();

  constructor(private cateServe: CategoryService,private toastr:ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id) {
      this.id = this.activatedRoute.snapshot.params.id;
      this.getCategory(this.id);
    } else {
      this.router.navigate(['/dashboard/categories-posts/error']);
    }
  }

  getCategory(id) {
    this.cateServe.getCategory(id).subscribe(
      (data) => {
        this.category = data;
      },(error: HttpErrorResponse) => {
        if (error.status == 500) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = error;
        }
        this.toastr.error(this.errorMessage, "Editing Category");
        this.router.navigate(['/dashboard/categories-posts/error']);
      }
    )
  }

  editCategory() {
    this.cateServe.editCategory(this.category).subscribe(
      () => {
        this.router.navigate(['/dashboard/categories-posts/lists']);
      }, (error: HttpErrorResponse) => {
        this.hasError = true;
        this.errorTitle = "Editing category";
        if (error.status == 500) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = error;
        }
      }
    )
  }
}
