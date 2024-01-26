import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { NavigatorComponent } from './page/navigator/navigator.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { TableProductsComponent } from './components/products/table-products/table-products.component';
import { AddEditProductsComponent } from './components/products/add-edit-products/add-edit-products.component';
import { InfoProductsComponent } from './components/products/info-products/info-products.component';
import { TableBillingsComponent } from './components/billing/table-billings/table-billings.component';
import { TableDiscountsComponent } from './components/discount/table-discounts/table-discounts.component';
import { AddEditDiscountsComponent } from './components/discount/add-edit-discounts/add-edit-discounts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavigatorComponent,
    TableProductsComponent,
    AddEditProductsComponent,
    InfoProductsComponent,
    TableBillingsComponent,
    TableDiscountsComponent,
    AddEditDiscountsComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminsModule { }
