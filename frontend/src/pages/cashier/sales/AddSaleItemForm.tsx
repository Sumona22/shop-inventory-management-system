// frontend/src/pages/cashier/sales/AddSaleItemForm.tsx
import { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchVariants,
  fetchBatches,
} from "../../../services/dropdownService";
import type { SimpleEntity } from "../../../types/common";
import type { SaleDraftItem } from "./CashierSalesPage";

interface Props {
  onAdd: (item: SaleDraftItem) => void;
}

const AddSaleItemForm = ({ onAdd }: Props) => {
  const [products, setProducts] = useState<SimpleEntity[]>([]);
  const [variants, setVariants] = useState<SimpleEntity[]>([]);
  const [batches, setBatches] = useState<SimpleEntity[]>([]);

  const [productId, setProductId] = useState("");
  const [variantId, setVariantId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  useEffect(() => {
    if (!productId) return;
    fetchVariants(productId).then(setVariants);
  }, [productId]);

  useEffect(() => {
    if (!variantId) return;
    fetchBatches().then(setBatches);
  }, [variantId]);

  const addItem = () => {
    if (!variantId || quantity <= 0) {
      alert("Invalid item");
      return;
    }

    onAdd({
      ProductVariant_ID: variantId,
      Quantity: quantity,
      Selling_Price: price,
      Tax_Percentage: tax,
    });

    setVariantId("");
    setBatchId("");
    setQuantity(1);
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <h3 className="font-medium">Add Item</h3>

      <select
        className="border p-2 w-full"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.Name}
          </option>
        ))}
      </select>

      <select
        className="border p-2 w-full"
        value={variantId}
        onChange={(e) => setVariantId(e.target.value)}
      >
        <option value="">Select Variant</option>
        {variants.map((v) => (
          <option key={v._id} value={v._id}>
            {v.Name}
          </option>
        ))}
      </select>

      <input
        type="number"
        min={1}
        className="border p-2 w-full"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button
        onClick={addItem}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
    </div>
  );
};

export default AddSaleItemForm;
