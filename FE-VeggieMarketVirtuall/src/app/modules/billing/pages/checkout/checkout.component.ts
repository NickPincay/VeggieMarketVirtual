import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProductoCart } from 'src/app/modules/shared/interfaces/iproducto-cart';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { FacturarService } from '../../services/facturar.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Detalle, Factura } from '../../interfaces/factura';
import { Respuesta } from 'src/app/shared/interface/respuesta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  listProducts: IProductoCart[] = []
  displayedColumns: string[] = ['nombre', 'precio', 'cantidad', 'totalPago'];
  dataSource = new MatTableDataSource<IProductoCart>();
  form: FormGroup;

  constructor(
    private _cartProducts: CartService,
    private _facturaProducts: FacturarService,
    private _alert: AlertService,
    private _fb: FormBuilder,
    private route: Router
  ) {
    this.form = this._fb.group({
      nombreCliente:             ['', Validators.required]   
    })
  }

  ngOnInit() {
    this._cartProducts.products.subscribe(
      products => {
        this.dataSource.data = products
      }
    )
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  facturar() {
    if(this.form.invalid){
      this._alert.error('Ingrese el nombre del cliente')
      return
    }

    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getFullYear()}-${('0' + (fechaActual.getMonth() + 1)).slice(-2)}.${('0' + fechaActual.getDate()).slice(-2)}`;
  
    const detalles: Detalle[] = this.dataSource.data.map(producto => {
      const detalle: Detalle = {
        productoId: producto.id,
        cantidad: producto.cantidad,
        precio: producto.precio,
      };
      return detalle;
    });

    const factura: Factura = {
      nombreCliente: this.form.value.nombreCliente,
      fecha: fechaFormateada,
      detalles: detalles
    }

    this._facturaProducts.post(factura).subscribe({
      next: (respuesta: Respuesta) => {
        this._alert.success(respuesta.data)
        localStorage.clear()
        this.route.navigate([''])
      }
    })
    
  }

}
