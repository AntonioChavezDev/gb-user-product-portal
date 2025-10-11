import { Injectable } from '@angular/core';
import { AbstractRestHttpService } from '../base/abstract-rest-http.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends AbstractRestHttpService<Category> {
  constructor(http: HttpClient) {
    super(http, '/api/categories');
  }
}
