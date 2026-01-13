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

import {
  fetchBranchProductsByBranch,
  fetchBranchStock,
  updateBranchStock,
} from "../../../services/stockService";
import EnableProductModal from "./EnableProductModal";

/*            Types              */
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
  Is_Active: boolean;
}

interface BranchStock {
  _id: string;
  Branch_Product_ID: {
    _id: string; //  populated object
  };
  Quantity: number;
}

const StoreManagerStocks = () => {
  const branchId = localStorage.getItem("branchId")!;
  const [products, setProducts] = useState<BranchProduct[]>([]);
  const [stockMap, setStockMap] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [enableModalOpen, setEnableModalOpen] = useState(false);

  /* Load branch products & stock */
  const loadData = async () => {
    setLoading(true);
    try {
      const [productsRes, stockRes] = await Promise.all([
        fetchBranchProductsByBranch(branchId),
        fetchBranchStock(branchId),
      ]);

      setProducts(productsRes);

      //  map by Branch_Product_ID._id
      const map: Record<string, number> = {};

      stockRes.forEach((s: BranchStock) => {
        map[s.Branch_Product_ID._id] = s.Quantity;
      });

      setStockMap(map);
    } catch (err) {
      console.error("Failed to load data:", err);
      alert("Failed to load products or stock");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /*       Search filter           */
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      `${p.Product_Variant_ID.Product_ID.Product_Name}
       ${p.Product_Variant_ID.Brand_ID.Brand_Name}
       ${p.Product_Variant_ID.SKU}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  /*   Stock-based separation    */
  const productsWithStock = useMemo(() => {
    return filteredProducts.filter(
      (p) => stockMap[p._id] !== undefined && stockMap[p._id] > 0
    );
  }, [filteredProducts, stockMap]);

  const productsWithoutStock = useMemo(() => {
    return filteredProducts.filter(
      (p) => stockMap[p._id] === undefined
    );
  }, [filteredProducts, stockMap]);

  /* Update stock manually */
  const updateStock = async (branchProductId: string) => {
    const quantityStr = prompt("Enter new quantity");
    if (!quantityStr) return;

    const quantity = Number(quantityStr);
    if (isNaN(quantity) || quantity < 0) {
      alert("Invalid quantity");
      return;
    }

    try {
      await updateBranchStock(branchProductId, quantity, branchId);
      await loadData();
    } catch (err: any) {
      alert(err.message || "Failed to update stock");
    }
  };

  /*           Render           */
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
          branchId={branchId}
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

      {/* Products WITH stock */}
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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productsWithStock.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
                <TableCell align="right">
                  {stockMap[p._id]}
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => updateStock(p._id)}
                  >
                    Update Stock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Products WITHOUT stock */}
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
