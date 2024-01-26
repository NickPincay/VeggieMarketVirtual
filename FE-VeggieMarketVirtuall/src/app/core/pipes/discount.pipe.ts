import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})

export class DiscountPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value === undefined || value === null || isNaN(value)) {
      return ''
    }
    return `Descuento ${value}%`
  }

}
