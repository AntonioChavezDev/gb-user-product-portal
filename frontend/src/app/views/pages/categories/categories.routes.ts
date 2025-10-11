import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./categories.component').then((m) => m.CategoriesComponent),
    data: {
      title: 'Categories Page',
    },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create-category/create-category.component').then(
        (m) => m.CreateCategoryComponent
      ),
    data: {
      title: 'Create Category',
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./edit-category/edit-category.component').then(
        (m) => m.EditCategoryComponent
      ),
    data: {
      title: 'Edit Category',
    },
  },
];
