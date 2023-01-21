import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/blog/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Gallery } from '../../models/gallery';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postServe:PostService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.postServe.findAll().subscribe(
      data => {
        this.posts = data;
        this.posts.forEach(post => {
          post.image = post.galleries.find(g => g.isDefault == true);
        });
        
      }
    )
  }

  getPostContent(content) {
    if (content.length > 220) {
      return content.substring(0, 220)+"...";
    } else {
      return content;
    }
  }
}
