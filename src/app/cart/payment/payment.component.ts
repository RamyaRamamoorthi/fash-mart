import { Component, OnInit } from '@angular/core';
import { AddCartService } from '../add-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

 ActualAmount: number ;
  constructor(public cartservice : AddCartService, 
    private activeroute : ActivatedRoute) {
     
    }
      

  ngOnInit() {
    this.cartservice.TotalAmount.subscribe(data => {
      this.ActualAmount = data;
      console.log(this.ActualAmount)});
  }


  

}
