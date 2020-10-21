import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {
   path:'',
   component: ProductListComponent,
  },
  {
    path : 'product-list',
    component: ProductListComponent,
   
  },
  {
  path:'product',
  component:ProductComponent,
  
  },
  {
    path:'edit/:id',
    component:ProductComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
