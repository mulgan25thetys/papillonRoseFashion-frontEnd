import { PostService } from './../../services/blog/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';

@Component({
  selector: 'app-recents-posts',
  templateUrl: './recents-posts.component.html',
  styleUrls: ['./recents-posts.component.css']
})
export class RecentsPostsComponent implements OnInit {

  recentsPosts: Post[] = [];

  constructor(private postServe:PostService) { }

  ngOnInit(): void {
    this.getRecentsPost();
  }

  getRecentsPost() {
    this.postServe.getRecentsPosts().subscribe(
      res => {
        this.recentsPosts = res;
        this.recentsPosts.forEach(recent => {
          this.getTimeAgoOfRecentPost(recent);
        });
      }
    )
  }

  getTimeAgoOfRecentPost(post: Post) {
    let date = new Date(post.addedAt);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    
    if (seconds < 60 && minutes ==0 && hour == 0) {
      post.recentTime = seconds + " Seconds";
    } else if (minutes <60 && hour == 0) {
      post.recentTime = minutes + " Minutes";
    } else if (hour < 24) {
      post.recentTime = hour + " Hours";
    } else {
      post.recentTime = post.addedAt.getDay() + "Day";
    }
  }
}
