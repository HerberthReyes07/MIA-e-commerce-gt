import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) {
    // No autenticado, redirigir a login
    return router.parseUrl('/login');
  }
  
  // Verificar roles si existen en la data de la ruta
  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  if (allowedRoles && allowedRoles.length > 0) {
    const user = auth.authUser();
    if (!user || !allowedRoles.includes(user.role)) {
      // Rol no permitido, redirigir a 404
      return router.parseUrl('**');
    }
  }
  return true;
};
