export interface ProductRef {
  _id: string;
  Product_Name: string;
}

export interface BrandRef {
  _id: string;
  Brand_Name: string;
}

export interface ProductVariant {
  _id: string;
  Product_ID: ProductRef;
  Brand_ID: BrandRef;
  SKU: string;
  SKU_Normalized: string;
  Pack_Size: number;
  Unit: string;
  Price: number;
  Tracking_Type: "BATCH" | "ITEM";
  Attributes?: Record<string, string>;
}
