import { Injectable } from '@angular/core';
import { AxiosService } from './axios-service';

export interface PendingRequestViewDto {
  requestId: number;
  status: number;
  requestDate: string;
  productId: number;
  productName: string;
  productPrice: number;
  productIsNew: boolean;
  productStock: number;
  ownerId: number;
  ownerName: string;
  ownerEmail: string;
}

export interface ProductModerationRequestDto {
  id?: number;
  productId?: number;
  status: number;
  rejectionReason?: string;
  requestDate?: string;
  reviewDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductModerationRequestService {

  constructor(private http: AxiosService) { }

  async getAllMyPendingRequests(): Promise<PendingRequestViewDto[]> {
    const response = await this.http.request<PendingRequestViewDto[]>('GET', `/products/moderation-requests/my-requests/pending`);
    return response.data;
  }

  async getLatestRequestForProduct(productId: number): Promise<ProductModerationRequestDto | null> {
    const response = await this.http.request<ProductModerationRequestDto>('GET', `/products/moderation-requests/${productId}/latest`);
    return response.data || null;
  }

  async updateRequestStatus(payload: ProductModerationRequestDto): Promise<void> {
    /*const payload: ProductModerationRequestDto = {
      id: requestId,
      status: status,
      rejectionReason: rejectionReason
    };*/
    const response = await this.http.request<void>('PUT', `/products/moderation-requests/${payload.id}`, payload);
    return response.data;
  }

}
