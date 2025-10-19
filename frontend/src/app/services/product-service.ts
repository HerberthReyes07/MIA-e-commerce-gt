import { Injectable } from '@angular/core';
import { CategoryDto } from './category-service';
import { AxiosService } from './axios-service';

export interface ProductDto {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  isNew: boolean;
  reviewStatus?: number;
  imageUrl?: string;
  ownerId?: number;
  categories: CategoryDto[];
  creationDate?: string;
  lastUpdatedDate?: string;
}

export interface CreateProductPayload {
  product: ProductDto;
  image?: File | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: AxiosService) { }

  async createProduct(payload: CreateProductPayload): Promise<ProductDto> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(payload.product)], { type: 'application/json' }));
    if (payload.image) {
      formData.append('image', payload.image);
    }

    const response = await this.http.request<ProductDto>('POST', '/products', formData);
    return response.data;
  }

  async updateProduct(productId: number, payload: CreateProductPayload): Promise<ProductDto> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(payload.product)], { type: 'application/json' }));
    if (payload.image) {
      formData.append('image', payload.image);
    }

    const response = await this.http.request<ProductDto>('PUT', `/products/${productId}`, formData);
    return response.data;
  }

  async getMyProducts(): Promise<ProductDto[]> {
    const response = await this.http.request<ProductDto[]>('GET', '/products/my-products');
    return response.data || [];
  }

  async getProductById(productId: number): Promise<ProductDto> {
    const response = await this.http.request<ProductDto>('GET', `/products/${productId}`);
    return response.data;
  }

}
