import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ViewProductComponent } from './view-product/view-product.component';


import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    redirectTo:'home'
  },
  {
    path: 'home',
    pathMatch:'full',
    component:HomeComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'view-product/:id',
    component:ViewProductComponent
  },
  {
    path: 'products',
   loadChildren: './products/products.module#ProductsModule',
   canLoad:[AuthGuard]
  },
  
  {
    path: 'cart',
   loadChildren:  './cart/cart.module#CartModule',
   
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
