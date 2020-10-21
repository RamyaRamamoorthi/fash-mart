import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material-module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from './products/products.module';
import { HttpClientModule } from '@angular/common/http';
import { ViewProductComponent } from './view-product/view-product.component';
import { CartModule } from './cart/cart.module';
import { LoginComponent } from './login/login.component';
import{AuthGuard} from './auth.guard';
//import { CartRoutingModule } from './cart/cart-routing.module';
//import { ProductsRoutingModule } from './products/products-routing.module';



@NgModule({
  declarations: [
    AppComponent,
   HomeComponent,
  ViewProductComponent,
  LoginComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsModule,
    //CartRoutingModule,
    //ProductsRoutingModule,
  CartModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
