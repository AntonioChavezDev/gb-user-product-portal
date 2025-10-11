import { Component } from '@angular/core';
import { ProductFormComponent } from '../../../../shared/components/product-form/product-form.component';
import { ProductsService } from '../../../../core/services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../../../core/models/product';

@Component({
  selector: 'app-create-product',
  imports: [ProductFormComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  onSubmit(event: any) {
    const newProduct: Product = event;
    this.productsService.create(newProduct).subscribe({
      next: (response) => {
        alert('Product updated successfully!');
        this.router.navigate(['/pages/products']);
      },
      error: (error) => {
        console.error('Error updating product', error);
        alert('Failed to update product.');
      },
    });
  }
}
