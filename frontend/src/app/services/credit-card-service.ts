import { Injectable } from '@angular/core';
import { AxiosService } from './axios-service';

export interface CreditCardDto {
  id: number;
  cardNumber: string;
  cardHolder: string;
  cvv: string;
  alias: string;
  expirationDate: string;
  customerId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private http: AxiosService) { }

  async getCreditCards(): Promise<CreditCardDto[]> {
    const response = await this.http.request<CreditCardDto[]>('GET', '/credit-cards');
    return response.data;
  }

  /* async addCreditCard(card: creditCardDto): Promise<creditCardDto> {
    const response = await this.http.request<creditCardDto>('POST', '/credit-cards', card);
    return response.data;
  } */

}
