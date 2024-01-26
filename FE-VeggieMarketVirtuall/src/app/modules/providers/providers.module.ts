import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { FormComunidadComponent } from './pages/form-comunidad/form-comunidad.component';
import { ComunidadListComponent } from './pages/comunidad-list/comunidad-list.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormComunidadComponent,
    ComunidadListComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProvidersModule { }
