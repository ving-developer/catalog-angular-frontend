import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: 'Logout' }
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: { title: 'Categories List' }
  },
  {
    path: 'category-details/:id',
    component: CategoryDetailsComponent,
    data: { title: 'Category Details' }
  },
  {
    path: 'category-create',
    component: CategoryCreateComponent,
    data: { title: 'Create Category' }
  },
  {
    path: 'category-update/:id',
    component: CategoryUpdateComponent,
    data: { title: 'Update Category' }
  },
  {
    path: '',
    redirectTo: '/categories',
    pathMatch: 'full',
    data: { title: 'Category Details' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
