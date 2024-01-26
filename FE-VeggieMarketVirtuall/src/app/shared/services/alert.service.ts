import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  notyf = new Notyf();

  constructor() { }

  error(mensaje: string) {
    this.notyf.error({
      message: mensaje,
      duration: 5000,
      dismissible: true
    })
  }

  warning(mensaje: string) {
    this.notyf.error({
      message: mensaje,
      duration: 5000,
      dismissible: true,
      background: '#efc314'
    })
  }

  success(mensaje: string) {
    this.notyf.success({
      message: mensaje,
      duration: 5000,
      dismissible: true,
      background: '#69AB3D'
    })
  }

  addCart() {
    const options = {
      icon: '<i class="material-icons">add_shopping_cart</i>',
      background: '#ff5733',
      dismissible: true,
    };
    this.notyf.open({
      message: 'Producto agregado',
      ...options,
    });
  }
}
