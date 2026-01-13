// frontend/src/types/dropdown.ts

/* ---------- Branch ---------- */
export interface RawBranch {
  _id: string;
  Branch_Name: string;
}

/* ---------- Category ---------- */
export interface RawCategory {
  _id: string;
  Category_Name: string;
}

/* ---------- Brand ---------- */
export interface RawBrand {
  _id: string;
  Brand_Name: string;
}

/* ---------- Product ---------- */
export interface RawProduct {
  _id: string;
  Product_Name: string;
  SKU?: string;          // optional, but supported
}

/* ---------- Product Variant ---------- */
export interface RawProductVariant {
  _id: string;
  Variant_Name: string;
  SKU?: string;          // variants may also carry SKU
}

/* ---------- Batch ---------- */
export interface RawBatch {
  _id: string;
  Batch_Number?: number; // number preferred
  Batch_Code?: string;   // fallback if number not present
}
