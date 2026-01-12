import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Category } from "../types/categoryTypes";

interface Props {
  open: boolean;
  onClose: () => void;
  category: Category | null;
  onSave: (data: { name: string; description?: string }) => void;
}

const EditCategoryModal = ({ open, onClose, category, onSave }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.Category_Name);
      setDescription(category.Category_Description || "");
    }
  }, [category]);

  if (!category) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => onSave({ name, description })}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
