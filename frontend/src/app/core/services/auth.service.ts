import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '@core/interfaces/login-response.interface';
import { LoginCredentials } from '@core/interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setLoginInfo(user: LoginResponse): void {
    localStorage.setItem('user', JSON.stringify(user.user));
    localStorage.setItem('authToken', user.token || '');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  login(cretendials: LoginCredentials) {
    return this.http.post<LoginResponse>('/api/auth', cretendials);
  }
}
