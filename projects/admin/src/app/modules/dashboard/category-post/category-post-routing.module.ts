import { ErrorPageComponent } from './error-page/error-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { CategoryPostComponent } from './category-post.component';
import { EditComponent } from './edit/edit.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: 'lists',component:ListsComponent},
  { path: 'add-new',component:AddComponent},
  { path: 'edit-category/:id', component: EditComponent },
  { path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryPostRoutingModule { }
