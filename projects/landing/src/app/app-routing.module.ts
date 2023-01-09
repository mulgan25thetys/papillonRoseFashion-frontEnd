import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { PageNotFoundComponent } from './helpers/error/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  {
    path: '', component: BlogComponent,
    children: [
      { path: '', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) }
    ]
  }, 
  {
    path: '**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
