import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'admin';

  constructor(public cookieService: CookieService) { }

  ngOnInit(): void {
    //this.goToNextPage();
  }
  
  goToNextPage(){

  this.cookieService.set("my-key","yourkey")
  }
}
