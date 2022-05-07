import {Component, OnInit} from '@angular/core';
import {ProductCategoryModel} from './product-category.model';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  productCategoryList: ProductCategoryModel[];

  constructor() {
    this.productCategoryList = [];
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    //  Initialize Category List
    console.log("Initialize Category List.");
    this.stubProductCategoryList();
    // this.productCategoryList = new ProductCategoryModel[10];
  }

  stubProductCategoryList() {

    let categoryList: ProductCategoryModel[] = [
      new ProductCategoryModel(1, "Category A"),
      new ProductCategoryModel(2, "Category B"),
      new ProductCategoryModel(3, "Category C")
    ];

    console.log("Stub Product Category List with Dummy Data.");
    this.productCategoryList = categoryList;

  }

}

