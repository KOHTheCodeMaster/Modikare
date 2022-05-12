import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ProductModel} from "../order-product/product-search/product-list/product.model";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-order-qty',
  templateUrl: './order-qty.component.html',
  styleUrls: ['./order-qty.component.css']
})
export class OrderQtyComponent implements OnInit {

  @Input() public productModel: ProductModel;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
  }

  decrementQtyBy1() {
    this.productModel.qty--;
    this.orderService.cartUpdated(this.productModel, '-');
  }

  incrementQtyBy1() {
    this.productModel.qty++;
    this.orderService.cartUpdated(this.productModel, '+');
  }

/*
  resetQty() {
    this.productModel.qty = 0;
    this.orderService.cartUpdated(this.productModel, 'x');
  }
*/

}
