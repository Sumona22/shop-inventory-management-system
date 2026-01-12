import { api } from "../api/api";

/* Fetch product variants (filterable) */
export const fetchProductVariants = async (filters?: {
  productId?: string;
  brandId?: string;
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.get("/products/variants", {
    params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Create product variant (Admin only) */
export const createProductVariant = async (payload: {
  Product_ID: string;
  Brand_ID: string;
  SKU: string;
  Pack_Size: number;
  Unit: string;
  Price: number;
  Attributes?: Record<string, string>;
  Tracking_Type: "BATCH" | "ITEM";
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.post("/products/variants", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Update product variant (Admin only) */
export const updateProductVariant = async (
  variantId: string,
  payload: {
    SKU?: string;
    Pack_Size?: number;
    Unit?: string;
    Price?: number;
    Attributes?: Record<string, string>;
    Tracking_Type?: "BATCH" | "ITEM";
    Brand_ID?: string;
  }
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.put(`/products/variants/${variantId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
