import { Injectable } from '@angular/core';
import { IProductoLocal } from '../interfaces/iproducto-local';
import { productsLocalData } from '../data/data-producto-local';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from 'src/app/shared/interface/respuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoLocalService {

  private myAppUrl: string = environment.endpoint
  private myApiUrl: string = 'api/Productos/'

  constructor(private http: HttpClient) { }


  get(): Observable<IProductoLocal[]> {
    return this.http.get<IProductoLocal[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  post(producto: IProductoLocal, accion: string): Observable<Respuesta> {
    producto.transaccion = accion
    return this.http.post<Respuesta>(`${this.myAppUrl}${this.myApiUrl}`,producto);
  }


  getUltimosProductosIngresados(): IProductoLocal[] {
    const productosOrdenados = productsLocalData.sort((a, b) => b.cosecha.getTime() - a.cosecha.getTime());
    const ultimosProductos = productosOrdenados.slice(0, 6);
    return ultimosProductos;
  }

  getProductosByCategoria(categoriaId: number): IProductoLocal[] {
    return productsLocalData.filter(producto => producto.categoria.id === categoriaId);
  }

  getHojasVerdes(): IProductoLocal[] {
    return this.getProductosByCategoria(1);
  }

  getDeRaiz(): IProductoLocal[] {
    return this.getProductosByCategoria(2);
  }

  getDeFruto(): IProductoLocal[] {
    return this.getProductosByCategoria(3);
  }

  getAllProductosAdmins(): IProductoLocal[] {
    return productsLocalData.filter(items => {
      return items.cantidad >= 0
    });
  }

  getAllProductos(): IProductoLocal[] {
    return productsLocalData.filter(items => {
      return items.cantidad > 0
    });
  }

  getProductoById(id: number): IProductoLocal | undefined {
    return productsLocalData.find((producto) => producto.id === id);
  }

  addProducto(producto: IProductoLocal): boolean {
    try {
      productsLocalData.push(producto);
      return true;
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      return false;
    }
  }

  updateProducto(producto: IProductoLocal): boolean {
    const index = productsLocalData.findIndex((p) => p.id === producto.id);
    if (index !== -1) {
      productsLocalData[index] = producto;
      return true;
    } else {
      return false;
    }
  }

  deleteProducto(id: number): boolean {
    const index = productsLocalData.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      productsLocalData.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  addUpdateDescuento(id: number, descuento: number): boolean {
    const producto = productsLocalData.find((p) => p.id === id);

    if (producto) {
      producto.descuento = descuento;
      return true;
    } else {
      console.error("Producto no encontrado para agregar descuento.");
      return false;
    }
  }

  deleteDescuento(id: number): boolean {
    const producto = productsLocalData.find((p) => p.id === id);

    if (producto) {
      delete producto.descuento;
      return true;
    } else {
      console.error("Producto no encontrado para eliminar descuento.");
      return false;
    }
  }


}
