import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { ComponentsModule } from '../components/components.module';
import { RecentsPostsComponent } from './recents-posts/recents-posts.component';
import { CategoryComponent } from './category/category.component';
import { AuthorComponent } from './author/author.component';
import { SearchComponent } from './search/search.component';
import { PostsComponent } from './posts/posts.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    BlogComponent,
    RecentsPostsComponent,
    CategoryComponent,
    AuthorComponent,
    SearchComponent,
    PostsComponent,
    SinglePostComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ComponentsModule
  ],
  exports: [RecentsPostsComponent,CategoryComponent,AuthorComponent,SearchComponent,PostsComponent]
})
export class BlogModule { }
