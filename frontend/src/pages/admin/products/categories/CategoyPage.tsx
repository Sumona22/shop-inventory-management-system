import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import CategorySearchBar from "./components/CategorySearchBar";
import CategoryTable from "./components/CategoryTable";
import EditCategoryModal from "./components/EditCategoryModal";
import AddCategoryModal from "./components/AddCategoryModal";

import { fetchCategories, updateCategory } from "../../../../services/categoryService";
import type { Category } from "./types/categoryTypes";

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false); // control modal

  const navigate = useNavigate();

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await fetchCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filtered = categories.filter((c) => {
    const q = search.toLowerCase();

    const name = c.Category_Name.toLowerCase();
    const description = c.Category_Description?.toLowerCase() || "";

    return (
      name.includes(q) ||
      description.includes(q)
    );
  });


  const handleUpdate = async (data: { name: string; description?: string }) => {
    if (!selected) return;

    await updateCategory(selected._id, {
      Category_Name: data.name,
      Category_Description: data.description,
    });

    setSelected(null);
    loadCategories();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/*       Top Bar       */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CategorySearchBar value={search} onChange={setSearch} />

        {/*       Add Category Button       */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddModalOpen(true)}
        >
          Add Category
        </Button>
      </Box>

      {/*       Category Table       */}
      <CategoryTable
        data={filtered}
        loading={loading}
        onView={(id) =>
          navigate(`/dashboard/admin/products/categories/${id}`)
        }
        onEdit={(cat) => setSelected(cat)}
      />

      {/*    Add Category Modal    */}
      <AddCategoryModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={() => {
          loadCategories();
          setAddModalOpen(false);
        }}
      />

      {/*      Edit Category Modal     */}
      <EditCategoryModal
        open={!!selected}
        category={selected}
        onClose={() => setSelected(null)}
        onSave={handleUpdate}
      />
    </Box>
  );
};

export default CategoryPage;
