import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { PageNotFoundComponent } from './helpers/error/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  {
    path: '', component: CategoryComponent,
    children: [
      { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) }
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
