import { api } from "../api/api";

/* Fetch all brands */
export const fetchBrands = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.get("/products/brands", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Fetch brand by ID */
export const fetchBrandById = async (brandId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.get(`/products/brands/${brandId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Create brand (Admin only) */
export const createBrand = async (payload: {
  Brand_Name: string;
  Brand_Description?: string;
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.post("/products/brands", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Update brand (Admin only) */
export const updateBrand = async (
  brandId: string,
  payload: {
    Brand_Name?: string;
    Brand_Description?: string;
  }
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.put(`/products/brands/${brandId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
