import axios from "axios";
import type { SimpleEntity } from "../types/common";

export const fetchCategories = async (): Promise<SimpleEntity[]> => {
  const res = await axios.get("/categories");
  return res.data;
};

export const fetchBrands = async (): Promise<SimpleEntity[]> => {
  const res = await axios.get("/brands");
  return res.data;
};

export const fetchProducts = async (
  categoryId?: string,
  brandId?: string
): Promise<SimpleEntity[]> => {
  const res = await axios.get("/products", {
    params: { categoryId, brandId },
  });
  return res.data;
};

export const fetchVariants = async (
  productId?: string
): Promise<SimpleEntity[]> => {
  if (!productId) return [];
  const res = await axios.get(`/product-variants/${productId}`);
  return res.data;
};

export const fetchBatches = async (
  variantId?: string
): Promise<SimpleEntity[]> => {
  if (!variantId) return [];
  const res = await axios.get(`/batches/${variantId}`);
  return res.data;
};

export const fetchBranches = async (): Promise<SimpleEntity[]> => {
  const res = await axios.get("/branches");

  // normalize all possible backend shapes
  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data.data)) {
    return res.data.data;
  }

  if (Array.isArray(res.data.branches)) {
    return res.data.branches;
  }

  return [];
};
