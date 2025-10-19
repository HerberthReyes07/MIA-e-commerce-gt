import { Injectable } from '@angular/core';
import { AxiosService } from './axios-service';

export interface CategoryDto {
  id: number;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: AxiosService) { }

  async getCategories(): Promise<CategoryDto[]> {
    const response = await this.http.request<CategoryDto[]>('GET', '/categories');
    return response.data || [];
  }
  
}
