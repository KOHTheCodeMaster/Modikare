import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  product: ProductModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
