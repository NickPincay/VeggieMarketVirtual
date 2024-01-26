import { Component, OnInit } from '@angular/core';
import { categorias } from 'src/app/modules/shared/data/data-producto-local';
import { ICategoria, IProductoLocal } from 'src/app/modules/shared/interfaces/iproducto-local';
import { ProductoLocalService } from 'src/app/modules/shared/services/producto-local.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})

export class ProductsPageComponent implements OnInit {

  categories: ICategoria[] = categorias
  rangeValue: number = 0
  recentProducts: IProductoLocal[] = []
  greenLeaves: IProductoLocal[] = []
  rootVegetables: IProductoLocal[] = []
  fruitProducts: IProductoLocal[] = []
  title: string = "Productos Recientes"
  selectedCategory: string | null = null;
  searchText: string = '';


  constructor(
    private _productosServices: ProductoLocalService
  ) { }

  ngOnInit() {
    this.recentProducts = this._productosServices.getUltimosProductosIngresados()
    this.greenLeaves = this._productosServices.getHojasVerdes()
    this.rootVegetables = this._productosServices.getDeRaiz()
    this.fruitProducts = this._productosServices.getDeFruto()
  }

  onCategoryChange() {
    switch (this.selectedCategory) {
      case 'Hojas Verdes':
        this.recentProducts = this._productosServices.getHojasVerdes();
        break;
      case 'De Raíz':
        this.recentProducts = this._productosServices.getDeRaiz();
        break;
      case 'De Fruto':
        this.recentProducts = this._productosServices.getDeFruto();
        break;
      default:
        this.recentProducts = this._productosServices.getAllProductos();
        break;
    }
  }

  private normalizeText(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  search(event: Event) {
    this.title = "Productos Filtrados"
    const inputText = this.normalizeText((<HTMLInputElement>event.target).value);
    this.recentProducts = this._productosServices.getAllProductos().filter(item => {
      const itemName = this.normalizeText(item.nombre);
      return itemName.includes(inputText);
    })
  }

  onRangeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.rangeValue = parseInt(inputElement.value, 10);
    this.filterProducts();
  }

  filterProducts() {
    this.recentProducts = this._productosServices.getAllProductos().filter(item => {
      const precio = item.precio;
      const rangoInferior = this.rangeValue;
      const rangoSuperior = this.rangeValue + 0.99;
      return precio >= rangoInferior && precio <= rangoSuperior;
    });
  }

  resetFilter() {
    this.title = "Productos Recientes";
    this.recentProducts = this._productosServices.getUltimosProductosIngresados();
    this.selectedCategory = null;
    this.searchText = '';
    const rangeInput = document.getElementById('rangeId') as HTMLInputElement;
    if (rangeInput) {
      this.rangeValue = 0;
      rangeInput.value = '0';
    }
  }

}
