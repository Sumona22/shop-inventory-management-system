import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Brand } from "../types/brandTypes";

interface Props {
  open: boolean;
  onClose: () => void;
  brand: Brand | null;
  onSave: (data: { name: string; description?: string }) => void;
}

const EditBrandModal = ({ open, onClose, brand, onSave }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (brand) {
      setName(brand.Brand_Name);
      setDescription(brand.Brand_Description || "");
    }
  }, [brand]);

  if (!brand) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Brand</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Brand Name"
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

export default EditBrandModal;
