import { api } from "../api/api";

/* ===============================
   HELPER: get auth headers
================================ */
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return { Authorization: `Bearer ${token}` };
};

/* ===============================
   CREATE / ENABLE PRODUCT FOR BRANCH
   (StoreManager only)
================================ */
export const createBranchProduct = async (payload: {
  Product_Variant_ID: string;
  Alert_Threshold?: number;
}) => {
  try {
    const { data } = await api.post("/stock/branch-products", payload, {
      headers: getAuthHeader(),
    });
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

/* ===============================
   GET BRANCH PRODUCTS
   - Admin: all branches OR filtered
   - Others: auto-restricted to own branch
================================ */
export const fetchBranchProducts = async (params?: {
  branchId?: string;
  productVariantId?: string;
}) => {
  try {
    const { data } = await api.get("/stock/branch-products", {
      params,
      headers: getAuthHeader(),
    });
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

/* ===============================
   GET BRANCH PRODUCTS BY BRANCH ID
   - Admin: any branch
   - Others: own branch only
================================ */
export const fetchBranchProductsByBranch = async (branchId?: string) => {
  const branch = branchId || localStorage.getItem("branchId");
  if (!branch) throw new Error("Branch ID not found");

  try {
    const { data } = await api.get(`/stock/branch-products/branch/${branch}`, {
      headers: getAuthHeader(),
    });
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

/* ===============================
   UPDATE BRANCH PRODUCT
   (StoreManager – own branch only)
================================ */
export const updateBranchProduct = async (
  branchProductId: string,
  payload: { Alert_Threshold?: number; Is_Active?: boolean }
) => {
  try {
    const { data } = await api.put(
      `/stock/branch-products/${branchProductId}`,
      payload,
      { headers: getAuthHeader() }
    );
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

/* ===============================
   GET ALL STOCK FOR A BRANCH
   - Admin: any branch
   - Others: own branch only
================================ */
export const fetchBranchStock = async (branchId?: string) => {
  const branch = branchId || localStorage.getItem("branchId");
  if (!branch) throw new Error("Branch ID not found");

  try {
    const { data } = await api.get(`/stock/stocks/${branch}`, {
      headers: getAuthHeader(),
    });
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

/* ===============================
   GET STOCK FOR A SPECIFIC BRANCH PRODUCT
================================ */
export const fetchBranchProductStock = async (
  branchProductId: string,
  branchId?: string
) => {
  const branch = branchId || localStorage.getItem("branchId");
  if (!branch) throw new Error("Branch ID not found");

  try {
    const { data } = await api.get(
      `/stock/stocks/${branch}/product/${branchProductId}`,
      { headers: getAuthHeader() }
    );
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

/* ===============================
   UPDATE BRANCH STOCK (MANUAL)
   - Admin
   - StoreManager (own branch only)
================================ */
export const updateBranchStock = async (
  branchProductId: string,
  quantity: number,
  branchId?: string
) => {
  const branch = branchId || localStorage.getItem("branchId");
  if (!branch) throw new Error("Branch ID not found");

  try {
    const { data } = await api.put(
      `/stock/stocks/${branch}/product/${branchProductId}`,
      { quantity },
      { headers: getAuthHeader() }
    );
    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};
