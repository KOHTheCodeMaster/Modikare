import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from './product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: ProductModel[];
  @Input() strSearch: string;

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
      new ProductModel(1, 'Code 1', 'Sofwash Lime Soap New', 'Desc 1', 'imgPath 1', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(2, 'Code 2', 'Fruit Of The Earth Coconut Oil', 'Desc 2', 'imgPath 2', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(3, 'Code 3', 'Soul Flavours Strong CTC Tea', 'Desc 3', 'imgPath 3', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(4, 'Code 4', 'Soul Flavours Strong CTC Tea', 'Desc 4', 'imgPath 4', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(5, 'Code 5', 'Salon Professional Advance Formula Smooth & Shine Shampoo - 288ml(6ml*48 sachets)', 'Desc 5', 'imgPath 5', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(6, 'Code 6', 'Salon Professional Advance Formula Smooth & Shine Shampoo', 'Desc 6', 'imgPath 6', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(7, 'HL2003', 'Well Amrit Shakti', 'Desc 7', 'imgPath 7', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(8, 'Code 8', 'Product Name 8', 'Desc 8', 'imgPath 8', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
      new ProductModel(9, 'Code 9', 'Product Name 9', 'Desc 9', 'imgPath 9', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
    ];

    console.log(this.productList);

  }

  getRandomInt(max): number {
    return Math.floor(Math.random() * max);
  }

}
