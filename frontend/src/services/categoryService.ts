import { api } from "../api/api";

/* Fetch all categories */
export const fetchCategories = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.get("/products/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Fetch category by ID */
export const fetchCategoryById = async (categoryId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.get(`/products/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Create category (Admin only) */
export const createCategory = async (payload: {
  Category_Name: string;
  Category_Description?: string;
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.post("/products/categories", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* Update category (Admin only) */
export const updateCategory = async (
  categoryId: string,
  payload: {
    Category_Name?: string;
    Category_Description?: string;
  }
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return api.put(`/products/categories/${categoryId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
