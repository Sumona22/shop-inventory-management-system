import { useEffect, useState } from "react";
import { fetchSalesReport } from "../../services/salesService";
import type { SaleItem, SalesFilterParams } from "../../types/sales";

interface Props {
  filters: SalesFilterParams;
}

const SalesTable = ({ filters }: Props) => {
  const [data, setData] = useState<SaleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesReport(filters).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [filters]);

  if (loading) return <p>Loading...</p>;

  return (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th>Product</th>
          <th>Variant</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Qty</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s) => (
          <tr key={s._id} className="border-t">
            <td>{s.Product_ID?.Product_Name}</td>
            <td>{s.ProductVariant_ID?.SKU}</td>
            <td>{s.Category_ID?.Category_Name}</td>
            <td>{s.Brand_ID?.Brand_Name}</td>
            <td>{s.Quantity}</td>
            <td>₹{s.Line_Total}</td>
            <td>{new Date(s.Created_At).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesTable;
