import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductCatalogDto, ProductService } from '../../../services/product-service';
import { environment } from '../../../../environments/environment';
import { CartService } from '../../../services/cart-service';
import { AxiosService } from '../../../services/axios-service';
import { SnackbarService } from '../../../services/snackbar-service';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css'
})
export class ProductCatalog implements OnInit {
  items: ProductCatalogDto[] = [];
  isLoading = false;
  isEmpty = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private http: AxiosService,
    private snackbarService: SnackbarService
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      const data = await this.productService.getProductCatalog();
      this.items = data || [];
      this.isEmpty = this.items.length === 0;
    } catch (err) {
      console.error('Error al cargar catálogo de productos:', err);
      this.items = [];
      this.isEmpty = true;
    } finally {
      this.isLoading = false;
    }
  }

  getImageUrl(imagePath: string): string {
    return imagePath ? `${environment.apiBaseUrl}${imagePath}` : '';
  }

  viewMore(item: ProductCatalogDto): void {
    this.router.navigate(['/productos/catalogo/producto', item.id]);
  }

  async addToCart(item: ProductCatalogDto): Promise<void> {

    try {
      await this.cartService.addItemToCart({ productId: item.id, quantity: 1 });
      this.snackbarService.showSuccess('Producto agregado al carrito');
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      const message = this.http.getErrorMessage(error);
      this.snackbarService.showError('Error al agregar producto al carrito: ' + message);
    }
  }
}
