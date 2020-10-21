import { Component, OnInit, Input } from '@angular/core';
import { ProductDataService } from 'src/app/products/product-data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { AddCartService } from '../add-cart.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  name = '';
  number;
  address ='';
  totalAmount =0;
  submit=false; // to show to filled details
  isVisible = false ;
  click=false; //  check for single item in html if != click display
  amount // amount for single item
   
cartItem :any;

  constructor(public service :ProductDataService,
    private activeroute : ActivatedRoute,
    public cartservice : AddCartService,
    private route : Router) { }

  ngOnInit(){
 
 this.added();

}
added(){
  this.cartservice.get().subscribe(data => {
    this.cartItem  = data;
    console.log(this.cartItem);
   })
}
DeleteItem(id : string){
  this.cartservice.delete(id);
}


total(){
  for(let i in this.cartItem){
      this.totalAmount=this.totalAmount +  parseInt(this.cartItem[i].productPrice);
  }


  this.isVisible = true;
console.log(this.totalAmount);
}
oneTotal(value : string){
 this.click = true
  this.isVisible = true;
 this.amount = parseInt(value);
  console.log(this.amount);
}

register(){
 this.submit =true;
 this.name = this.name;
 this.number = this.number;
 this.address = this.address;
}


}