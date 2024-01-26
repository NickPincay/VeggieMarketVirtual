import { MatSort } from '@angular/material/sort';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProductoLocal } from 'src/app/modules/shared/interfaces/iproducto-local';
import { ProductoLocalService } from 'src/app/modules/shared/services/producto-local.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AddEditDiscountsComponent } from '../add-edit-discounts/add-edit-discounts.component';

@Component({
  selector: 'app-table-discounts',
  templateUrl: './table-discounts.component.html',
  styleUrls: ['./table-discounts.component.css']
})
export class TableDiscountsComponent {

  displayedColumns: string[] = ['nombre', 'precio', 'descuento', 'nuevoPrecio', 'accion'];
  dataSource = new MatTableDataSource<IProductoLocal>();
  loading: boolean = false;
  id: number = 0

  constructor(
    private _productosService: ProductoLocalService,
    public dialog: MatDialog,
    private _alert: AlertService,
    private cdr: ChangeDetectorRef
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

  private handleDialogClose(messageType: string): void {
    if (messageType === 'success') {
      this.getProducts();
      this._alert.success("Operación completada con éxito");
      this.cdr.detectChanges(); 
    } else if (messageType === 'error') {
      this._alert.error("Error en la operación");
    }
  }

  getProducts() {
    this.dataSource.data = this._productosService.getAllProductos()
  }

  openAddEdit(producto: IProductoLocal) {
    this.dialog.open(AddEditDiscountsComponent, {
      autoFocus: false,
      disableClose: true,
      width: '30rem',
      data: producto
    }).afterClosed().subscribe(
      (result: string) => {
        this.handleDialogClose(result);
      });
  }

  delete() {
    const result = this._productosService.deleteDescuento(this.id);
    this.closeDialog(result ? 'success' : 'error');
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
    if (messageType) {
      this.handleDialogClose(messageType);
    }
  }

  private openDialog() {
    this.modal.nativeElement.classList.add('show');
    this.modal.nativeElement.style.display = 'block';
  }

}
