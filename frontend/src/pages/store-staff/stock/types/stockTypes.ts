export interface BrandRef {
  _id: string;
  Brand_Name: string;
}

export interface CategoryRef {
  _id: string;
  Category_Name: string;
}

export interface ProductRef {
  _id: string;
  Product_Name: string;
  Category_ID?: CategoryRef;
}

export interface ProductVariantRef {
  _id: string;
  SKU: string;
  Tracking_Type: "BATCH" | "ITEM";
  Brand_ID?: BrandRef;
  Product_ID?: ProductRef;
}

export interface BranchProduct {
  _id: string;
  Product_Variant_ID: ProductVariantRef;
}

export interface Batch {
  _id: string;
  Branch_Product_ID: BranchProduct;
  Batch_No: string;
  Quantity: number;
  Expiry_Date?: string;
  Status: string;
}

export interface Item {
  _id: string;
  Branch_Product_ID: BranchProduct;
  Item_No: string;
  Item_Status: "IN_STOCK" | "SOLD";
}
