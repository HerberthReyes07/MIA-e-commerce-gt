import { Injectable, signal, computed } from '@angular/core';
import { AxiosService } from './axios-service';

export interface CartItemDto {
  id?: number;
  cartId?: number;
  productId: number;
  quantity: number;
}

export interface CartDto {
  id?: number;
  customerId: number;
  items: CartItemDto[];
  isActive: boolean;
  creationDate?: string;
}

export interface CartDetailsDto {
  cartId: number;
  cartItemId: number;
  quantity: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  productIsNew: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal reactivo del carrito actual
  private cartSignal = signal<CartDto | null>(null);
  
  // Computed signal para el total de items (suma de cantidades)
  readonly totalItems = computed(() => {
    const cart = this.cartSignal();
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  });

  constructor(private http: AxiosService) { }

  async addItemToCart(cartItemDto: CartItemDto): Promise<CartDto> {
    const response = await this.http.request<CartDto>('POST', '/cart/items', cartItemDto);
    // Actualizar el signal con el carrito actualizado del backend
    this.cartSignal.set(response.data);
    return response.data;
  }

  async getCart(): Promise<CartDto> {
    const response = await this.http.request<CartDto>('GET', '/cart');
    this.cartSignal.set(response.data);
    return response.data;
  }

  async getCartDetails(): Promise<CartDetailsDto[]> {
    console.log("En getCartDetails");
    const response = await this.http.request<CartDetailsDto[]>('GET', '/cart/details');
    return response.data;
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number): Promise<CartDto> {
    const response = await this.http.request<CartDto>('PUT', `/cart/items/${cartItemId}`, { quantity });
    this.cartSignal.set(response.data);
    return response.data;
  }

  async removeCartItem(cartItemId: number): Promise<CartDto> {
    const response = await this.http.request<CartDto>('DELETE', `/cart/items/${cartItemId}`);
    this.cartSignal.set(response.data);
    return response.data;
  }

  async clearCartItems(): Promise<CartDto> {
    const response = await this.http.request<CartDto>('DELETE', '/cart/clear');
    //this.cartSignal.set(response.data);
    this.clearCart();
    return response.data;
  }

  // Método para limpiar el carrito (útil para logout)
  clearCart(): void {
    this.cartSignal.set(null);
  }
}
