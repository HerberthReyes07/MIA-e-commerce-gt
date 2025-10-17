import { Injectable } from '@angular/core';
import { AxiosService } from './axios-service';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

interface CustomJwtPayload extends JwtPayload {
  firstName: string;
  lastName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: AxiosService) { }

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

  authUser() {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    const payload = jwtDecode<CustomJwtPayload>(token);
    //console.log(payload);
    return {
      email: payload.iss,  // issuer = email
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role
    };
  }
}
