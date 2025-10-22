import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ProductDetailsDto, ProductService } from '../../../services/product-service';
import { CartService } from '../../../services/cart-service';
import { environment } from '../../../../environments/environment';
import { AxiosService } from '../../../services/axios-service';
import { SnackbarService } from '../../../services/snackbar-service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css'
})
export class ProductView implements OnInit {
  product: ProductDetailsDto | null = null;
  isLoading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private http: AxiosService,
    private snackbarService: SnackbarService
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = true;
      return;
    }

    this.isLoading = true;
    try {
      this.product = await this.productService.getProductDetails(+id);
    } catch (err) {
      console.error('Error al cargar detalles del producto:', err);
      this.error = true;
    } finally {
      this.isLoading = false;
    }
  }

  getImageUrl(): string {
    return this.product?.imageUrl
      ? `${environment.apiBaseUrl}${this.product.imageUrl}`
      : '';
  }

  goBackToCatalog(): void {
    this.router.navigate(['/productos/catalogo']);
  }

  async addToCart(): Promise<void> {
    if (!this.product) return;

    try {
      await this.cartService.addItemToCart({
        productId: this.product.id,
        quantity: 1
      });
      console.log('Producto agregado al carrito');
      this.snackbarService.showSuccess('Producto agregado al carrito');
      // TODO: Mostrar snackbar de confirmación
    } catch (err) {
      console.error('Error al agregar producto al carrito:', err);
      const message = this.http.getErrorMessage(err);
      this.snackbarService.showError('Error al agregar producto al carrito: ' + message);
    }
  }
}