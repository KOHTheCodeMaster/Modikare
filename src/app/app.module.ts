import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { OrderComponent } from './order/order.component';
import { OrderSummaryComponent } from './order/order-summary/order-summary.component';
import { OrderCartComponent } from './order/order-cart/order-cart.component';
import { OrderProductComponent } from './order/order-product/order-product.component';
import { ProductCategoryComponent } from './order/order-product/product-category/product-category.component';
import { ProductSearchComponent } from './order/order-product/product-search/product-search.component';
import { ProductListComponent } from './order/order-product/product-search/product-list/product-list.component';
import { ProductItemComponent } from './order/order-product/product-search/product-list/product-item/product-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    OrderComponent,
    OrderSummaryComponent,
    OrderCartComponent,
    OrderProductComponent,
    ProductCategoryComponent,
    ProductSearchComponent,
    ProductListComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
