import { api } from "../api/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");
  return { Authorization: `Bearer ${token}` };
};

/* =========================
   Fetch Categories
========================= */
export const fetchCategoriesService = async () => {
  const res = await api.get("/products/categories", {
    headers: getAuthHeader(),
  });
  return { data: res.data };
};

/* =========================
   Fetch Brands
========================= */
export const fetchBrandsService = async () => {
  const res = await api.get("/products/brands", {
    headers: getAuthHeader(),
  });
  return { data: res.data };
};

/* =========================
   Fetch Products by Category
========================= */
export const fetchProductsByCategoryService = async (categoryId: string) => {
  if (!categoryId) return { data: [] };

  const res = await api.get("/products/products", {
    params: { categoryId },
    headers: getAuthHeader(),
  });

  return { data: res.data };
};

/* =========================
   ✅ Fetch Product Variants (FIXED)
========================= */
export const fetchProductVariantsService = async (
  productId: string,
  brandId: string
) => {
  if (!productId || !brandId) return { data: [] };

  const res = await api.get("/products/variants", { // ✅ FIX HERE
    params: { productId, brandId },
    headers: getAuthHeader(),
  });

  return { data: res.data };
};
