import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../order-product/product-search/product-list/product.model";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {

  cartProductList: ProductModel[];

  constructor(private orderService: OrderService) {
    this.cartProductList = orderService.getCartProductList();
  }

  ngOnInit(): void {
  }

}
