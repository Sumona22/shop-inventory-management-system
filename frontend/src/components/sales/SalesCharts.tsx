import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

import { fetchSalesAnalytics } from "../../services/salesService";
import type { SalesAnalyticsPoint, SalesFilterParams } from "../../types/sales";

interface Props {
  filters: SalesFilterParams;
}

const SalesCharts = ({ filters }: Props) => {
  const [data, setData] = useState<SalesAnalyticsPoint[]>([]);

  useEffect(() => {
    fetchSalesAnalytics({ ...filters, groupBy: "day" }).then(setData);
  }, [filters]);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">No sales data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-4">Sales Over Time</h2>

      <LineChart
        xAxis={[
          {
            data: data.map((d) => d._id),
            scaleType: "point",
          },
        ]}
        series={[
          {
            data: data.map((d) => d.Total_Sales),
            label: "Total Sales",
          },
        ]}
        height={300}
      />
    </div>
  );
};

export default SalesCharts;
