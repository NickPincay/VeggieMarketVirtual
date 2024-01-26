import { Component } from '@angular/core';
import { CartService } from './modules/shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FE-VeggieMarketVirtual';

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.addStoredProducts(this.cartService.getStoredCartProducts());
  }

}
