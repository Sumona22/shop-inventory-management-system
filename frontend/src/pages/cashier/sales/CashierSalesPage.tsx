import { useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

import AddSaleItemForm, {
  type SaleItemPayload,
} from "./AddSaleItemForm";
import SaleItemsTable from "./SaleItemsTable";
import { createSale } from "../../../services/cashierSalesService";

const CashierSalesPage = () => {
  const [items, setItems] = useState<SaleItemPayload[]>([]);
  const [paymentMode, setPaymentMode] =
    useState<"CASH" | "CARD" | "UPI">("CASH");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ✅ MERGE DUPLICATE VARIANTS */
  const addItem = (item: SaleItemPayload) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.ProductVariant_ID === item.ProductVariant_ID
      );

      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].Quantity += item.Quantity;
        return updated;
      }

      return [...prev, item];
    });
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const submitSale = async () => {
    if (items.length === 0) {
      alert("Add at least one item");
      return;
    }

    try {
      setSubmitting(true);

      await createSale({
        Payment_Mode: "Cash", // ✅ enum only
        Customer_Name: customerName || undefined,
        Customer_Phone: customerPhone || undefined,
        items,
      });

      alert("Sale completed successfully");

      setItems([]);
      setCustomerName("");
      setCustomerPhone("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Sale failed");
      } else {
        alert("Unexpected error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        New Sale
      </Typography>

      <AddSaleItemForm onAdd={addItem} />

      <SaleItemsTable items={items} onRemove={removeItem} />

      <Box mt={3}>
        <Button
          variant="contained"
          onClick={submitSale}
          disabled={submitting}
        >
          Submit Sale
        </Button>
      </Box>
    </Box>
  );
};

export default CashierSalesPage;
