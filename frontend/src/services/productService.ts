import { api } from "../api/api";

/* Fetch all products or category-wise */
export const fetchProducts = async (categoryId?: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const params = categoryId ? { categoryId } : {};

  return api.get("/products/products", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Create product (Admin only) */
export const createProduct = async (payload: {
  Category_ID: string;
  Product_Name: string;
  Product_Description?: string;
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.post("/products/products", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Update product (Admin only) */
export const updateProduct = async (
  productId: string,
  payload: {
    Product_Name?: string;
    Product_Description?: string;
  }
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.put(`/products/products/${productId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
