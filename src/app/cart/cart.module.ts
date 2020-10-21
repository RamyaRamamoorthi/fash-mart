import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartsComponent } from './carts/carts.component';

import { AppMaterialModule } from '../material-module';
import { HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CartsComponent, PaymentComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    CartRoutingModule
  ]
})
export class CartModule { }
