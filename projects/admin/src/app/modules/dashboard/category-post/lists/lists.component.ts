import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'projects/admin/src/app/services/blog/category.service';
import { Category } from '../../../../models/category';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from 'projects/admin/src/app/models/post';
import { PostService } from 'projects/admin/src/app/services/blog/post.service';

declare var $: any;

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  search: string = "";
  limit: any;
  totalElements = 0;

  confirmAction: Boolean = false;
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  categoriesPosts: Category[] = [];
  posts: Post[] = [];
  category = new Category();

  message: String = "";

  constructor(private categoryServe:CategoryService,private postServe:PostService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryServe.findAll().subscribe(
      data => {
        this.categoriesPosts = data.reverse();
      }, error => {
        console.error(error);
      }
    )
  }

  deleteCategory(id: any) {
    
    this.categoryServe.getCategory(id).subscribe(
      res => {
        this.category = res;
        this.postServe.getPostsByCategory(id).subscribe(
          data => {
            this.category.posts = data;
            if (this.category.posts.length ==0) {
              this.categoryServe.deleteCategory(id).subscribe(
                () => {
                  this.ngOnInit();
                }
              )
            } else {
              localStorage.setItem('delete-id-category', this.category.id);
              this.totalElements = this.category.posts.length;
              this.message = "Do you really want to remove "+this.totalElements+" posts in this category? What you've done cannot be undone.";
              $("#confirmModalBtn").click();
            }
          }
        )
      }, (error:HttpErrorResponse) => {
        
      }
    )
  }

  delete() {
    let id = localStorage.getItem('delete-id-category');
    this.categoryServe.deleteCategory(id).subscribe(
      () => {
        localStorage.removeItem('delete-id-category');
        $(".btn-close").click();
        this.ngOnInit();
      }, (error:HttpErrorResponse) => {
        
      }
    )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllCategories();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllCategories();
  }
}
