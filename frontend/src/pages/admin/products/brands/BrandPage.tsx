import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import BrandSearchBar from "./components/BrandSearchBar";
import BrandTable from "./components/BrandTable";
import AddBrandModal from "./components/AddBrandModal";


import { fetchBrands, updateBrand } from "../../../../services/brandService";
import type { Brand } from "./types/brandTypes";
import EditBrandModal from "./components/EditBrandModal";

const BrandPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const res = await fetchBrands();
      setBrands(res.data);
    } catch (err) {
      console.error("Failed to load brands", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const filtered = brands.filter((b) => {
    const q = search.toLowerCase();

    const name = b.Brand_Name.toLowerCase();
    const description = b.Brand_Description?.toLowerCase() || "";

    return (
      name.includes(q) ||
      description.includes(q)
    );
  });


  const handleUpdate = async (data: {
    name: string;
    description?: string;
  }) => {
    if (!selected) return;

    await updateBrand(selected._id, {
      Brand_Name: data.name,
      Brand_Description: data.description,
    });

    setSelected(null);
    loadBrands();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* ===== Top Bar ===== */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <BrandSearchBar value={search} onChange={setSearch} />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddModalOpen(true)}
        >
          Add Brand
        </Button>
      </Box>

      {/* ===== Table ===== */}
      <BrandTable
        data={filtered}
        loading={loading}
        onEdit={(brand) => setSelected(brand)}
      />

      {/* ===== Add Modal ===== */}
      <AddBrandModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={() => {
          loadBrands();
          setAddModalOpen(false);
        }}
      />

      {/* ===== Edit Modal ===== */}
      <EditBrandModal
        open={!!selected}
        brand={selected}
        onClose={() => setSelected(null)}
        onSave={handleUpdate}
      />
    </Box>
  );
};

export default BrandPage;
