import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPostComponent } from './category-post/category-post.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'menus', redirectTo: 'menus/categories-posts', pathMatch: 'full' },
  {
    path: '', component: UsersComponent,
    children: [
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
    ]
  },
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
    ]
  }, 
  {
    path: '', component: CategoryPostComponent,
    children: [
      { path: 'menus/categories-posts', loadChildren: () => import('./category-post/category-post.module').then(m => m.CategoryPostModule) }
    ]
  },
  {
    path: '', component: PostsComponent,
    children: [
       { path: 'menus/posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)  }
    ]
  },
  
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
