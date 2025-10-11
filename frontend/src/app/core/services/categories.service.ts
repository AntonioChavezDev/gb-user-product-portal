import { Injectable } from '@angular/core';
import { AbstractRestHttpService } from '@core/base/abstract-rest-http.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '@core/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends AbstractRestHttpService<Category> {
  constructor(http: HttpClient) {
    super(http, '/api/categories');
  }
}
