import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostService } from '../../services/blog/post.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private postServe:PostService) { }

  posts: Post[] = [];
  post = new Post();
  ngOnInit(): void {
    this.post.comments = [];
    this.post.author = new User();
    this.getRecentPost();
  }

  getBannerImage(image:String) {
    return "url("+image+")";
  }

  getRecentPost() {
    this.postServe.getRecentsPosts().subscribe(
      res => {
        this.posts = res;
        this.post = this.posts[0];
      }
    )
  }
}
 