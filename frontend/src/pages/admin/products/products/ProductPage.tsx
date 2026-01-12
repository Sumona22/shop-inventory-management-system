import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ProductSearchBar from "./components/ProductSearchBar";
import ProductTable from "./components/ProductTable";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";

import { fetchProducts, updateProduct } from "../../../../services/productService";
import { fetchCategories } from "../../../../services/categoryService";
import type { Product } from "./types/productTypes";
import type { Category } from "../categories/types/categoryTypes";

const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [selected, setSelected] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [addModalOpen, setAddModalOpen] = useState(false);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const res = await fetchProducts(categoryId || undefined);
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to load products", err);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        const res = await fetchCategories();
        setCategories(res.data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadProducts();
    }, [categoryId]);

    const filtered = products.filter((p) => {
        const q = search.toLowerCase();

        const name = p.Product_Name.toLowerCase();
        const description = p.Product_Description?.toLowerCase() || "";
        const category = p.Category_ID.Category_Name.toLowerCase();

        return (
            name.includes(q) ||
            description.includes(q) ||
            category.includes(q)
        );
    });

    const handleUpdate = async (data: {
        name: string;
        description?: string;
    }) => {
        if (!selected) return;

        await updateProduct(selected._id, {
            Product_Name: data.name,
            Product_Description: data.description,
        });

        setSelected(null);
        loadProducts();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* ===== Top Bar ===== */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <ProductSearchBar
                    search={search}
                    onSearchChange={setSearch}
                    categoryId={categoryId}
                    onCategoryChange={setCategoryId}
                    categories={categories}
                />

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setAddModalOpen(true)}
                >
                    Add Product
                </Button>
            </Box>

            {/* ===== Table ===== */}
            <ProductTable
                data={filtered}
                loading={loading}
                onEdit={(prod) => setSelected(prod)}
            />

            {/* ===== Add Modal ===== */}
            <AddProductModal
                open={addModalOpen}
                categories={categories}
                onClose={() => setAddModalOpen(false)}
                onSuccess={() => {
                    loadProducts();
                    setAddModalOpen(false);
                }}
            />

            {/* ===== Edit Modal ===== */}
            <EditProductModal
                open={!!selected}
                product={selected}
                onClose={() => setSelected(null)}
                onSave={handleUpdate}
            />
        </Box>
    );
};

export default ProductPage;
