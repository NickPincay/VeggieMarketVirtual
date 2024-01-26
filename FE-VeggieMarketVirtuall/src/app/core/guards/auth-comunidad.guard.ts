import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

export const AuthComunidadGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const toast = inject(AlertService)

  const token = localStorage.getItem("token-Veggie-comunidad");

  if (token) {
    return true;
  } else {
    toast.error('Acceso denegado')
    router.navigate(['/auth/login-providers']);
    return false;
  }

}
