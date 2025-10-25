import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Sidenav } from './components/sidenav/sidenav';
import { authGuard } from './utils/auth-guard';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [
    // Rutas de autenticación (sin sidenav)
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },

    // Rutas con sidenav (área del cliente)
    {
        path: '',
        component: Sidenav,
        children: [
            {
                path: 'home',
                loadComponent: () => import('./components/home-page/home-page').then(c => c.HomePage),
                canActivate: [authGuard],
                data: { roles: ['customer', 'moderator', 'logistics', 'admin'] }
            },
            {
                path: 'productos/mis-productos',
                loadComponent: () => import('./components/customer/my-products/my-products').then(c => c.MyProducts),
                canActivate: [authGuard],
                data: { roles: ['customer'] }
            },
            {
                path: 'productos/catalogo',
                loadComponent: () => import('./components/customer/product-catalog/product-catalog').then(c => c.ProductCatalog),
                canActivate: [authGuard],
                data: { roles: ['customer'] }
            },
            {
                path: 'productos/catalogo/producto/:id',
                loadComponent: () => import('./components/customer/product-view/product-view').then(c => c.ProductView),
                canActivate: [authGuard],
                data: { roles: ['customer'] }
            },
            {
                path: 'mi-carrito',
                loadComponent: () => import('./components/customer/my-cart/my-cart').then(c => c.MyCart),
                canActivate: [authGuard],
                data: { roles: ['customer'] }
            },
            {
                path: 'pagar',
                loadComponent: () => import('./components/customer/cart-payment/cart-payment').then(c => c.CartPayment),
                canActivate: [authGuard],
                data: { roles: ['customer'] }
            },
            {
                path: 'productos/revisar-solicitudes-pendientes',
                loadComponent: () => import('./components/moderator/my-pending-requests/my-pending-requests').then(c => c.MyPendingRequests),
                canActivate: [authGuard],
                data: { roles: ['moderator'] }
            },
            {
                path: 'empleados',
                loadComponent: () => import('./components/admin/employees-management/employees-management').then(c => c.EmployeesManagement),
                canActivate: [authGuard],
                data: { roles: ['admin'] }
            },
            {
                path: 'reportes',
                loadComponent: () => import('./components/admin/reports/reports-dashboard/reports-dashboard').then(c => c.ReportsDashboard),
                canActivate: [authGuard],
                data: { roles: ['admin'] }
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        component: PageNotFound
    }
];
