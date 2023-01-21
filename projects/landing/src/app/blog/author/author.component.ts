import { User } from 'projects/landing/src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'projects/landing/src/app/services/user/user.service';
import { PostService } from '../../services/blog/post.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  author = new User();
  constructor(private postServe:PostService) { }

  ngOnInit(): void {
    this.getOwner();
  }

  getOwner() {
    this.postServe.getOwner().subscribe(
      res => {
        this.author = res;
      }
    )
  }

}
