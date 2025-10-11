import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
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
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../core/models/User';
import { UsersService } from '../../../core/services/users.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
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
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required],
    });
  }

  register() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      const userData: User = this.registerForm.value;
      this.userService.create(userData).subscribe({
        next: (response: User) => {
          alert('Registration successful! You can now log in.');
          this.registerForm.reset();
        },
        error: (error: any) => {
          console.error('Registration error', error);
          alert('Registration failed. Please try again.');
        },
      });
    }
  }
}
