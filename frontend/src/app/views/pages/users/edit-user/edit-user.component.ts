import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { User } from '@core/models/User';
import { UsersService } from '@core/services/users.service';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-edit-user',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  user!: User;
  userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.fetchUser(userId);
      }
    });
  }

  private fetchUser(username: string) {
    this.userService.getById(username).subscribe({
      next: (data) => {
        this.user = data;
        this.initForm();
      },
      error: (error) => {
        console.error('Error fetching user', error);
      },
    });
  }

  private initForm() {
    // Initialize form with this.user data
    this.userForm = this.fb.group({
      name: [this.user.name, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [''],
    });

    this.userForm.get('username')?.disable();
    this.userForm.get('email')?.disable();
  }

  edit() {
    if (this.userForm.valid) {
      this.userService.update(this.user.username, this.userForm.value).subscribe({
        next: (response) => {
          alert('User updated successfully!');
          this.router.navigate(['/pages/users']);
        },
        error: (error) => {
          console.error('Error updating user', error);
          alert('Failed to update user.');
        },
      });
    }
  }
}
