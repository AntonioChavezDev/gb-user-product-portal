import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../../core/models/product';
import { CommonModule } from '@angular/common';
import {
  ButtonDirective,
  ColComponent,
  ColDirective,
  FormLabelDirective,
  FormControlDirective,
  RowComponent,
  FormSelectDirective,
} from '@coreui/angular';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from '../../../core/models/category';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RowComponent,
    FormLabelDirective,
    ColDirective,
    ColComponent,
    FormControlDirective,
    ButtonDirective,
    FormSelectDirective,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() product!: Product;
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<Product>();

  productForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.loadCategories();
    if (!this.isEditMode) {
      this.initForm();
    }
  }

  ngOnChanges() {
    if (this.product) {
      this.initForm();
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.getRawValue();
      this.formSubmit.emit(formValue);
    }
  }

  private initForm() {
    this.productForm = this.fb.group({
      id: [this.product?.id || null],
      name: [this.product?.name || '', Validators.required],
      description: [this.product?.description || '', Validators.required],
      price: [
        this.product?.price || null,
        [Validators.required, Validators.min(0)],
      ],
      category: [this.product?.category || null, Validators.required],
    });
    this.productForm.get('id')?.disable();
  }

  private loadCategories() {
    this.categoriesService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories', error);
      },
    });
  }
}
