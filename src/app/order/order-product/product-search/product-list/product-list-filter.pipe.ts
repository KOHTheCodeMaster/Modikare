import {Pipe, PipeTransform} from '@angular/core';
import {ProductModel} from "./product.model";

@Pipe({
  name: 'productListFilterPipe'
})
export class ProductListFilterPipe implements PipeTransform {

  transform(productList: ProductModel[], searchValue: string): any {

    if (searchValue == null) return productList;

    let strArray: string[] = searchValue.trim().toLowerCase().split(' ');

    return productList.filter(currentProductModel => {

      for (let word of strArray) {

        let tempNum = 0;
        let isNumber = !isNaN(+word); // isNumber will be true if word is a number
        if (isNumber) tempNum = parseInt(word);

        //  Check for all the fields if any of 'em contains the word
        if (currentProductModel.name.toLowerCase().includes(word)
          || currentProductModel.code.toLowerCase().includes(word)
          || currentProductModel.desc.toLowerCase().includes(word)
          || currentProductModel.mrp.toString().toLowerCase().includes(word)
          || currentProductModel.dp.toString().toLowerCase().includes(word)
          || currentProductModel.bv.toString().toLowerCase().includes(word)
          || currentProductModel.pv.toString().toLowerCase().includes(word))
          continue; // Return true if word exists in any of the fields of currentProductModel

        //  Reject currentProductModel and filter it out by removing it from the final list
        //  As it didn't pass all the checks
        return false;

      }

      return true;  //  Keep currentProductModel in list as it passed all the checks

    });

    // return value.filter((v) => v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.size.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}
