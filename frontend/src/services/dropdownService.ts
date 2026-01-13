// frontend/src/services/dropdownService.ts
import { api } from "../api/api";
import type { SimpleEntity } from "../types/common";
import type {
  RawBranch,
  RawCategory,
  RawBrand,
  RawProduct,
  RawProductVariant,
  RawBatch,
} from "../types/dropdown";

/**
 * Normalize backend responses into arrays (STRICT TS SAFE)
 */
const normalize = (resData: unknown, key?: string): unknown[] => {
  if (Array.isArray(resData)) return resData;

  if (
    key &&
    typeof resData === "object" &&
    resData !== null &&
    Array.isArray((resData as Record<string, unknown>)[key])
  ) {
    return (resData as Record<string, unknown>)[key] as unknown[];
  }

  if (
    typeof resData === "object" &&
    resData !== null &&
    Array.isArray((resData as { data?: unknown }).data)
  ) {
    return (resData as { data: unknown[] }).data;
  }

  return [];
};

/**
 * Helper to build a FULL SimpleEntity with safe defaults
 */
const buildEntity = (partial: Partial<SimpleEntity>): SimpleEntity => ({
  _id: partial._id ?? "",
  Name: partial.Name ?? "",

  Branch_Name: partial.Branch_Name ?? "",
  Category_Name: partial.Category_Name ?? "",
  Brand_Name: partial.Brand_Name ?? "",
  Product_Name: partial.Product_Name ?? "",

  SKU: partial.SKU ?? "",
  Batch_No: partial.Batch_No ?? 0,
});

/* ---------------- Branches ---------------- */
export const fetchBranches = async (): Promise<SimpleEntity[]> => {
  const res = await api.get("/branches");
  const raw = normalize(res.data) as RawBranch[];

  return raw.map<SimpleEntity>((b) =>
    buildEntity({
      _id: b._id,
      Name: b.Branch_Name,
      Branch_Name: b.Branch_Name,
    })
  );
};

/* ---------------- Categories ---------------- */
export const fetchCategories = async (): Promise<SimpleEntity[]> => {
  const res = await api.get("/products/categories");
  const raw = normalize(res.data, "categories") as RawCategory[];

  return raw.map<SimpleEntity>((c) =>
    buildEntity({
      _id: c._id,
      Name: c.Category_Name,
      Category_Name: c.Category_Name,
    })
  );
};

/* ---------------- Brands ---------------- */
export const fetchBrands = async (): Promise<SimpleEntity[]> => {
  const res = await api.get("/products/brands");
  const raw = normalize(res.data, "brands") as RawBrand[];

  return raw.map<SimpleEntity>((b) =>
    buildEntity({
      _id: b._id,
      Name: b.Brand_Name,
      Brand_Name: b.Brand_Name,
    })
  );
};

/* ---------------- Products ---------------- */
export const fetchProducts = async (
  categoryId?: string,
  brandId?: string
): Promise<SimpleEntity[]> => {
  const res = await api.get("/products/products", {
    params: { categoryId, brandId },
  });

  const raw = normalize(res.data, "products") as RawProduct[];

  return raw.map<SimpleEntity>((p) =>
    buildEntity({
      _id: p._id,
      Name: p.Product_Name,
      Product_Name: p.Product_Name,
      SKU: p.SKU ?? "",
    })
  );
};

/* ---------------- Variants ---------------- */
export const fetchVariants = async (
  productId?: string
): Promise<SimpleEntity[]> => {
  if (!productId) return [];

  const res = await api.get("/products/variants", {
    params: { Product_ID: productId },
  });

  const raw = normalize(res.data, "variants") as RawProductVariant[];

  return raw.map<SimpleEntity>((v) =>
    buildEntity({
      _id: v._id,
      Name: v.Variant_Name,
      Product_Name: v.Variant_Name,
      SKU: v.SKU ?? "",
    })
  );
};

/* ---------------- Batches ---------------- */
export const fetchBatches = async (
  branchId?: string
): Promise<SimpleEntity[]> => {
  if (!branchId) return [];

  const res = await api.get("/batches/branch", {
    params: { Branch_ID: branchId },
  });

  const raw = normalize(res.data, "batches") as RawBatch[];

  return raw.map<SimpleEntity>((b) =>
    buildEntity({
      _id: b._id,
      Name: b.Batch_Code ?? b._id,
      Batch_No: b.Batch_Number ?? 0,
    })
  );
};
