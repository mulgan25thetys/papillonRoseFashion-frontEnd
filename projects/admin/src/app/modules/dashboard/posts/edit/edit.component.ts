import { Component, OnInit } from '@angular/core';
import * as Editor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { NgForm } from '@angular/forms';
import { Category } from 'projects/admin/src/app/models/category';
import { Post } from 'projects/admin/src/app/models/post';
import { CategoryService } from 'projects/admin/src/app/services/blog/category.service';
import { PostService } from 'projects/admin/src/app/services/blog/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  idPost: any;
  hasPost: Boolean = false;
  nonExistingPostMessage = "This publication does not exist!";

  hasError: Boolean = false;
  errorTitle: any;
  errorMessage: any;
  selectCategoryMessage :String = "Please select a Category for the post!";

  public Editor = Editor;

  categories: Category[] = [];
  category = new Category();
  categoryName: String = "";
  isCategoryChange: Boolean = false;
  
  post = new Post();

  constructor(private cateServe: CategoryService, private postServe: PostService
    , private activedtedRoute: ActivatedRoute, private router: Router,
  private toastr:ToastrService) { }
 
  ngOnInit(): void {
    
    this.idPost = this.activedtedRoute.snapshot.params.id;
    if (this.idPost) {
      this.getAllCategories();
      this.getPost(this.idPost);
    } else {
      this.router.navigate(['/dashboard/posts/error']);
    }
  }

  getAllCategories() {
    this.cateServe.findAll().subscribe(
      res => {
        this.categories = res;
      },
      (error) => {console.log(error);
      }
    )
  }

  getPost(id: any) {
    this.postServe.getPost(id).subscribe(
      res => {
        this.hasPost = true;
        this.post = res;
      }, error => {
        this.hasPost = false;
      }
    )
  }

  onChangePostCategory(event:any ) {
    this.isCategoryChange = true;
    this.categoryName = event.target.value;
  }

  editPost() {
    if (this.isCategoryChange) {
      this.cateServe.getCategoryByName(this.categoryName).subscribe(
        res => {
          this.post.category = res;
          this.edit(this.post);
        }
      )
    } else {
      this.edit(this.post);
    }
  }

  edit(post:Post) {
    this.postServe.editPost(post).subscribe(
      () => {
        $("#btn-success-operation").click();
        this.ngOnInit();
      }, error => {
        this.deplayErrorMessage(error);
      }
    )
  }

  goToList() {
    $(".btn-close").click();
    this.router.navigate(['/dashboard/posts/lists']);
  }
  deplayErrorMessage(message:any) {
    this.hasError = true;
    this.errorMessage = message;
    this.errorTitle = "Editing Post";
    window.scrollTo(0, 0);
  }
}
