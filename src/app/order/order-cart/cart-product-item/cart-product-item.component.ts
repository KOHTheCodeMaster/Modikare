import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../order-product/product-search/product-list/product.model";
import {OrderService} from "../../order.service";

@Component({
  selector: 'app-cart-product-item',
  templateUrl: './cart-product-item.component.html',
  styleUrls: ['./cart-product-item.component.css']
})
export class CartProductItemComponent implements OnInit {

  @Input() serialNo: number;
  @Input() productModel: ProductModel;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
  }

  resetQty() {
    this.productModel.qty = 0;
    this.orderService.cartUpdated(this.productModel, 'x');
  }
}
