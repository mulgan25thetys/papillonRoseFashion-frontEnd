import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/blog/post.service';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { Category } from '../../models/category';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  viewedPost = new Post();

  constructor(private postServe: PostService,private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
    this.viewedPost.author = new User();
    this.viewedPost.category = new Category();
    this.viewedPost.comments = [];
    this.viewedPost.galleries = [];
    
    if (this.activatedRoute.snapshot.params.postname) {
 
        this.viewPost(this.activatedRoute.snapshot.params.postname);
    }
  }

  viewPost(id:any) {
    this.postServe.viewPost(id).subscribe(
      res => {
        this.viewedPost = res;
      }, error => {
        this.router.navigateByUrl('/post-not-found')
      }
    )
  }
}
