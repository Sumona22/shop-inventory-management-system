export interface SaleItem {
  _id: string;

  Product_ID: { Name: string };
  ProductVariant_ID: { Variant_Name: string };
  Category_ID: { Name: string };
  Brand_ID: { Name: string };

  Quantity: number;
  Cost_Price: number;
  Selling_Price: number;
  Tax_Percentage: number;
  Line_Total: number;

  Created_At: string;
}

export interface SalesAnalyticsPoint {
  _id: string; // date label
  Total_Sales: number;
  Quantity_Sold: number;
}

export interface SalesFilterParams {
  Branch_ID?: string;

  Product_ID?: string;
  ProductVariant_ID?: string;
  Category_ID?: string;
  Brand_ID?: string;

  Batch_ID?: string;
  Item_ID?: string;

  startDate?: string;
  endDate?: string;

  groupBy?: "day" | "week" | "month" | "year";
}


