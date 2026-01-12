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

import { createCategory } from "../../../../../services/categoryService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddCategoryModal = ({ open, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    Category_Name: "",
    Category_Description: "",
  });

  const handleSubmit = async () => {
    if (!form.Category_Name.trim()) return;

    setLoading(true);
    try {
      await createCategory({
        Category_Name: form.Category_Name.trim(),
        Category_Description: form.Category_Description.trim() || undefined,
      });

      onSuccess();
      onClose();

      // reset form after success
      setForm({
        Category_Name: "",
        Category_Description: "",
      });
    } catch (err) {
      console.error("Failed to create category", err);
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
      <DialogTitle>Add Category</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Category Name"
            value={form.Category_Name}
            onChange={(e) =>
              setForm({ ...form, Category_Name: e.target.value })
            }
            required
            autoFocus
          />

          <TextField
            label="Description (optional)"
            value={form.Category_Description}
            onChange={(e) =>
              setForm({ ...form, Category_Description: e.target.value })
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
          disabled={loading || !form.Category_Name.trim()}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
