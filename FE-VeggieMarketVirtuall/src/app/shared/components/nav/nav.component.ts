import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  quantyProducts: number = 0

  constructor(
    private _cartProducts: CartService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this._cartProducts.products.subscribe(
      products => {
        this.quantyProducts = products.length
      }
    )
  }

  ckeckout(){
    this._router.navigate(['/billing/'])
  }
}
