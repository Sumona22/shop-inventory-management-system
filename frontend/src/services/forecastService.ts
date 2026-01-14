import { api } from "../api/api";

export const fetchStockoutForecast = async (payload: {
  ProductVariant_ID: string;
}) => {
  return api.post("/forecast/stockout", payload);
};
