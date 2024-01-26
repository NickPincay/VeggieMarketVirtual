import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './material.module';
import { UsersRoutingModule } from '../modules/users/users-routing.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { DateFormatPipe } from '../core/pipes/date-format.pipe';
import { DiscountPipe } from '../core/pipes/discount.pipe';
import { DollarPipe } from '../core/pipes/dollar.pipe';
import { DiscountPricePipe } from '../core/pipes/discount-price.pipe';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    DollarPipe,
    DiscountPipe,
    DateFormatPipe,
    DiscountPricePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UsersRoutingModule,
    AuthRoutingModule
  ], 
  exports: [
    NavComponent,
    FooterComponent,
    DollarPipe,
    DiscountPipe,
    DateFormatPipe,
    DiscountPricePipe
  ]
})
export class SharedModule { }
