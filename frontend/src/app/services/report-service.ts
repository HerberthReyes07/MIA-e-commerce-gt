import { Injectable } from '@angular/core';
import { AxiosService } from './axios-service';

export interface TopProductSalesDto {
  productId: number;
  productName: string;
  productPrice: number;
  productIsNew: boolean;
  ownerName: string;
  ownerEmail: string;
  totalUnitsSold: number;
  totalRevenue: number;
}

export interface TopBuyerRevenueDto {
  customerId: number;
  customerName: string;
  customerEmail: string;
  totalOrders: number;
  totalPlatformRevenue: number;
  averagePlatformRevenue: number;
}

export interface TopSellerSalesDto {
  sellerId: number;
  sellerName: string;
  sellerEmail: string;
  registrationDate: string;
  totalProductsSold: number;
  totalRevenue: number;
}

export interface TopBuyerOrdersDto {
  buyerId: number;
  buyerName: string;
  buyerEmail: string;
  registrationDate: string;
  totalOrders: number;
  totalSpent: number;
}

export interface TopSellerInventoryDto {
  sellerId: number;
  sellerName: string;
  sellerEmail: string;
  productsForSaleCount: number;
  totalStock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: AxiosService) { }

  async getTopProductSales(startDate: string | null, endDate: string | null): Promise<TopProductSalesDto[]> {
    const response = await this.http.request<TopProductSalesDto[]>('GET', `/reports/top-products-sales?startDate=${startDate || ''}&endDate=${endDate || ''}`);
    return response.data;
  }

  async getTopBuyersPlatformRevenue(startDate: string | null, endDate: string | null): Promise<TopBuyerRevenueDto[]> {
    const response = await this.http.request<TopBuyerRevenueDto[]>('GET', `/reports/top-buyers-revenue?startDate=${startDate || ''}&endDate=${endDate || ''}`);
    return response.data;
  }

  async getTopSellersSalesVolume(startDate: string | null, endDate: string | null): Promise<TopSellerSalesDto[]> {
    const response = await this.http.request<TopSellerSalesDto[]>('GET', `/reports/top-sellers-sales?startDate=${startDate || ''}&endDate=${endDate || ''}`);
    return response.data;
  }

  async getTopBuyersNumberOfOrders(startDate: string | null, endDate: string | null): Promise<TopBuyerOrdersDto[]> {
    const response = await this.http.request<TopBuyerOrdersDto[]>('GET', `/reports/top-buyers-orders?startDate=${startDate || ''}&endDate=${endDate || ''}`);
    return response.data;
  }

  async getTopSellersInventoryLevels(): Promise<TopSellerInventoryDto[]> {
    const response = await this.http.request<TopSellerInventoryDto[]>('GET', `/reports/top-sellers-inventory`);
    return response.data;
  }

}
