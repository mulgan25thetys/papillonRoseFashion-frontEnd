import { ErrorComponent } from './error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { PostsComponent } from './posts/posts.component';
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
  { path: 'archive', component: PostsComponent },
  { path: 'category', component: PostsComponent },
  { path: 'post-not-found',component:ErrorComponent},
  { path: ':postname', canActivate: [AuthGuard], data: { roles: ['ROLE_CLIENT', 'ROLE_ADMIN', 'ROLE_AGENT'] }, component: SinglePostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
