import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoComunidad } from '../../interface/producto-comunidad';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductoComunidadService } from '../../service/producto-comunidad.service';
import { Respuesta } from 'src/app/shared/interface/respuesta';

@Component({
  selector: 'app-form-comunidad',
  templateUrl: './form-comunidad.component.html',
  styleUrls: ['./form-comunidad.component.css']
})
export class FormComunidadComponent {

  form: FormGroup;
  fileName!: any;
  title: string = "Agregar Producto";
  iconName: string = "send";

  constructor(
    private dialogRef: MatDialogRef<FormComunidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoComunidad,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productosService: ProductoComunidadService
    ) {
    this.form = this._fb.group({
      nombre:             ['', Validators.required],
      precio:             ['', Validators.required],
      cantidad:           ['', Validators.required],
      imagenName:         ['', Validators.required],
      descripcion:        ['', Validators.required],
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
        precio:           this.data.precio,
        cantidad:         this.data.cantidad,
        descripcion:      this.data.descripcion,
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

  submit() {
    if (this.form.invalid) {
      this._alert.error("Todos los campos son requeridos");
      return;
    }

    const product:        ProductoComunidad = {
      id:                 this.data ? this.data.id : 0,
      nombre:             this.form.value.nombre,    
      precio:             this.form.value.precio,
      cantidad:           this.form.value.cantidad,
      imagenName:         this.fileName,
      descripcion:        this.form.value.descripcion,      
      cosecha:            this.data ? this.data.cosecha : this.form.value.cosecha,
    };

    console.log(product);
    
    const updateOrCreate = this.data 
      ? this._productosService.post(product,'put') 
      : this._productosService.post(product,'post');

      updateOrCreate.subscribe({
        next: (respuesta: Respuesta) => this.dialogRef.close(respuesta)        
      })
  }


}
