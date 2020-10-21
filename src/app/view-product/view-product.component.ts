import { Component, OnInit } from '@angular/core';
import {Product} from '../products/product.model';
import {ProductDataService} from '../products/product-data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AddCartService } from '../cart/add-cart.service';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
 productId : string; // to fetch the id of the product
 product : Product;
  constructor(public service : ProductDataService ,
    private activeroute : ActivatedRoute,
    public cartservice : AddCartService,
    private route : Router) { }

  ngOnInit() {
    this.productId =  this.activeroute.snapshot.paramMap.get('id')
       
        this.service.getprodId(this.productId)
        .subscribe(prd => {
          this.product = { 
            id : prd._id,
            productName : prd.productName,
            productPrice : prd.productPrice,
            productBrand : prd.productBrand,
            productBarcode : prd.productBarcode,
            productDesc : prd.productDesc,
            image : prd.image
          };
          console.log(prd);
        })
       
   
  }
  addTocart(){
 
  this.cartservice.add(this.product);
  this.route.navigate(['/carts'])
  }

}
