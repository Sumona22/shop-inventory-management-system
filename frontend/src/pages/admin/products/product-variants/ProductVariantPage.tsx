import { useEffect, useState } from "react";
import { fetchProductVariants } from "../../../../services/productVariantService";

import ProductVariantToolbar from "./components/ProductVariantTollbar";
import ProductVariantFilters from "./components/ProductVariantFilters";
import ProductVariantTable from "./components/ProductVariantTable";
import AddProductVariantModal from "./components/AddProductVariantModal";

import type { ProductVariant } from "./types/productVariantTypes";

const ProductVariantsPage = () => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [filters, setFilters] = useState<{
    categoryId?: string;
    productId?: string;
    brandId?: string;
  }>({});

  const [search, setSearch] = useState("");

  const loadVariants = async (
    nextFilters = filters,
    nextSearch = search
  ) => {
    try {
      setLoading(true);

      const res = await fetchProductVariants(nextFilters);

      const searchLower = nextSearch.toLowerCase();

      const filtered = res.data.filter((v: ProductVariant) => {
        const sku = v.SKU?.toLowerCase() || "";
        const product =
          v.Product_ID?.Product_Name?.toLowerCase() || "";
        const brand =
          v.Brand_ID?.Brand_Name?.toLowerCase() || "";

        return (
          sku.includes(searchLower) ||
          product.includes(searchLower) ||
          brand.includes(searchLower)
        );
      });

      setVariants(filtered);
      setFilters(nextFilters);
      setSearch(nextSearch);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVariants();
  }, []);

  return (
    <div className="space-y-6">
      <ProductVariantToolbar
        onAdd={() => setOpenModal(true)}
        onSearch={(value) => loadVariants(filters, value)}
      />

      <ProductVariantFilters
        onApply={(f) => loadVariants({ ...filters, ...f }, search)}
      />

      <ProductVariantTable data={variants} loading={loading} />

      <AddProductVariantModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => loadVariants(filters, search)}
      />
    </div>
  );
};

export default ProductVariantsPage;
