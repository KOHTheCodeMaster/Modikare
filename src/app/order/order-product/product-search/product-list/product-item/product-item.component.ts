import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() public productModel: ProductModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
