import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Product } from "../types/productTypes";

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (data: { name: string; description?: string }) => void;
}

const EditProductModal = ({ open, onClose, product, onSave }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.Product_Name);
      setDescription(product.Product_Description || "");
    }
  }, [product]);

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Product Name"
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

export default EditProductModal;
