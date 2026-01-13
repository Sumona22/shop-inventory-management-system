// frontend/src/services/cashierSalesService.ts
import { api } from "../api/api";

export const createSale = async (payload: {
  Payment_Mode: string;
  items: {
    ProductVariant_ID: string;
    Quantity: number;
    Selling_Price: number;
    Tax_Percentage: number;
  }[];
}) => {
  const res = await api.post("/sales", payload);
  return res.data;
};
