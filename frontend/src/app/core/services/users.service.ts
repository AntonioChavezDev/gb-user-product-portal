import { Injectable } from '@angular/core';
import { AbstractRestHttpService } from '@core/base/abstract-rest-http.service';
import { User } from '@core/models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends AbstractRestHttpService<User> {
  constructor(http: HttpClient) {
    super(http, '/api/users');
  }
}
