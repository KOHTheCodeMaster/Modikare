import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../product.model';
import {OrderService} from "../../../../order.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() public productModel: ProductModel;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
  }

  resetQty() {
    this.productModel.qty = 0;
    this.orderService.cartUpdated(this.productModel, 'x');
  }

}
