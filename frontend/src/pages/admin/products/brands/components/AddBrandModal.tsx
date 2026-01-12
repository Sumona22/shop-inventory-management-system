import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

import { createBrand } from "../../../../../services/brandService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddBrandModal = ({ open, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    Brand_Name: "",
    Brand_Description: "",
  });

  const handleSubmit = async () => {
    if (!form.Brand_Name.trim()) return;

    setLoading(true);
    try {
      await createBrand({
        Brand_Name: form.Brand_Name.trim(),
        Brand_Description: form.Brand_Description.trim() || undefined,
      });

      onSuccess();
      setForm({ Brand_Name: "", Brand_Description: "" });
    } catch (err) {
      console.error("Failed to create brand", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Brand</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Brand Name"
            value={form.Brand_Name}
            onChange={(e) =>
              setForm({ ...form, Brand_Name: e.target.value })
            }
            required
            autoFocus
          />

          <TextField
            label="Description (optional)"
            value={form.Brand_Description}
            onChange={(e) =>
              setForm({ ...form, Brand_Description: e.target.value })
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
          disabled={loading || !form.Brand_Name.trim()}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBrandModal;
