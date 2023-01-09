import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Post } from 'projects/admin/src/app/models/post';
import { CategoryService } from 'projects/admin/src/app/services/blog/category.service';
import { PostService } from 'projects/admin/src/app/services/blog/post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  search: string = "";
  limit: any;
  totalElements = 0;

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  posts: Post[] = [];

  constructor(private postServe: PostService,private toastr:ToastrService,
    private CateServe: CategoryService) { }

  ngOnInit(): void {
    this.findAllPosts();
  }

  findAllPosts() {
    this.postServe.findAll().subscribe(
      (data) => {
        this.posts = data;
        console.log(this.posts);
        
      }, (error: HttpErrorResponse) => {
        if (error.status != 500) {
          this.toastr.info(error.message, "Lists of posts");
        }
      }
    )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.findAllPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.findAllPosts();
  }

  getUrl(url:String) {
    return "url("+url+")";
  }
}
