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


  /*
    validateQty(inputElement: HTMLInputElement) {

      let strInputQty = inputElement.value;
      // inputElement.value = 'AAA'
      console.log("L0G: validateQty(): strInputQty -> " + strInputQty)

      let isNumber = !isNaN(+strInputQty);

      if (!isNumber) {
        inputElement.value = '0';
        return;
      }

      let tempNumber = parseInt(strInputQty);
      if (tempNumber < 0 || tempNumber > 1000) inputElement.value ="999";

    }
  */
}
