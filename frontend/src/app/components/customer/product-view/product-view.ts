import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ProductDetailsDto, ProductService } from '../../../services/product-service';
import { environment } from '../../../../environments/environment';

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
    private productService: ProductService
  ) {}

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

  addToCart(): void {
    // TODO: Implementar lógica de agregar al carrito
    console.log('Agregar al carrito:', this.product);
  }
}
