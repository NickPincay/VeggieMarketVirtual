import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { categorias } from 'src/app/modules/shared/data/data-producto-local';
import { ICategoria, IProductoLocal } from 'src/app/modules/shared/interfaces/iproducto-local';
import { ProductoLocalService } from 'src/app/modules/shared/services/producto-local.service';
import { Respuesta } from 'src/app/shared/interface/respuesta';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css']
})
export class AddEditProductsComponent implements OnInit{

  form: FormGroup;
  fileName!: any;
  title: string = "Agregar Producto";
  iconName: string = "send";
  categories: ICategoria[] = categorias

  constructor(
    private dialogRef: MatDialogRef<AddEditProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProductoLocal,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productosService: ProductoLocalService
    ) {
    this.form = this._fb.group({
      nombre:             ['', Validators.required],
      categoria:          ['', Validators.required],
      precio:             ['', Validators.required],
      cantidad:           ['', Validators.required],
      imagenName:         ['', Validators.required],
      descripcion:        ['', Validators.required],
      nombreAgricultor:   ['', Validators.required],
      cosecha:            ['', Validators.required],      
    })
  }

  ngOnInit() {
    if(this.data){      
      this.title          = "Editar Producto"
      this.iconName       = "edit"
      this.fileName       = this.data.imagenName
      this.form.patchValue({
        nombre:           this.data.nombre,
        categoria:        this.data.categoria.id,
        precio:           this.data.precio,
        cantidad:         this.data.cantidad,
        descripcion:      this.data.descripcion,
        nombreAgricultor: this.data.nombreAgricultor,
        cosecha:          this.data.cosecha
      })
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const fileNameParts = file.name.split('.');
      this.fileName = fileNameParts[0];
    }
  }

  /* onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.fileName = file?.name.split('.')[0];
  } */

  submit() {
    if (this.form.invalid) {
      this._alert.error("Todos los campos son requeridos");
      return;
    }
    const allProductos = this._productosService.getAllProductos();
    const nextId = allProductos.length > 0 ? Math.max(...allProductos.map(p => p.id)) + 1 : 1;
  
    const product:        IProductoLocal = {
      id:                 this.data ? this.data.id : nextId,
      nombre:             this.form.value.nombre,
      categoria:          this.categories[this.form.value.categoria],
      precio:             this.form.value.precio,
      cantidad:           this.form.value.cantidad,
      imagenName:         this.fileName,
      descripcion:        this.form.value.descripcion,
      nombreAgricultor:   this.form.value.nombreAgricultor,
      cosecha:            this.data ? this.data.cosecha : this.form.value.cosecha,
    };

    const updateOrCreate = this.data 
      ? this._productosService.post(product,'post') 
      : this._productosService.post(product,'put');

      updateOrCreate.subscribe({
        next: (respuesta: Respuesta) => this.dialogRef.close(respuesta)        
      })
  }
  
}
