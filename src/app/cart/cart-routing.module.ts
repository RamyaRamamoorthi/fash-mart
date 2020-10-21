import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartsComponent } from './carts/carts.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
 

  {
    path:'carts',
    component:CartsComponent
  },
  {
    path:'payment',
    component:PaymentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
