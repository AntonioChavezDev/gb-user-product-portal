import { Component, OnInit } from '@angular/core';
import { Category } from '@core/models/category';
import { CategoriesService } from '@core/services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-category',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RowComponent,
    FormLabelDirective,
    ColDirective,
    ColComponent,
    FormControlDirective,
    ButtonDirective,
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
})
export class EditCategoryComponent implements OnInit {
  category!: Category;
  categoryForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const categoryId = params.get('id');
      if (categoryId) {
        this.fetchCategory(parseInt(categoryId, 10));
      }
    });
  }

  private fetchCategory(id: number) {
    this.categoriesService.getById(id).subscribe({
      next: (data) => {
        this.category = data;
        this.initForm();
      },
      error: (error) => {
        console.error('Error fetching category', error);
      },
    });
  }

  private initForm() {
    // Initialize form with this.category data
    this.categoryForm = this.fb.group({
      id: [this.category.id, Validators.required],
      name: [this.category.name, Validators.required],
      description: [this.category.description, Validators.required],
    });

    this.categoryForm.get('id')?.disable();
  }

  edit() {
    if (this.categoryForm.valid) {
      this.categoriesService
        .update(this.category.id, this.categoryForm.value)
        .subscribe({
          next: (response) => {
            alert('Category updated successfully!');
            this.router.navigate(['/pages/categories']);
          },
          error: (error) => {
            console.error('Error updating category', error);
            alert('Failed to update category.');
          },
        });
    }
  }
}
