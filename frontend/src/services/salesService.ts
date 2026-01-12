import axios from "axios";
import type {
  SalesAnalyticsPoint,
  SalesFilterParams,
  SaleItem,
} from "../types/sales";

export const fetchSalesAnalytics = async (
  params: SalesFilterParams
): Promise<SalesAnalyticsPoint[]> => {
  const res = await axios.get("/sales/analytics", { params });

  // ✅ normalize backend response
  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data.analytics)) {
    return res.data.analytics;
  }

  return [];
};

export const fetchSalesReport = async (
  params: SalesFilterParams
): Promise<SaleItem[]> => {
  const res = await axios.get("/sales/report", { params });

  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data.data)) {
    return res.data.data;
  }

  return [];
};
