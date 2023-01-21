import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BlogComponent } from './blog/blog.component';
import { GenericComponent } from './generic/generic.component';
import { PageNotFoundComponent } from './helpers/error/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  {
    path: 'home',component:HomeComponent
  },
  {
    path: 'generic',component:GenericComponent
  },
  {
    path: '', component: AuthComponent,
    children: [
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, 
    ]
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
