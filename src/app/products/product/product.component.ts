import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../product-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product.model';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private mode ="product"; // to have the mode of the form
  private productId : string; // to fetch the id of the product
  product : Product; // to store the returned object from service
imagePreview ;
  constructor(public service : ProductDataService , 
    private route : Router,
    public activeroute : ActivatedRoute) { }
 
    productGroup = new FormGroup({
   productName : new FormControl('', [Validators.required]),
   productPrice : new FormControl('',[Validators.required]),
   productBrand : new FormControl('',[Validators.required]),
   productBarcode : new FormControl('',[Validators.required]),
   productDesc : new FormControl(''),
   image: new FormControl('', [Validators.required])
 });
  
 ngOnInit() {
    this.activeroute.paramMap.subscribe((paramMap : ParamMap) => {
        if(paramMap.has('id')) // checks it whether the route is in the prod or edit route
        {
          this.mode = "edit"; // change route
          this.productId = paramMap.get('id'); // to add the id to the url
          this.service.getprodId(this.productId)     // store in product
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
              this.productGroup.setValue({
                productName : this.product.productName,
                productPrice : this.product.productPrice,
                productBrand : this.product.productBrand,
                productBarcode : this.product.productBarcode,
                productDesc : this.product.productDesc,
                image : this.product.image
              });
              console.log(prd);
            })
           

        }
        else
        {
          this.mode = "product"; //  do not change route
          this.productId = null; // no id will be there so null

        }
    });
   }
  
   addProduct(){
   //  const prod = this.productGroup.getRawValue();
     if(this.mode === "product"){
      this.service.postProduct( this.productGroup.value.productName,this.productGroup.value.productPrice,this.productGroup.value.productBrand,
        this.productGroup.value.productBarcode,this.productGroup.value.productDesc , this.productGroup.value.image);
      this.productGroup.reset();
      this.route.navigate(['/product-list'])
     }
     else {
       this.service.updateProduct(this.productId, this.productGroup.value.productName,this.productGroup.value.productPrice,this.productGroup.value.productBrand,
        this.productGroup.value.productBarcode,this.productGroup.value.productDesc, this.productGroup.value.image);
        this.route.navigate(['/product-list']);
     }
   }
   imagepick(event :Event){
     // stores  the image
     const file = (event.target as HTMLInputElement).files[0];
     this.productGroup.patchValue({image : file}); // the image property will be set to the file we get and passed in the addProduct Method!
   
     // adds a image preview
     this.productGroup.get('image').updateValueAndValidity();
     const reader = new FileReader();
     reader.onload= () => {
       this.imagePreview = reader.result;
     };
     reader.readAsDataURL(file);
   }
}
