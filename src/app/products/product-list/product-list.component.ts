import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../product-data.service';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
products: Product[];
//private prdSub: Subscription; to destroy the subscripton
  constructor(public service : ProductDataService) { }

  ngOnInit() {
    this.service.getProduct(); //will be empty intially  since didnt push anything 
    //Calling THis Method First COZ will have the fetched data from the DB and then it pushes to next()
    // only after the below subscription it will have the value
   
    //this.prdSub =  to destroy the subscripton
    this.service.getUpdate()
    .subscribe(( data : Product[])=> {
     
      this.products= data;
      console.log(this.products);
    }
    );
   // should be data : Product[]  coz subject is of <Product[]>
   // so it while listening better hav the same type
      
}
delete(id : string){
this.service.deleteProduct(id);
}

}
