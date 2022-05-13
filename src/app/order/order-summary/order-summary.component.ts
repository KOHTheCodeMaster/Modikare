import {Component, OnInit} from '@angular/core';
import {OrderSummaryModel} from "./order-summary.model";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  public orderSummaryModel: OrderSummaryModel;

  constructor(private orderService: OrderService) {
    this.orderSummaryModel = orderService.getOrderSummaryModel();
  }

  ngOnInit(): void {
    // this.init();
  }

  init() {
    // this.orderSummaryModel = new OrderSummaryModel();
    this.orderSummaryModel.uniqueProductCount = 2;
    this.orderSummaryModel.totalMRP = 500;
    this.orderSummaryModel.totalDP = 400;
    this.orderSummaryModel.totalBV = 250;
    this.orderSummaryModel.totalPV = 10;
    this.orderSummaryModel.totalQty = 4;
    this.orderSummaryModel.netAmount = this.orderSummaryModel.totalDP;

  }

}
