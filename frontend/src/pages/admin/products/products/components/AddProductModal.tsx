import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
} from "@mui/material";

import { createProduct } from "../../../../../services/productService";
import type { Category } from "../../categories/types/categoryTypes";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
}

const AddProductModal = ({ open, onClose, onSuccess, categories }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    Category_ID: "",
    Product_Name: "",
    Product_Description: "",
  });

  const handleSubmit = async () => {
    if (!form.Product_Name.trim() || !form.Category_ID) return;

    setLoading(true);
    try {
      await createProduct({
        Category_ID: form.Category_ID,
        Product_Name: form.Product_Name.trim(),
        Product_Description: form.Product_Description.trim() || undefined,
      });

      onSuccess();
      setForm({
        Category_ID: "",
        Product_Name: "",
        Product_Description: "",
      });
    } catch (err) {
      console.error("Failed to create product", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Product</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            select
            label="Category"
            value={form.Category_ID}
            onChange={(e) =>
              setForm({ ...form, Category_ID: e.target.value })
            }
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.Category_Name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Product Name"
            value={form.Product_Name}
            onChange={(e) =>
              setForm({ ...form, Product_Name: e.target.value })
            }
            required
          />

          <TextField
            label="Description (optional)"
            value={form.Product_Description}
            onChange={(e) =>
              setForm({ ...form, Product_Description: e.target.value })
            }
            multiline
            rows={3}
          />
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

export default AddProductModal;
