import { Component, OnInit } from '@angular/core';
import {Product} from '../products/product.model';
import {ProductDataService} from '../products/product-data.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
products : Product[]; // ts form  of saying that got an array of product.

filtered : Product[];


  constructor(public service : ProductDataService) { }

  ngOnInit() {
   this.service.getProduct(); //Calling THis Method First COZ will have the fetched data from the DB and then it pushes to next()
   //======================== then here from the getUpdate() I can recieve the Current Ongoing value in the SUbject's streams=============
 this.service.getUpdate()
.subscribe((data : Product[])=> 
{
  this.products = data;
 this.filtered = this.products;

  });
 
  }


search(value : string){
  this.filtered = this.products.filter(item => item.productDesc.toLocaleLowerCase().match(value.toLocaleLowerCase()));
  console.log(this.filtered);
}
  
}
