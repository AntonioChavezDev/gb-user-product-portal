import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '@core/models/User';
import { UsersService } from '@core/services/users.service';
import {
  TableAction,
  TableColumn,
  TableComponent,
} from '@shared/components/table/table.component';

@Component({
  selector: 'app-users',
  imports: [TableComponent, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  columns: TableColumn[] = [
    {
      title: 'username',
      field: 'username',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Email',
      field: 'email',
    },
  ];

  users: User[] = [];

  actions: TableAction[] = [
    {
      label: 'Edit',
      icon: 'cilPencil',
      onClick: this.editUser.bind(this),
    },
    {
      label: 'Delete',
      icon: 'cilTrash',
      color: 'danger',
      onClick: this.deleteUser.bind(this),
    },
  ];

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.usersService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users', error);
      },
    });
  }

  private editUser(user: User) {
    this.router.navigate(['/pages/users/edit', user.username]);
  }

  private deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete user "${user.username}"?`)) {
      this.usersService.delete(user.username).subscribe({
        next: () => {
          this.loadData();
        },
        error: (error) => {
          console.error('Error deleting user', error);
          alert('Failed to delete user.');
        },
      });
    }
  }
}
