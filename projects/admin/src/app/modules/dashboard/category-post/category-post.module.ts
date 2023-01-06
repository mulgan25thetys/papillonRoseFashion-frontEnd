import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryPostRoutingModule } from './category-post-routing.module';
import { CategoryPostComponent } from './category-post.component';


@NgModule({
  declarations: [
    CategoryPostComponent
  ],
  imports: [
    CommonModule,
    CategoryPostRoutingModule
  ]
})
export class CategoryPostModule { }
