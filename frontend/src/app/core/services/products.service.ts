import { Injectable } from '@angular/core';
import { AbstractRestHttpService } from '@core/base/abstract-rest-http.service';
import { Product } from '@core/models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends AbstractRestHttpService<Product> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/api/products');
  }
}
