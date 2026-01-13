import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Stack,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { createProductVariant } from "../../../../../services/productVariantService";
import { fetchProducts } from "../../../../../services/productService";
import { fetchBrands } from "../../../../../services/brandService";
import type { ProductRef, BrandRef } from "../types/productVariantTypes";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductVariantModal = ({ open, onClose, onSuccess }: Props) => {
  const [products, setProducts] = useState<ProductRef[]>([]);
  const [brands, setBrands] = useState<BrandRef[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    Product_ID: "",
    Brand_ID: "",
    SKU: "",
    Pack_Size: 1,
    Unit: "",
    Price: 0,
    Tracking_Type: "ITEM" as "ITEM" | "BATCH",
    Attributes: {} as Record<string, string>,
  });

  const [attrKey, setAttrKey] = useState("");
  const [attrValue, setAttrValue] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!open) return;

    Promise.all([fetchProducts(), fetchBrands()]).then(
      ([productRes, brandRes]) => {
        setProducts(productRes.data);
        setBrands(brandRes.data);
      }
    );
  }, [open]);

  /* ================= ATTRIBUTES ================= */
  const addAttribute = () => {
    if (!attrKey || !attrValue) return;

    setForm((prev) => ({
      ...prev,
      Attributes: {
        ...prev.Attributes,
        [attrKey]: attrValue,
      },
    }));

    setAttrKey("");
    setAttrValue("");
  };

  const removeAttribute = (key: string) => {
    const updated = { ...form.Attributes };
    delete updated[key];
    setForm({ ...form, Attributes: updated });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createProductVariant(form);
      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Product Variant</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          {/* PRODUCT */}
          <Select
            fullWidth
            value={form.Product_ID}
            displayEmpty
            onChange={(e) =>
              setForm({ ...form, Product_ID: e.target.value })
            }
          >
            <MenuItem value="">Select Product</MenuItem>
            {products.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.Product_Name}
              </MenuItem>
            ))}
          </Select>

          {/* BRAND */}
          <Select
            fullWidth
            value={form.Brand_ID}
            displayEmpty
            onChange={(e) =>
              setForm({ ...form, Brand_ID: e.target.value })
            }
          >
            <MenuItem value="">Select Brand</MenuItem>
            {brands.map((b) => (
              <MenuItem key={b._id} value={b._id}>
                {b.Brand_Name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="SKU"
            value={form.SKU}
            onChange={(e) =>
              setForm({ ...form, SKU: e.target.value })
            }
          />

          <TextField
            label="Pack Size"
            type="number"
            value={form.Pack_Size}
            onChange={(e) =>
              setForm({ ...form, Pack_Size: Number(e.target.value) })
            }
          />

          <TextField
            label="Unit (kg, ml)"
            value={form.Unit}
            onChange={(e) =>
              setForm({ ...form, Unit: e.target.value })
            }
          />

          <TextField
            label="Price"
            type="number"
            value={form.Price}
            onChange={(e) =>
              setForm({ ...form, Price: Number(e.target.value) })
            }
          />

          <Select
            value={form.Tracking_Type}
            onChange={(e) =>
              setForm({
                ...form,
                Tracking_Type: e.target.value as "ITEM" | "BATCH",
              })
            }
          >
            <MenuItem value="ITEM">ITEM</MenuItem>
            <MenuItem value="BATCH">BATCH</MenuItem>
          </Select>

          {/* ================= ATTRIBUTES ================= */}
          <Divider />

          <Typography variant="subtitle2">
            Attributes (optional)
          </Typography>

          <Stack direction="row" spacing={1}>
            <TextField
              label="Key"
              value={attrKey}
              onChange={(e) => setAttrKey(e.target.value)}
              fullWidth
            />
            <TextField
              label="Value"
              value={attrValue}
              onChange={(e) => setAttrValue(e.target.value)}
              fullWidth
            />
            <IconButton color="primary" onClick={addAttribute}>
              <AddIcon />
            </IconButton>
          </Stack>

          {Object.entries(form.Attributes).map(([k, v]) => (
            <Box
              key={k}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                bgcolor: "action.hover",
                p: 1,
                borderRadius: 1,
              }}
            >
              <Typography variant="body2">
                {k}: {v}
              </Typography>
              <IconButton
                size="small"
                color="error"
                onClick={() => removeAttribute(k)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductVariantModal;
