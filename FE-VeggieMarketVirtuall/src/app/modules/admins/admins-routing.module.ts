import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableProductsComponent } from './components/products/table-products/table-products.component';
import { TableBillingsComponent } from './components/billing/table-billings/table-billings.component';
import { TableDiscountsComponent } from './components/discount/table-discounts/table-discounts.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'table-products', component: TableProductsComponent },
      { path: 'table-billing', component: TableBillingsComponent },
      { path: 'table-discounts', component: TableDiscountsComponent },
      { path: '**', redirectTo: 'table-products' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule {

}

