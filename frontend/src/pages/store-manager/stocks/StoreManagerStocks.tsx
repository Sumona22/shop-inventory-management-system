import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchBranchProductsByBranch } from "../../../services/stockService";
import EnableProductModal from "./EnableProductModal";

/* ================= TYPES ================= */

interface ProductVariant {
  _id: string;
  SKU: string;
  Brand_ID: { Brand_Name: string };
  Product_ID: {
    Product_Name: string;
  };
}

interface BranchProduct {
  _id: string;
  Product_Variant_ID: ProductVariant;
  Stock: number;           // ✅ aggregate stock
  Is_Active: boolean;
}

/* ================= COMPONENT ================= */

const StoreManagerStocks = () => {
  const branchId = localStorage.getItem("branchId")!;
  const [products, setProducts] = useState<BranchProduct[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [enableModalOpen, setEnableModalOpen] = useState(false);

  /* Load branch products (WITH STOCK) */
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchBranchProductsByBranch(branchId);
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load branch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* Search */
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      `${p.Product_Variant_ID.Product_ID.Product_Name}
       ${p.Product_Variant_ID.Brand_ID.Brand_Name}
       ${p.Product_Variant_ID.SKU}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  /* Split by stock */
  const productsWithStock = filteredProducts.filter((p) => p.Stock > 0);
  const productsWithoutStock = filteredProducts.filter((p) => p.Stock === 0);

  /* ================= RENDER ================= */

  return (
    <Box sx={{ p: 6 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Branch Stocks
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setEnableModalOpen(true)}
          disabled={loading}
        >
          Enable Product
        </Button>

        <EnableProductModal
          open={enableModalOpen}
          onClose={() => setEnableModalOpen(false)}
          onSuccess={loadData}
        />
      </Box>

      {/* Search */}
      <TextField
        size="small"
        label="Search by product / brand / SKU"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4, width: 350 }}
      />

      {/* PRODUCTS WITH STOCK */}
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Products With Stock
      </Typography>

      <Paper sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productsWithStock.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No products with stock
                </TableCell>
              </TableRow>
            )}

            {productsWithStock.map((p) => (
              <TableRow key={p._id}>
                <TableCell>
                  {p.Product_Variant_ID.Product_ID.Product_Name}
                </TableCell>
                <TableCell>
                  {p.Product_Variant_ID.Brand_ID.Brand_Name}
                </TableCell>
                <TableCell>{p.Product_Variant_ID.SKU}</TableCell>
                <TableCell align="right">{p.Stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* PRODUCTS WITHOUT STOCK */}
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Enabled Products (No Stock Yet)
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productsWithoutStock.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  All enabled products have stock
                </TableCell>
              </TableRow>
            )}

            {productsWithoutStock.map((p) => (
              <TableRow key={p._id}>
                <TableCell>
                  {p.Product_Variant_ID.Product_ID.Product_Name}
                </TableCell>
                <TableCell>
                  {p.Product_Variant_ID.Brand_ID.Brand_Name}
                </TableCell>
                <TableCell>{p.Product_Variant_ID.SKU}</TableCell>
                <TableCell>
                  <Chip label="No Stock" color="warning" size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {loading && (
        <Typography mt={2} color="text.secondary">
          Loading…
        </Typography>
      )}
    </Box>
  );
};

export default StoreManagerStocks;
