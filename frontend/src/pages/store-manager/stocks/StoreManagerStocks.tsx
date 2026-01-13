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
  fetchBranchProductsService,
  fetchBranchStockService,
  enableProductForBranchService,
} from "../../../services/stockService";

/* -----------------------------
   Types (lightweight)
----------------------------- */
interface BranchProduct {
  _id: string;
  Product_Name: string;
  Brand_Name: string;
  SKU: string;
}

interface BranchStock {
  Branch_Product_ID: string;
  Quantity: number;
}

const StoreManagerStocks = () => {
  const branchId = localStorage.getItem("branchId")!;

  const [branchProducts, setBranchProducts] = useState<BranchProduct[]>([]);
  const [stockMap, setStockMap] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* -----------------------------
     Load data
  ----------------------------- */
  const loadData = async () => {
    setLoading(true);
    try {
      const [productsRes, stockRes] = await Promise.all([
        fetchBranchProductsService(),
        fetchBranchStockService(branchId),
      ]);

      setBranchProducts(productsRes.data);

      const map: Record<string, number> = {};
      stockRes.data.forEach((s: BranchStock) => {
        map[s.Branch_Product_ID] = s.Quantity;
      });
      setStockMap(map);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* -----------------------------
     Derived data
  ----------------------------- */
  const filteredProducts = useMemo(() => {
    return branchProducts.filter(p =>
      `${p.Product_Name} ${p.Brand_Name} ${p.SKU}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [branchProducts, search]);

  const productsWithStock = filteredProducts.filter(
    p => stockMap[p._id] > 0
  );

  const productsWithoutStock = filteredProducts.filter(
    p => !stockMap[p._id]
  );

  /* -----------------------------
     Enable product (TEMP DEMO)
     Replace with modal later
  ----------------------------- */
  const enableDummyProduct = async () => {
    const productVariantId = prompt("Enter Product Variant ID");
    if (!productVariantId) return;

    await enableProductForBranchService(productVariantId);
    await loadData();
  };

  /* -----------------------------
     Render
  ----------------------------- */
  return (
    <Box sx={{ p: 6 }}>
      {/* ===== Header ===== */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Stocks
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={enableDummyProduct}
        >
          Enable Product
        </Button>
      </Box>

      {/* ===== Search ===== */}
      <TextField
        size="small"
        label="Search by product / brand / SKU"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 4, width: 350 }}
      />

      {/* =============================
          TABLE 1 – WITH STOCK
      ============================== */}
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

            {productsWithStock.map(p => (
              <TableRow key={p._id}>
                <TableCell>{p.Product_Name}</TableCell>
                <TableCell>{p.Brand_Name}</TableCell>
                <TableCell>{p.SKU}</TableCell>
                <TableCell align="right">
                  {stockMap[p._id]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* =============================
          TABLE 2 – NO STOCK
      ============================== */}
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Enabled Products (No Stock Yet)
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Brand Product ID</TableCell>
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

            {productsWithoutStock.map(p => (
              <TableRow key={p._id}>
                <TableCell>{p._id}</TableCell>
                <TableCell>{p.Product_Name}</TableCell>
                <TableCell>{p.Brand_Name}</TableCell>
                <TableCell>{p.SKU}</TableCell>
                <TableCell>
                  <Chip
                    label="No Stock"
                    color="warning"
                    size="small"
                  />
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
