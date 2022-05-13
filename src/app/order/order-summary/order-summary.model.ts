export class OrderSummaryModel {


  constructor(public totalMRP: number, public totalDP: number, public totalBV: number,
              public totalPV: number, public totalQty: number, public uniqueProductCount: number,
              public netAmount: number) {
  }

}
