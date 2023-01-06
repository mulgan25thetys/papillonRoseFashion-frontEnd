import { AuthComponent } from './modules/auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PageNotFoundComponent } from './helpers/error/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',redirectTo:'dashboard/u/index',pathMatch:'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }
    ]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'dashboard', canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN','ROLE_AGENT'] }, loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) }
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
