import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products.component').then((m) => m.ProductsComponent),
    data: {
      title: 'Products Page',
    },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create-product/create-product.component').then(
        (m) => m.CreateProductComponent
      ),
    data: {
      title: 'Create Product',
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./edit-product/edit-product.component').then(
        (m) => m.EditProductComponent
      ),
    data: {
      title: 'Edit Product',
    },
  },
];
