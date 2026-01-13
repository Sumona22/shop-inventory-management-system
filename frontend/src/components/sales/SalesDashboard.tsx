import { useEffect, useState } from "react";
import SalesCharts from "./SalesCharts";
import SalesTable from "./SalesTable";
import SalesFilters from "./SalesFilters";
import type { SalesFilterParams } from "../../types/sales";

interface Props {
  role: "Admin" | "StoreManager";
}

const SalesDashboard = ({ role }: Props) => {
  const [filters, setFilters] = useState<SalesFilterParams>({
    groupBy: "day",
  });

  // 🔹 Debounced filters to prevent flashing
  const [debouncedFilters, setDebouncedFilters] =
    useState<SalesFilterParams>(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className="space-y-6">
      <SalesFilters
        filters={filters}
        setFilters={setFilters}
        role={role}
      />

      <SalesCharts filters={debouncedFilters} />
      <SalesTable filters={debouncedFilters} />
    </div>
  );
};

export default SalesDashboard;
