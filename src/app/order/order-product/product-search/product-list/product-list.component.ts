import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from './product.model';
import {OrderService} from "../../../order.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  items = Array.from({length: 1000}).map((_, i) => `Item ${i}`);

  productList: ProductModel[];
  @Input() strSearch: string;

  constructor(private orderService: OrderService) {
    this.productList = orderService.getProductList();
  }

  ngOnInit(): void {
    console.log("Product List Component ngOnInit():");
  }


}
