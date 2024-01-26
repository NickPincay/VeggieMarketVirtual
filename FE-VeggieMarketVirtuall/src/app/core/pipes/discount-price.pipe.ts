import { Pipe, PipeTransform } from '@angular/core';
import { IProductoLocal } from 'src/app/modules/shared/interfaces/iproducto-local';

@Pipe({
  name: 'discountPrice'
})
export class DiscountPricePipe implements PipeTransform {

  transform(product: IProductoLocal): string {
    if (product.descuento) {
      const newPrice = product.precio - ((product.precio * product.descuento) / 100)
      return 'Lb $ ' + newPrice.toFixed(2); 
    } else {
      return ""
    }
  }
}
