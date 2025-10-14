import { Injectable } from '@angular/core';
import { Axios } from '../axios';

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  constructor(private http: Axios) {}

  async login(email: string, password: string): Promise<void> {
    const response = await this.http.request('POST', '/login', { email, password });
    const token = response.data?.token;
    this.http.setAuthToken(token || null);
  }

  async register(data: RegisterDto): Promise<void> {
    const response = await this.http.request('POST', '/register', data);
    const token = response.data?.token;
    this.http.setAuthToken(token || null);
  }

  logout(): void {
    this.http.setAuthToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.http.getAuthToken();
  }
}
