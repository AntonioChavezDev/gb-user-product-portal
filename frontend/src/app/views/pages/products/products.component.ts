import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonDirective, ColComponent, RowComponent } from '@coreui/angular';
import {
  TableAction,
  TableColumn,
  TableComponent,
} from '@shared/components/table/table.component';
import { ProductsService } from '@core/services/products.service';
import { Product } from '@core/models/product';

@Component({
  selector: 'app-products',
  imports: [
    TableComponent,
    ButtonDirective,
    RouterModule,
    RowComponent,
    ColComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
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
    {
      title: 'Price',
      field: 'price',
      type: 'number',
    },
    {
      title: 'Category',
      field: 'category',
    },
  ];

  products: Product[] = [];

  actions: TableAction[] = [
    {
      label: 'Edit',
      icon: 'cilPencil',
      onClick: this.editProduct.bind(this),
    },
    {
      label: 'Delete',
      icon: 'cilTrash',
      color: 'danger',
      onClick: this.deleteProduct.bind(this),
    },
  ];

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      },
    });
  }

  private editProduct(product: Product) {
    this.router.navigate(['/pages/products/edit', product.id]);
  }

  private deleteProduct(product: Product) {
    if (confirm(`Are you sure you want to delete product "${product.name}"?`)) {
      this.productService.delete(product.id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (error) => {
          console.error('Error deleting product', error);
          alert('Failed to delete product.');
        },
      });
    }
  }
}
