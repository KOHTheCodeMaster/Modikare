import {Component, OnInit} from '@angular/core';
import {ProductModel} from './product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: ProductModel[];

  constructor() {
    this.productList = [];
  }

  ngOnInit(): void {
    console.log("Product List Component ngOnInit():");
    this.init();
  }

  init() {
    console.log("Initialize Product List.");
    this.stubProductList();
  }

  stubProductList() {

    console.log("Stubbing Product List.");

    this.productList = [
      new ProductModel(1, 'Code 1', 'Product Name 1', 'Desc 1', 'imgPath 1', 10, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(2, 'Code 2', 'Product Name 2', 'Desc 2', 'imgPath 2', 10, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(3, 'Code 3', 'Product Name 3', 'Desc 3', 'imgPath 3', 10, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(4, 'Code 4', 'Product Name 4', 'Desc 4', 'imgPath 4', 10, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(5, 'Code 5', 'Product Name 5', 'Desc 5', 'imgPath 5', 10, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(6, 'Code 6', 'Product Name 6', 'Desc 6', 'imgPath 6', 10, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(7, 'Code 7', 'Product Name 7', 'Desc 7', 'imgPath 7', 10, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(8, 'Code 8', 'Product Name 8', 'Desc 8', 'imgPath 8', 10, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(9, 'Code 9', 'Product Name 9', 'Desc 9', 'imgPath 9', 10, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
    ];
    console.log(this.productList);


  }

  getRandomInt(max): number {
    return Math.floor(Math.random() * max);
  }

}
