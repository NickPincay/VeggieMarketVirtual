import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductoLocal } from 'src/app/modules/shared/interfaces/iproducto-local';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductoLocalService } from 'src/app/modules/shared/services/producto-local.service';

@Component({
  selector: 'app-add-edit-discounts',
  templateUrl: './add-edit-discounts.component.html',
  styleUrls: ['./add-edit-discounts.component.css']
})
export class AddEditDiscountsComponent implements OnInit {

  form: FormGroup;
  title: string = "Agregar Descuento";
  iconName: string = "send";

  constructor(
    private dialogRef: MatDialogRef<AddEditDiscountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProductoLocal,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productosService: ProductoLocalService
  ) {
    this.form = this._fb.group({
      descuento: ['', [Validators.required, Validators.min(1), Validators.max(90)]]
    })
  }

  ngOnInit() {
    if (this.data) {
      this.title = "Editar Descuento"
      this.iconName = "edit"
      this.form.patchValue({
        descuento: this.data.descuento
      })
    }
  }

  submit() {
    if (this.form.invalid) {
      this._alert.error("Ingrese un porcentaje correcto");
      return;
    }

    const datos = {
      id: this.data.id,
      descuento: this.form.value.descuento
    };

    const updateOrCreate = this._productosService.addUpdateDescuento(datos.id, datos.descuento);

    const messageType = updateOrCreate ? 'success' : 'error';
    this.dialogRef.close(messageType);

  }

}
