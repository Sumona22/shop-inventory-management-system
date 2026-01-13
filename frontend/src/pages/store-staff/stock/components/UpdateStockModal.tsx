import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchBranchProductsByBranch } from "../../../../services/stockService";
import { createBatch } from "../../../../services/batchService";
import { createItem } from "../../../../services/itemService";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UpdateStockModal = ({ open, onClose }: Props) => {
  const [mode, setMode] = useState<"BATCH" | "ITEM">("BATCH");
  const [products, setProducts] = useState<any[]>([]);
  const [branchProductId, setBranchProductId] = useState("");

  /* Batch fields */
  const [quantity, setQuantity] = useState<number>(0);
  const [mfgDate, setMfgDate] = useState("");
  const [expDate, setExpDate] = useState("");

  /* Item fields */
  const [itemNo, setItemNo] = useState("");
  const [warrantyExpiry, setWarrantyExpiry] = useState("");

  useEffect(() => {
    if (!open) return;

    fetchBranchProductsByBranch().then((res) => {
      const filtered = res.filter(
        (bp: any) => bp.Product_Variant_ID.Tracking_Type === mode
      );
      setProducts(filtered);
      setBranchProductId("");
    });
  }, [mode, open]);

  const handleSubmit = async () => {
    if (!branchProductId) return alert("Select a product");

    try {
      if (mode === "BATCH") {
        if (quantity <= 0) {
          return alert("Quantity must be greater than 0");
        }

        await createBatch({
          Branch_Product_ID: branchProductId,
          Quantity: quantity,
          Mfg_Date: mfgDate || undefined,
          Exp_Date: expDate || undefined,
        });
      }

      if (mode === "ITEM") {
        if (!itemNo) return alert("Item No is required");

        await createItem({
          Branch_Product_ID: branchProductId,
          Item_No: itemNo,
          Mfg_Date: mfgDate || undefined,
          Warranty_Expiry: warrantyExpiry || undefined,
        });
      }

      onClose();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Stock</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, val) => val && setMode(val)}
          >
            <ToggleButton value="BATCH">Batch</ToggleButton>
            <ToggleButton value="ITEM">Item</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            select
            label="Product"
            value={branchProductId}
            onChange={(e) => setBranchProductId(e.target.value)}
            required
          >
            {products.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.Product_Variant_ID.SKU}
              </MenuItem>
            ))}
          </TextField>

          {/* ================= BATCH ================= */}
          {mode === "BATCH" && (
            <>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
              <TextField
                label="Manufacturing Date"
                type="date"
                value={mfgDate}
                onChange={(e) => setMfgDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Expiry Date"
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}

          {/* ================= ITEM ================= */}
          {mode === "ITEM" && (
            <>
              <TextField
                label="Item No"
                value={itemNo}
                onChange={(e) => setItemNo(e.target.value)}
                required
              />
              <TextField
                label="Manufacturing Date"
                type="date"
                value={mfgDate}
                onChange={(e) => setMfgDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Warranty Expiry"
                type="date"
                value={warrantyExpiry}
                onChange={(e) => setWarrantyExpiry(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateStockModal;
