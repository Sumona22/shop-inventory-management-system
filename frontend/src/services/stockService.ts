import { api } from "../api/api";

/* ===============================
   BRANCH PRODUCTS (Enable / List)
================================ */

/**
 * Enable a product variant for the current branch
 * (Creates BranchProduct)
 */
export const enableProductForBranchService = (
  Product_Variant_ID: string
) => {
  return api.post("/stock/branch-products", {
    Product_Variant_ID,
  });
};

/**
 * Get all enabled products for a branch
 * (BranchProduct list)
 */
export const fetchBranchProductsService = () => {
  return api.get("/stock/branch-products");
};

/**
 * Update branch product (activate / deactivate etc.)
 */
export const updateBranchProductService = (
  branchProductId: string,
  payload: any
) => {
  return api.put(`/stock/branch-products/${branchProductId}`, payload);
};

/* ===============================
   BRANCH STOCK
================================ */

/**
 * Get all stock entries for a branch
 */
export const fetchBranchStockService = (branchId: string) => {
  return api.get(`/stock/stocks/${branchId}`);
};

/**
 * Get stock for a specific branch product
 */
export const fetchBranchProductStockService = (
  branchId: string,
  branchProductId: string
) => {
  return api.get(
    `/stock/stocks/${branchId}/product/${branchProductId}`
  );
};

/**
 * Update stock quantity (manual adjustment / admin)
 */
export const updateBranchStockService = (
  branchId: string,
  branchProductId: string,
  payload: {
    Quantity: number;
  }
) => {
  return api.put(
    `/stock/stocks/${branchId}/product/${branchProductId}`,
    payload
  );
};
