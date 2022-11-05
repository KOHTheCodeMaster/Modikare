import { ProductModel } from "./order-product/product-search/product-list/product.model";
import { EventEmitter } from "@angular/core";
import { OrderSummaryModel } from "./order-summary/order-summary.model";
import * as ProductListFromJson from "../../assets/res/db/latest-product-list.json";

export class OrderService {

  // productAdded: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  productList: ProductModel[];
  cartProductList: ProductModel[];
  orderSummaryModel: OrderSummaryModel;

  constructor() {
    this.init();
  }

  getOrderSummaryModel() {
    return this.orderSummaryModel;
  }

  getProductList() {
    return this.productList.slice();
  }

  getCartProductList() {
    return this.cartProductList;
  }

  cartUpdated(productModel: ProductModel, strQtyUpdateParam: string, deletedProductQty?: number) {

    let pos = this.getPosFromCartProductList(productModel);

    // given productModel doesn't exists in the cart yet, Adding it now.
    if (pos === -1) {
      this.cartProductList.push(productModel);
      this.updateOrderSummaryModel(productModel, 'add');
      return;
    }

    //  If Delete Btn. is clicked
    if (strQtyUpdateParam === 'x') {
      this.cartProductList.splice(pos, 1);
      this.updateOrderSummaryModel(productModel, 'x', deletedProductQty);
      return;
    }

    //  Update Order Summary by removing 1 Product Item Values
    if (strQtyUpdateParam === '-') {
      // If '-' btn. is clicked & qty becomes 0, then remove from cart
      if (this.cartProductList[pos].qty === 0) this.cartProductList.splice(pos, 1);
      this.updateOrderSummaryModel(productModel, '-');
    }

    //  Update Order Summary by adding 1 Product Item Values
    if (strQtyUpdateParam === '+') this.updateOrderSummaryModel(productModel, '+');

  }

  private updateOrderSummaryModel(productModel: ProductModel, strUpdateParam: string, deletedProductQty?: number) {

    this.orderSummaryModel.uniqueProductCount = this.cartProductList.length;
    deletedProductQty = deletedProductQty != null ? deletedProductQty : 0;

    if (strUpdateParam === '+' || strUpdateParam === 'add') {
      this.orderSummaryModel.netAmount += productModel.dp;
      this.orderSummaryModel.totalDP += productModel.dp;
      this.orderSummaryModel.totalMRP += productModel.mrp;
      this.orderSummaryModel.totalPV += productModel.pv;
      this.orderSummaryModel.totalBV += productModel.bv;
      this.orderSummaryModel.totalQty++;
    } else if (strUpdateParam === '-') {
      this.orderSummaryModel.netAmount -= productModel.dp;
      this.orderSummaryModel.totalDP -= productModel.dp;
      this.orderSummaryModel.totalMRP -= productModel.mrp;
      this.orderSummaryModel.totalPV -= productModel.pv;
      this.orderSummaryModel.totalBV -= productModel.bv;
      this.orderSummaryModel.totalQty--;
    } else if (strUpdateParam === 'x') {
      this.orderSummaryModel.netAmount -= productModel.dp * deletedProductQty;
      this.orderSummaryModel.totalDP -= productModel.dp * deletedProductQty;
      this.orderSummaryModel.totalMRP -= productModel.mrp * deletedProductQty;
      this.orderSummaryModel.totalPV -= productModel.pv * deletedProductQty;
      this.orderSummaryModel.totalBV -= productModel.bv * deletedProductQty;
      this.orderSummaryModel.totalQty -= deletedProductQty;
    }
  }

  private getPosFromCartProductList(productModel: ProductModel) {
    let pos = -1;
    this.cartProductList.forEach((value, i) => {
      if (value.code === productModel.code) {
        pos = i;
        return;
      }
    });
    return pos;
  }

  init() {
    console.log("Initialize Product List.");
    this.stubProductListFromJson();
    // this.stubProductList();
    // this.stubProductList2();
    this.cartProductList = [];
    this.orderSummaryModel = new OrderSummaryModel(0, 0, 0, 0, 0, 0, 0);
  }

  stubProductList() {

    console.log("Stubbing Product List.");

    this.productList = [


      // new ProductModel(0, 'C0', 'P0', 'Desc 1', 'imgPath 1', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),

      new ProductModel(1, '0001ML', 'Super Black', 'Description Here.', 'imgPath', 0, 700, 593, 355.8, 13.18),
      new ProductModel(2, '0002ML', 'Super Blue', 'Description Here.', 'imgPath', 0, 700, 593, 355.8, 13.18),
      new ProductModel(3, '600825', 'MODICARE ENVIROCHIP RADIATION PROTECTION-TRI BAND', 'Description Here.', 'imgPath', 0, 600, 500, 325, 12.04),
      new ProductModel(4, '600836', 'Modicare Carry Bag', 'Description Here.', 'imgPath', 0, 5, 4.75, 0, 0),
      new ProductModel(5, '600848', 'Modicare Button Buddies (Pack of 2)', 'Description Here.', 'imgPath', 0, 40, 40, 8, 0.3),
      new ProductModel(6, '600900', 'Modicare Consultant Bundi (Small)', 'Description Here.', 'imgPath', 0, 1950, 1950, 390, 14.44),
      new ProductModel(7, '600901', 'Modicare Demo Kit', 'Description Here.', 'imgPath', 0, 495, 495, 198, 7.33),
      new ProductModel(8, '600920', 'Sapne (Product Catalogue) - English (single)', 'Description Here.', 'imgPath', 0, 32, 32, 6.4, 0.24),
      new ProductModel(9, '600946', 'Urban Color Red Floral Pouch', 'Description Here.', 'imgPath', 0, 350, 175, 35, 1.3),
      new ProductModel(10, '600947', 'Urban Color Multicolored Pouch', 'Description Here.', 'imgPath', 0, 350, 175, 35, 1.3),
      
    ];

    console.log('[' + this.productList.length + '] Products Loaded successfully.');

  }

  stubProductList2() {

    console.log("Stubbing Product List.");

    this.productList = [
      new ProductModel(0, 'C0', 'P0', 'Desc 1', 'imgPath 1', 0, this.getRandomInt(500), this.getRandomInt(400), this.getRandomInt(300), this.getRandomInt(20)),
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


  stubProductListFromJson() {

    console.log("stubProductListFromJson");

    this.productList = [];
    let productListFromJson = JSON.parse(JSON.stringify(ProductListFromJson));
//     console.log("Type: " + typeof productListFromJson + " |  Size: " + productListFromJson.length);
    let id: number = 0;
    for (let key in productListFromJson) {

      let product = productListFromJson[key];
      
      //  Ignore 2 Blank Entries at the end (Although this is UNKNOWN Error since JSON File doesn't have any blank keys)
      if (product["code"] == undefined) continue;

      let productModel = new ProductModel(
        id, product["code"], product["name"],
        'DESCRIPTION', 'Image Path', 0,
        product["MRP"], product["DP"], product["BV"], product["PV"]
      );
      this.productList.push(productModel);
      id = id + 1;
    }
    
  }

  getRandomInt(max): number {
    return Math.floor(Math.random() * max);
  }
}
