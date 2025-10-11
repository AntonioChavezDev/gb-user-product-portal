import { Component, OnInit } from '@angular/core';
import { ButtonDirective, ColComponent, RowComponent } from '@coreui/angular';
import {
  TableAction,
  TableColumn,
  TableComponent,
} from '../../../shared/components/table/table.component';
import { Category } from '../../../core/models/category';
import { CategoriesService } from '../../../core/services/categories.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [
    TableComponent,
    ButtonDirective,
    RouterModule,
    RowComponent,
    ColComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  columns: TableColumn[] = [
    {
      title: 'ID',
      field: 'id',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Description',
      field: 'description',
    },
  ];

  categories: Category[] = [];

  actions: TableAction[] = [
    {
      label: 'Edit',
      icon: 'cilPencil',
      onClick: this.editCategory.bind(this),
    },
    {
      label: 'Delete',
      icon: 'cilTrash',
      color: 'danger',
      onClick: this.deleteCategory.bind(this),
    },
  ];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.categoriesService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      },
    });
  }

  private editCategory(category: Category) {
    this.router.navigate(['/pages/categories/edit', category.id]);
  }

  private deleteCategory(category: Category) {
    if (
      confirm(`Are you sure you want to delete category "${category.name}"?`)
    ) {
      this.categoriesService.delete(category.id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (error) => {
          console.error('Error deleting category', error);
          alert('Failed to delete category.');
        },
      });
    }
  }
}
