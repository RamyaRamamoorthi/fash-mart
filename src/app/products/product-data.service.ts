import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from './product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
product : Product[] = [];  //ts form of saying got product of type Product array and set it to empty array
// here subject<Product[]> says the data we emit will be of type Product[]
private UpdatedPrd = new Subject<Product[]>(); // using subject onbehalf of event emitting
  constructor(public http : HttpClient) { }
getProduct(){
    this.http.get<{prd: any}>("http://localhost:3000/api/get")
    .pipe(map((Data) => {
      return Data.prd.map(data => {
        return {
          id : data._id,
          productName : data.productName,
          productPrice : data.productPrice,
          productBrand : data.productBrand,
          productBarcode: data.productBarcode,
          productDesc : data.productDesc,
          image : data.image // to get back the image also
        };
      });
    })) 
    .subscribe(transformedData => { 
      this.product = transformedData;
      this.UpdatedPrd.next([...this.product]); // Will send  the Complete data fetched from the DB to all the components that are subscribed to this SUbject
    })
}

// using observables to fetch and listening to the subject observable
getUpdate(){
  return this.UpdatedPrd.asObservable(); // returns the object to listen ; components get this object can only listen cant emit
}
// post
postProduct(productName:string, productPrice:string, productBrand:string,productBarcode : string,productDesc : string,image : File){
const prod = new FormData();
prod.append("productName",productName);
prod.append("productPrice",productPrice);
prod.append("productBrand",productBrand);
prod.append("productBarcode",productBarcode);
prod.append("productDesc",productDesc);
prod.append("image", image,productName); // here "image" should be same  in multer middleware ..
 
this.http.post<{product : Product }>("http://localhost:3000/api/post",  prod)
.subscribe((response)=>{
 // prod is of type Product (while creating to post )
  const prod : Product = {   id : response.product.id, //only my id will change and my image path others are same
     // so just assigning the same as what i recieve in the method call
    productName : productName,
    productPrice : productPrice,
    productBrand : productBrand,
    productBarcode : productBarcode,   // assigning Explicitly because Im receiving as json objects so assign each them to them exact match values.
    productDesc : productDesc,
    image : response.product.image
  }
  // const prdId = response.pid; // to have id being updated
  // prod.id = prdId // assign the value fetched above to be recieved one
  this.product.push(prod);
  this.UpdatedPrd.next([...this.product]); // push it in the UpdatedPrd so that it displayed to the componetns subscribed  this Subject..
  console.log(this.product);
})
}
// delete
deleteProduct(id : string){
this.http.delete("http://localhost:3000/api/delete/" + id)
.subscribe(() =>{
  const updateProducts = this.product.filter(data => data.id !== id);
  this.product = updateProducts;
  this.UpdatedPrd.next([...this.product]);
});
}

// to edit the product in product
getprodId(id : string){
             // gets the post object to be edit and returns
             // it has the ... to copy the dummy of the original array to not accidently
            // modify the original array
// return {...this.product.find(pid => pid.id === id)}; // this may not be sync and passed to a subscribe
             // checks for the product id with the array of id so we edit the correct product
return this.http
.get<{_id: string, productName:string, productPrice:string, productBrand:string,productBarcode : string,
  productDesc : string, image: string}>("http://localhost:3000/api/get/" + id);
// returns observable
}

//to edit and save it in the backend of the data in the product
updateProduct(id: string, productName:string, productPrice:string, 
  productBrand:string,productBarcode : string,productDesc : string, image : null){
const prod : Product ={
  id : id,
  productName : productName,
  productPrice : productPrice,
  productBrand : productBrand,
  productBarcode : productBarcode,
  productDesc : productDesc,
  image : null // image is null so can't edit image need to modify..
};
  this.http.put("http://localhost:3000/api/put/" + id, prod)
  .subscribe(data => {
    const updatedPrd = [...this.product]; // since ediitng find the id and and then update
        const oldPrdIndex = updatedPrd.findIndex(p => p.id === id);
        updatedPrd[oldPrdIndex] = prod // replacing the update with the new prd with prd above in the sending...
            this.product = updatedPrd // assign the object to the array 
            this.UpdatedPrd.next([...this.product]); //  send the response as the subject 
      });


}

}