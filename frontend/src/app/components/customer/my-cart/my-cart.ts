import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartDetailsDto, CartService } from '../../../services/cart-service';
import { SnackbarService } from '../../../services/snackbar-service';
import { AxiosService } from '../../../services/axios-service';
import { ImageService } from '../../../services/image-service';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  templateUrl: './my-cart.html',
  styleUrl: './my-cart.css'
})
export class MyCart implements OnInit {
  cartItems: CartDetailsDto[] = [];
  isLoading = false;
  isEmpty = false;
  quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private cartService: CartService,
    private http: AxiosService,
    private snackbarService: SnackbarService,
    private router: Router,
    private imageService: ImageService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadCartDetails();
  }

  async loadCartDetails(): Promise<void> {
    this.isLoading = true;
    try {
      this.cartItems = await this.cartService.getCartDetails();
      this.isEmpty = this.cartItems.length === 0;
    } catch (err) {
      console.error('Error al cargar detalles del carrito:', err);
      this.cartItems = [];
      this.isEmpty = true;
    } finally {
      this.isLoading = false;
    }
  }

  getImageUrl(imagePath: string): string {
    return this.imageService.getImageUrl(imagePath);
  }

  getItemTotal(item: CartDetailsDto): number {
    return item.productPrice * item.quantity;
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + this.getItemTotal(item), 0);
  }

  async onQuantityChange(item: CartDetailsDto, newQuantity: number): Promise<void> {
    try {
      await this.cartService.updateCartItemQuantity(item.cartItemId, newQuantity);
      await this.loadCartDetails();
      this.snackbarService.showSuccess('Cantidad actualizada correctamente');
    } catch (err) {
      console.error('Error al actualizar cantidad:', err);
      const message = this.http.getErrorMessage(err);
      this.snackbarService.showError('Error al actualizar cantidad: ' + message);
      this.loadCartDetails();
    }
  }

  async removeItem(item: CartDetailsDto): Promise<void> {
    try {
      await this.cartService.removeCartItem(item.cartItemId);
      await this.loadCartDetails();
      this.snackbarService.showSuccess('Producto eliminado del carrito');
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      const message = this.http.getErrorMessage(err);
      this.snackbarService.showError('Error al eliminar producto: ' + message);
    }
  }

  async clearCart(): Promise<void> {
    try {
      await this.cartService.clearCartItems();
      await this.loadCartDetails();
      this.snackbarService.showSuccess('Carrito limpiado correctamente');
    } catch (err) {
      console.error('Error al limpiar el carrito:', err);
      const message = this.http.getErrorMessage(err);
      this.snackbarService.showError('Error al limpiar el carrito: ' + message);
    }
  }

  navigateToPayment(): void {
    if (this.cartItems.length === 0) {
      this.snackbarService.showWarning('El carrito está vacío');
      return;
    }
    this.router.navigate(['/pagar']);
  }
}