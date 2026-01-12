import { useEffect, useRef, useState } from "react";
import type { SalesFilterParams } from "../../types/sales";
import type { SimpleEntity } from "../../types/common";

import {
  fetchCategories,
  fetchBrands,
  fetchProducts,
  fetchVariants,
  fetchBatches,
  fetchBranches,
} from "../../services/dropdownService";

interface Props {
  filters: SalesFilterParams;
  setFilters: React.Dispatch<React.SetStateAction<SalesFilterParams>>;
  role: "Admin" | "StoreManager";
}

const SalesFilters = ({ filters, setFilters, role }: Props) => {
  const [categories, setCategories] = useState<SimpleEntity[]>([]);
  const [brands, setBrands] = useState<SimpleEntity[]>([]);
  const [products, setProducts] = useState<SimpleEntity[]>([]);
  const [variants, setVariants] = useState<SimpleEntity[]>([]);
  const [batches, setBatches] = useState<SimpleEntity[]>([]);
  const [branches, setBranches] = useState<SimpleEntity[]>([]);

  // 🔹 Track previous selections
const prevCategory = useRef<string | undefined>(undefined);
const prevProduct = useRef<string | undefined>(undefined);

useEffect(() => {
  if (role === "Admin") {
    fetchBranches().then((data) => {
      console.log("Branches:", data);
      setBranches(data);
    });
  }
}, [role]);


  /* ---------- Initial Load ---------- */
  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchBrands().then(setBrands);
    if (role === "Admin") fetchBranches().then(setBranches);
  }, [role]);

  /* ---------- Dependent Resets ---------- */
  useEffect(() => {
    if (prevCategory.current !== filters.Category_ID) {
      prevCategory.current = filters.Category_ID;
      setFilters((p) => ({
        ...p,
        Product_ID: undefined,
        ProductVariant_ID: undefined,
        Batch_ID: undefined,
      }));
    }
  }, [filters.Category_ID, setFilters]);

  useEffect(() => {
    if (prevProduct.current !== filters.Product_ID) {
      prevProduct.current = filters.Product_ID;
      setFilters((p) => ({
        ...p,
        ProductVariant_ID: undefined,
        Batch_ID: undefined,
      }));
    }
  }, [filters.Product_ID, setFilters]);

  /* ---------- Fetch Dropdown Data ---------- */
  useEffect(() => {
    fetchProducts(filters.Category_ID, filters.Brand_ID).then(setProducts);
  }, [filters.Category_ID, filters.Brand_ID]);

  useEffect(() => {
    if (!filters.Product_ID) {
      setVariants([]);
      return;
    }
    fetchVariants(filters.Product_ID).then(setVariants);
  }, [filters.Product_ID]);

  useEffect(() => {
    if (!filters.ProductVariant_ID) {
      setBatches([]);
      return;
    }
    fetchBatches(filters.ProductVariant_ID).then(setBatches);
  }, [filters.ProductVariant_ID]);

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">

      {/* -------- Date Range -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Start Date
          </label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={filters.startDate ?? ""}
            onChange={(e) =>
              setFilters((p) => ({
                ...p,
                startDate: e.target.value || undefined,
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            End Date
          </label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={filters.endDate ?? ""}
            onChange={(e) =>
              setFilters((p) => ({
                ...p,
                endDate: e.target.value || undefined,
              }))
            }
          />
        </div>
      </div>

      {/* -------- Dropdown Filters -------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">

        {role === "Admin" && Array.isArray(branches) && (
  <select
    className="border p-2 rounded"
    value={filters.Branch_ID ?? ""}
    onChange={(e) =>
      setFilters((p) => ({
        ...p,
        Branch_ID: e.target.value || undefined,
      }))
    }
  >
    <option value="">All Branches</option>

    {branches.map((b) => (
      <option key={b._id} value={b._id}>
        {b.Name}
      </option>
    ))}
  </select>
)}

        <select
          className="border p-2 rounded"
          value={filters.Category_ID ?? ""}
          onChange={(e) =>
            setFilters((p) => ({
              ...p,
              Category_ID: e.target.value || undefined,
            }))
          }
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.Name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={filters.Brand_ID ?? ""}
          onChange={(e) =>
            setFilters((p) => ({
              ...p,
              Brand_ID: e.target.value || undefined,
            }))
          }
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b._id} value={b._id}>
              {b.Name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={filters.Product_ID ?? ""}
          onChange={(e) =>
            setFilters((p) => ({
              ...p,
              Product_ID: e.target.value || undefined,
            }))
          }
        >
          <option value="">All Products</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.Name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={filters.ProductVariant_ID ?? ""}
          onChange={(e) =>
            setFilters((p) => ({
              ...p,
              ProductVariant_ID: e.target.value || undefined,
            }))
          }
        >
          <option value="">All Variants</option>
          {variants.map((v) => (
            <option key={v._id} value={v._id}>
              {v.Name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={filters.Batch_ID ?? ""}
          onChange={(e) =>
            setFilters((p) => ({
              ...p,
              Batch_ID: e.target.value || undefined,
            }))
          }
        >
          <option value="">All Batches</option>
          {batches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.Name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SalesFilters;
