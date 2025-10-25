import { Injectable } from '@angular/core';
import { CreditCardDto } from './credit-card-service';
import { AxiosService } from './axios-service';

export interface OrderDetailDto {
  id: number;
  quantity: number;
  subtotal: number;
  platformFee: number;
  sellerEarnings: number;
  productId: number;
  orderId: number;
}

export interface OrderDto {
  id: number;
  orderDate: string;
  deliveryDate: string;
  buyerId: number;
  totalAmount: number;
  status: number;
  orderDetails: OrderDetailDto[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: AxiosService) { }

  async placeOrder(creditCard: CreditCardDto | null): Promise<OrderDto> {

    const response = await this.http.request<OrderDto>('POST', '/orders/place-order', creditCard);
    return response.data;
  }

}
