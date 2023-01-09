import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { ListsComponent } from './lists/lists.component';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    PostsComponent,
    EditComponent,
    AddComponent,
    ListsComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class PostsModule { }
