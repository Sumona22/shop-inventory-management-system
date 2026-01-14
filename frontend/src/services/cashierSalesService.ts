import { api } from "../api/api";

export interface SaleItemPayload {
  ProductVariant_ID: string;
  Quantity: number;
  Selling_Price: number;
  Tax_Percentage: number;
}

export const createSale = async (payload: {
  Business_ID: string;
  Branch_ID: string;
  Payment_Mode: "Cash" | "Card" | "UPI";
  Customer_Name?: string;
  Customer_Phone?: string;
  Discount?: number;
  items: SaleItemPayload[];
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.post("/sales", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
