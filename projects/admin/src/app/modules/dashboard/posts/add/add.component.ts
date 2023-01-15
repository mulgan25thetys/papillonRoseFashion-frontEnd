import { Component, OnInit } from '@angular/core';
import { Category } from 'projects/admin/src/app/models/category';
import { Post } from 'projects/admin/src/app/models/post';
import { CategoryService } from 'projects/admin/src/app/services/blog/category.service';
import { PostService } from 'projects/admin/src/app/services/blog/post.service';
import TomSelect from 'tom-select';
import * as Editor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { NgForm } from '@angular/forms';

declare var $: any;


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  hasError: Boolean = false;
  errorTitle: any;
  errorMessage: any;
  selectCategoryMessage :String = "Please select a Category for the post!";

  public Editor = Editor;

  categories: Category[] = [];
  category = new Category();
  categoryName: String = "";
  
  post = new Post();

  constructor(private cateServe:CategoryService,private postServe:PostService) { }

  ngOnInit(): void {
    this.post.category = new Category();

    this.getAllCategories();

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

  getCategoryId(event:any) {
    console.log(event.target.getAttribute('dataid'));
    
  }

  addPost(form:NgForm) {

    console.log(this.post);
    
    if (this.categoryName == "") {
      this.deplayErrorMessage(this.selectCategoryMessage);
    } else {
      this.cateServe.getCategoryByName(this.categoryName).subscribe(
        res => {
          this.category = res;
          this.postServe.addPost(this.post, this.category.id).subscribe(
            () => {
              form.reset();
              this.ngOnInit();
            },
            error => {
              this.deplayErrorMessage(error);
            }
          )
        }
      )
    }
  }

  deplayErrorMessage(message:any) {
    this.hasError = true;
    this.errorMessage = message;
    this.errorTitle = "Adding Post";
    window.scrollTo(0, 0);
  }

  onChangePostContent( { editor }: ChangeEvent ) {
    const data = editor.getData();
    console.log( data );
  }

  selectCategory() {
    new TomSelect('#post-category', {});
  }
}
