// frontend/src/pages/cashier/sales/SaleItemsTable.tsx
import type { SaleDraftItem } from "./CashierSalesPage";

interface Props {
  items: SaleDraftItem[];
  onRemove: (index: number) => void;
}

const SaleItemsTable = ({ items, onRemove }: Props) => {
  if (items.length === 0) {
    return <p className="text-gray-500">No items added</p>;
  }

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Variant</th>
          <th className="p-2">Qty</th>
          <th className="p-2">Price</th>
          <th className="p-2">Tax %</th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {items.map((i, idx) => (
          <tr key={idx} className="border-t">
            <td className="p-2">{i.ProductVariant_ID}</td>
            <td className="p-2">{i.Quantity}</td>
            <td className="p-2">{i.Selling_Price}</td>
            <td className="p-2">{i.Tax_Percentage}</td>
            <td className="p-2">
              <button
                onClick={() => onRemove(idx)}
                className="text-red-600"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SaleItemsTable;
