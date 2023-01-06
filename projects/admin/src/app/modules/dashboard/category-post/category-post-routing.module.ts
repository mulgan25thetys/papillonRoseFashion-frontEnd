import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPostComponent } from './category-post.component';

const routes: Routes = [{ path: '', component: CategoryPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryPostRoutingModule { }
