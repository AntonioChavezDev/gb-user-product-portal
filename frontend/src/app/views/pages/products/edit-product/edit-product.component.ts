import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@core/models/product';
import { ProductsService } from '@core/services/products.service';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '@shared/components/product-form/product-form.component';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.fetchProduct(parseInt(productId, 10));
      }
    });
  }

  onSubmit(event: any) {
    const updatedProduct: Product = event;
    this.productsService.update(updatedProduct.id, updatedProduct).subscribe({
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

  private fetchProduct(id: number) {
    this.productsService.getById(id).subscribe({
      next: (data: Product) => {
        this.product = data;
      },
      error: (error) => {
        console.error('Error fetching product', error);
      },
    });
  }
}
