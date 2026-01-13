import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  TextField,
  Stack,
} from "@mui/material";

import { fetchCategories } from "../../../../../services/categoryService";
import { fetchProducts } from "../../../../../services/productService";
import { fetchBrands } from "../../../../../services/brandService";

interface Category {
  _id: string;
  Category_Name: string;
}

interface Product {
  _id: string;
  Product_Name: string;
}

interface Brand {
  _id: string;
  Brand_Name: string;
}

interface Props {
  onApply: (filters: {
    categoryId?: string;
    productId?: string;
    brandId?: string;
  }) => void;
}

const ProductVariantFilters = ({ onApply }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [category, setCategory] = useState<Category | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);

  /* LOAD BASE DATA */
  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data));
    fetchBrands().then((res) => setBrands(res.data));
  }, []);

  /* LOAD PRODUCTS BY CATEGORY */
  useEffect(() => {
    if (!category) {
      setProducts([]);
      setProduct(null);
      return;
    }

    fetchProducts(category._id).then((res) => setProducts(res.data));
  }, [category]);

  return (
    <Paper sx={{ mb: 3, px: 3, py: 2.5, borderRadius: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {/* CATEGORY */}
          <Autocomplete
            options={categories}
            value={category}
            onChange={(_, v) => setCategory(v)}
            getOptionLabel={(o) => o.Category_Name}
            sx={{ minWidth: 240 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Category" />
            )}
          />

          {/* PRODUCT */}
          <Autocomplete
            options={products}
            value={product}
            disabled={!category}
            onChange={(_, v) => setProduct(v)}
            getOptionLabel={(o) => o.Product_Name}
            sx={{ minWidth: 240 }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  category ? "Select Product" : "Select Category First"
                }
              />
            )}
          />

          {/* BRAND */}
          <Autocomplete
            options={brands}
            value={brand}
            onChange={(_, v) => setBrand(v)}
            getOptionLabel={(o) => o.Brand_Name}
            sx={{ minWidth: 220 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Brand" />
            )}
          />
        </Stack>

        {/* APPLY */}
        <Button
          variant="contained"
          size="large"
          sx={{ height: 52, px: 4, fontWeight: 600 }}
          onClick={() =>
            onApply({
              categoryId: category?._id,
              productId: product?._id,
              brandId: brand?._id,
            })
          }
        >
          Apply Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductVariantFilters;
