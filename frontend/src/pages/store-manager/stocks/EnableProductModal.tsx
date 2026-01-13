import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";
import type { BrandRef, CategoryRef, ProductRef, ProductVariant } from "../../admin/products/product-variants/types/productVariantTypes";
import { fetchCategories, fetchBrands, fetchProducts } from "../../../services/dropdownService";
import { fetchProductVariants } from "../../../services/productVariantService";
import { createBranchProduct } from "../../../services/stockService";





interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const EnableProductModal = ({ open, onClose, onSuccess }: Props) => {
  const [categories, setCategories] = useState<CategoryRef[]>([]);
  const [products, setProducts] = useState<ProductRef[]>([]);
  const [brands, setBrands] = useState<BrandRef[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<CategoryRef | null>(null);
  const [product, setProduct] = useState<ProductRef | null>(null);
  const [brand, setBrand] = useState<BrandRef | null>(null);
  const [variant, setVariant] = useState<ProductVariant | null>(null);

  /* Load categories & brands */
  useEffect(() => {
    fetchCategories().then((res) => setCategories(res || []));
    fetchBrands().then((res) => setBrands(res|| []));
  }, []);

  /* Load products by selected category */
  useEffect(() => {
    if (!category) {
      setProducts([]);
      setProduct(null);
      return;
    }
    fetchProducts(category._id).then((res) => setProducts(res|| []));
  }, [category]);

  /* Load variants by selected category/product/brand */
  useEffect(() => {
    fetchProductVariants({
      categoryId: category?._id,
      productId: product?._id,
      brandId: brand?._id,
    }).then((res) => setVariants(res.data || []));
  }, [category, product, brand]);

  const handleEnable = async () => {
    if (!variant) return alert("Please select a product variant");
    setLoading(true);
    try {
      await createBranchProduct({ Product_Variant_ID: variant._id });
      alert("Product enabled successfully!");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Failed to enable product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Enable Product for Branch</DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={1}>
          {/* CATEGORY */}
          <Autocomplete
            options={categories}
            value={category}
            onChange={(_, v) => setCategory(v)}
            getOptionLabel={(o) => o.Category_Name}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />

          {/* PRODUCT */}
          <Autocomplete
            options={products}
            value={product}
            disabled={!category}
            onChange={(_, v) => setProduct(v)}
            getOptionLabel={(o) => o.Product_Name}
            renderInput={(params) => <TextField {...params} label="Product" />}
          />

          {/* BRAND */}
          <Autocomplete
            options={brands}
            value={brand}
            onChange={(_, v) => setBrand(v)}
            getOptionLabel={(o) => o.Brand_Name}
            renderInput={(params) => <TextField {...params} label="Brand" />}
          />

          {/* PRODUCT VARIANT */}
          <Autocomplete
            options={variants}
            value={variant}
            disabled={variants.length === 0}
            onChange={(_, v) => setVariant(v)}
            getOptionLabel={(o) =>
              `${o.SKU} (${o.Pack_Size} ${o.Unit})`
            }
            renderInput={(params) => (
              <TextField {...params} label="Product Variant" />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleEnable}
          variant="contained"
          disabled={!variant || loading}
        >
          {loading ? <CircularProgress size={20} /> : "Enable Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnableProductModal;
