// frontend/src/services/salesService.ts
import { api } from "../api/api";
import type {
  SalesAnalyticsPoint,
  SalesFilterParams,
  SaleItem,
} from "../types/sales";

/* ======================================================
   SALES ANALYTICS (Charts)
   - day | month | year
   - Admin / Store Manager
====================================================== */
export const fetchSalesAnalytics = async (
  params: SalesFilterParams & {
    groupBy?: "day" | "month" | "year";
  }
): Promise<SalesAnalyticsPoint[]> => {
  const res = await api.get("/sales/analytics", { params });

  // ✅ normalize backend response safely
  if (Array.isArray(res.data)) {
    return res.data as SalesAnalyticsPoint[];
  }

  if (res.data && Array.isArray(res.data.analytics)) {
    return res.data.analytics as SalesAnalyticsPoint[];
  }

  return [];
};

/* ======================================================
   SALES REPORT (Table)
   - Branch / Product / Category / Brand / Variant
   - Date range
====================================================== */
export const fetchSalesReport = async (
  params: SalesFilterParams
): Promise<SaleItem[]> => {
  const res = await api.get("/sales/report", { params });

  // ✅ normalize backend response safely
  if (Array.isArray(res.data)) {
    return res.data as SaleItem[];
  }

  if (res.data && Array.isArray(res.data.data)) {
    return res.data.data as SaleItem[];
  }

  return [];
};
