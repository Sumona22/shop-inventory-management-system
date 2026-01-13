// frontend/src/pages/cashier/sales/CashierSalesPage.tsx
import { useState } from "react";
import AddSaleItemForm from "./AddSaleItemForm";
import SaleItemsTable from "./SaleItemsTable";
import { createSale } from "../../../services/cashierSalesService";
import { useAuth } from "../../../context/AuthContext";

export interface SaleDraftItem {
  ProductVariant_ID: string;
  Quantity: number;
  Selling_Price: number;
  Tax_Percentage: number;
}

const CashierSalesPage = () => {
  const { role } = useAuth();

  const [items, setItems] = useState<SaleDraftItem[]>([]);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [submitting, setSubmitting] = useState(false);

  const addItem = (item: SaleDraftItem) => {
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
        Payment_Mode: paymentMode,
        items,
      });

      alert("Sale completed successfully");
      setItems([]);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Sale failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">New Sale</h2>

      <AddSaleItemForm onAdd={addItem} />

      <SaleItemsTable items={items} onRemove={removeItem} />

      <div className="flex items-center gap-4">
        <select
          className="border p-2 rounded"
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>

        <button
          onClick={submitSale}
          disabled={submitting}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          {submitting ? "Processing..." : "Complete Sale"}
        </button>
      </div>
    </div>
  );
};

export default CashierSalesPage;
