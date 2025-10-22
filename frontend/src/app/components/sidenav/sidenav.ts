import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, signal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart-service';
import { AxiosService } from '../../services/axios-service';

@Component({
  selector: 'app-sidenav',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterModule, MatMenuModule, MatBadgeModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css'
})
export class Sidenav implements OnInit {
  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  readonly userRole;

  // Exponer el signal del carrito para usarlo en el template
  readonly cartItemsCount;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: CartService,
    private axiosService: AxiosService
  ) {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.userRole = this.auth.authUser()?.role;

    // Obtener el computed signal del servicio
    this.cartItemsCount = this.cartService.totalItems;
  }

  async ngOnInit(): Promise<void> {
    // Cargar el carrito al iniciar si el usuario es customer
    if (this.userRole === 'customer') {
      try {
        await this.cartService.getCart();
      } catch (err) {
        if (this.axiosService.getErrorStatus(err) === 404) {
          console.log('Carrito no encontrado');
        } else {
          console.error('Error al cargar carrito inicial:', err);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  getUserFullName(): string {
    const user = this.auth.authUser();
    return user ? `${user.firstName} ${user.lastName}` : 'Invitado';
  }

  logout(): void {
    this.cartService.clearCart();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
