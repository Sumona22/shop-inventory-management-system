export const normalizeSKU = (sku: string): string => {
  return sku
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};
