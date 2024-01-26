import { Component, Input, OnInit } from '@angular/core';
import { IProductoCart } from 'src/app/modules/shared/interfaces/iproducto-cart';
import { IProductoLocal } from 'src/app/modules/shared/interfaces/iproducto-local';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})

export class CardProductComponent implements OnInit {

  @Input() productsLocal!: IProductoLocal;

  maxQuantity!: number
  currentQuantity: number = 1
  totalCards: number = 0

  constructor(
    private _cartProducts: CartService,
    private _alert: AlertService
  ) {
  }

  ngOnInit() {
    if (this.productsLocal) {
      this.maxQuantity = this.productsLocal.cantidad
    }
  }

  increaseQuantity() {
    if (this.currentQuantity < this.maxQuantity) {
      this.currentQuantity++
    }
  }

  decreaseQuantity() {
    if (this.currentQuantity > 1) {
      this.currentQuantity--
    }
  }

  addCart(product: IProductoLocal) {

    const precioNuevo =
      (typeof product.descuento === 'number')
        ? (product.precio - (product.precio * product.descuento) / 100)
        : product.precio;

    const productCart: IProductoCart = {
      id: product.id,
      nombre: product.nombre,
      precio: precioNuevo,
      cantidad: this.currentQuantity,
      totalPago: precioNuevo * this.currentQuantity,
      imagenName: product.imagenName
    }
    this._cartProducts.addNewProduct(productCart)
    this._alert.addCart()
    this.currentQuantity = 1
  }

}
