import { Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { IProductoLocal } from 'src/app/modules/shared/interfaces/iproducto-local';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {
  @Input() productsLocal: IProductoLocal[] = [];
  @Input() icon: string = "";
  @Input() title: string = "";
  @Input() numeroCard: number = 4

  lisProduct: IProductoLocal[] = []
  startIndex = 0
  itemsToShow = this.numeroCard
  lastIndex = this.itemsToShow - 1
  mediator = this.lisProduct.slice(this.startIndex, this.lastIndex + 1)

  ngOnInit() {
    this.lisProduct = this.productsLocal
    this.calculateItemsToShow(window.innerWidth);
    this.updateVisibleItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('productsLocal' in changes) {
      this.lisProduct = changes['productsLocal'].currentValue;
      this.updateVisibleItems();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateItemsToShow(event.target.innerWidth);
    this.updateVisibleItems();
  }

  updateVisibleItems() {
    this.lastIndex = this.startIndex + this.itemsToShow - 1;
    this.mediator = this.lisProduct.slice(this.startIndex, this.lastIndex + 1);
  }

  calculateItemsToShow(viewportWidth: number) {
    if (viewportWidth < 1236 && viewportWidth > 1032) {
      this.itemsToShow = 2;
    } else if (viewportWidth < 1031) {
      this.itemsToShow = 1;
    } else {
      this.itemsToShow = this.numeroCard;
    }
  }

  leftClick() {
    if (this.startIndex > 0) {
      this.startIndex = Math.max(0, this.startIndex - this.itemsToShow);
      this.lastIndex = this.startIndex + this.itemsToShow - 1;
      this.updateVisibleItems();
    }
  }

  rightClick() {
    if (this.lastIndex < this.lisProduct.length - 1) {
      this.startIndex = Math.min(this.lisProduct.length - 1, this.startIndex + this.itemsToShow);
      this.lastIndex = Math.min(this.lisProduct.length - 1, this.lastIndex + this.itemsToShow);
      this.updateVisibleItems();
    }
  }
}
