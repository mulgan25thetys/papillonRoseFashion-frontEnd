import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryPostRoutingModule } from './category-post-routing.module';
import { CategoryPostComponent } from './category-post.component';
import { ListsComponent } from './lists/lists.component';
import { AddComponent } from './add/add.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    CategoryPostComponent,
    ListsComponent,
    AddComponent,
    EditComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    CategoryPostRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class CategoryPostModule { }
