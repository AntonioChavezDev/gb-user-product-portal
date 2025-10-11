import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonDirective,
  ColComponent,
  ColDirective,
  FormControlDirective,
  FormLabelDirective,
  RowComponent,
} from '@coreui/angular';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  imports: [
    ReactiveFormsModule,
    RowComponent,
    FormLabelDirective,
    ColDirective,
    ColComponent,
    FormControlDirective,
    ButtonDirective,
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
})
export class CreateCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  create() {
    if (this.categoryForm.valid) {
      this.categoriesService.create(this.categoryForm.value).subscribe({
        next: (response) => {
          alert('Category created successfully!');
          this.router.navigate(['/pages/categories']);
        },
        error: (error) => {
          console.error('Error creating category', error);
          alert('Failed to create category.');
        },
      });
    }
  }
}
