export interface Supplier {
  _id: string;
  Supplier_Name: string;
  Supplier_Email: string;
  Supplier_Address: string;
  Supplier_Phone?: string;
  GST_Number?: string;
  Notes?: string;
  Is_Active: boolean;
}
