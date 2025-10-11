import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./users.component').then((m) => m.UsersComponent),
    data: {
      title: 'Users',
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./edit-user/edit-user.component').then(
        (m) => m.EditUserComponent
      ),
    data: {
      title: 'Edit User',
    },
  },
];
