import { ProductoComunidad } from './../../interface/producto-comunidad';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IProductoComunidad } from 'src/app/modules/shared/interfaces/iproducto-comunidad';
import { ProductoComunidadService } from '../../service/producto-comunidad.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Respuesta } from 'src/app/shared/interface/respuesta';
import { FormComunidadComponent } from '../form-comunidad/form-comunidad.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunidad-list',
  templateUrl: './comunidad-list.component.html',
  styleUrls: ['./comunidad-list.component.css']
})
export class ComunidadListComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'precio', 'cantidad', 'accion'];
  dataSource = new MatTableDataSource<IProductoComunidad>();
  loading: boolean = false;
  id: number = 0

  constructor(
    private _productosService: ProductoComunidadService,
    public dialog: MatDialog,
    private route: Router,
    private _alert: AlertService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('staticBackdrop') modal!: ElementRef;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por Página ";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.getProducts();
  }

  private handleDialogClose(respuesta: Respuesta): void {
    if (respuesta.status == true) {
      this.getProducts()
      this._alert.success(respuesta.data);
    } else if (respuesta.status == false) {
      this._alert.error(respuesta.data);
    }
  }

  getProducts() {
    this._productosService.get().subscribe({
      next: (data: ProductoComunidad[]) => {
        this.dataSource.data = data, console.log(data);
      }
    })
  }

  openAdd() {
    this.dialog.open(FormComunidadComponent, {
      autoFocus: false,
      disableClose: true,
      width: '60%',
    }).afterClosed().subscribe(
      (result: Respuesta) => this.handleDialogClose(result))
  }

  openEdit(product: IProductoComunidad) {
    this.dialog.open(FormComunidadComponent, {
      autoFocus: false,
      disableClose: true,
      width: '60%',
      data: product
    }).afterClosed().subscribe(
      (result: Respuesta) => this.handleDialogClose(result))
  }

  openInfo(product: IProductoComunidad) {
    /* this.dialog.open(InfoProductsComponent, {
      autoFocus: false,
      width: 'auto',
      data: product
    }) */
  }

  delete() {
    const comunidad: ProductoComunidad = {
      id: this.id
    }
    this._productosService.post(comunidad, 'delete').subscribe({
      next: (respuesta: Respuesta) => this.handleDialogClose(respuesta),
      complete: () => {
        this.modal.nativeElement.classList.remove('show');
        this.modal.nativeElement.style.display = 'none';
      }
    });
  }

  cancel() {
    this.closeDialog();
  }

  recuperarId(newId: number) {
    this.openDialog();
    this.id = newId;
  }

  private closeDialog(messageType?: string) {
    this.modal.nativeElement.classList.remove('show');
    this.modal.nativeElement.style.display = 'none';
    // if (messageType) {
    //   this.handleDialogClose(messageType);
    // }
  }

  private openDialog() {
    this.modal.nativeElement.classList.add('show');
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    localStorage.clear()
    this.route.navigate([''])
  }

}