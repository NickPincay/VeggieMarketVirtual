import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProductoLocal } from 'src/app/modules/shared/interfaces/iproducto-local';

@Component({
  selector: 'app-info-products',
  templateUrl: './info-products.component.html',
  styleUrls: ['./info-products.component.css']
})
export class InfoProductsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProductoLocal
  ) { }

}
