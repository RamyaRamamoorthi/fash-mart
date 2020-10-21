import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Product } from '../products/product.model';



@Injectable({
  providedIn: 'root'
})
export class AddCartService {
  //TotalAmount : Subject<number>;
   TotalAmount : Subject<any>;
  
items : any;


  constructor(private http : HttpClient) {
    this.TotalAmount = new Subject();
   }
 
  add(Items) {
    this.http.post("http://localhost:3000/api/cart/add",Items)
    .subscribe(res =>this.items.push(res));
    
    }
    get(){
   return   this.http.get("http://localhost:3000/api/cart/get");
       }

      delete(id : string){
       
        this.http.delete("http://localhost:3000/api/cart/delete/" + id)
        .subscribe(()=>{
          const updateItem = this.items.filter(data =>data.id !==id);
          this.items = updateItem;
          return this.items;
        });
        
      }
     sendData(data: number){
      this.TotalAmount.next(data);
     }

}
