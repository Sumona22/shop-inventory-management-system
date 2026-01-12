export interface SaleItem {
  _id: string;

  Product_ID: { Name: string };
  ProductVariant_ID: { Variant_Name: string };
  Category_ID: { Name: string };
  Brand_ID: { Name: string };

  Quantity: number;
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
