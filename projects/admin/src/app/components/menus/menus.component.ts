import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.setMenusLinkToActive();
  }

  setMenusLinkToActive() {
    return this.router.url.split("/")[2] == "menus"?"active":"";
  }
}
