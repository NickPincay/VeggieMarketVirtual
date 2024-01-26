import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductoCart } from '../interfaces/iproducto-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _products: BehaviorSubject<IProductoCart[]>;
  private cartProducts: IProductoCart[] = [];
  private readonly localStorageKey = 'cartProducts';

  constructor() {
    this._products = new BehaviorSubject<IProductoCart[]>(this.getStoredCartProducts());
  }

  get products() {
    return this._products.asObservable();
  }

  getStoredCartProducts(): IProductoCart[] {
    const storedProducts = localStorage.getItem(this.localStorageKey);
    return storedProducts ? JSON.parse(storedProducts) : [];
  }

  private updateStoredCartProducts() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartProducts));
  }

  addNewProduct(producto: IProductoCart) {
    this.cartProducts = [...this.cartProducts, producto];
    this._products.next(this.cartProducts);
    this.updateStoredCartProducts();
  }

  addStoredProducts(products: IProductoCart[]) {
    this.cartProducts = products;
    this._products.next(this.cartProducts);
  }
}
