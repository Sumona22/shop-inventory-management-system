export interface Product {
  _id: string;
  Product_Name: string;
  Product_Description?: string;
  Category_ID: {
    _id: string;
    Category_Name: string;
  };
}
