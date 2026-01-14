import { useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import AddSaleItemForm, {
  type SaleItemPayload,
} from "./AddSaleItemForm";
import SaleItemsTable from "./SaleItemsTable";
import { createSale } from "../../../services/cashierSalesService";

/* 🔐 PAYMENT MODE NORMALIZATION */
const PAYMENT_MODE_MAP = {
  CASH: "Cash",
  CARD: "Card",
  UPI: "UPI",
} as const;


const CashierSalesPage = () => {
  const [items, setItems] = useState<SaleItemPayload[]>([]);
  const [paymentMode, setPaymentMode] = useState<"CASH" | "CARD" | "UPI">("CASH");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addItem = (item: SaleItemPayload) => {
    setItems((prev) => [...prev, item]);
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
  Business_ID: localStorage.getItem("businessId")!,
  Branch_ID: localStorage.getItem("branchId")!,
  Payment_Mode: PAYMENT_MODE_MAP[paymentMode],
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
