import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/modules/shared/services/cart.service';

export const CardGuard = () => {
  const cartProductos = inject(CartService)
  const router = inject(Router)

  cartProductos.products.subscribe(
    products => {
      if (products.length > 0) {
        return true
      } else {
        router.navigate([''])
        return false
      }
    }
  )

}
